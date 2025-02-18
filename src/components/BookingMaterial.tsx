import { useEffect, useState } from "react";
import { MaterialType } from "../types/material.type";
import { createReservationMaterial } from "../service/reservationMaterial.service";
import { ReservationType } from "../types/reservation.type";
import { ReservationMaterialType } from "../types/reservationMaterial.type";

interface BookingMaterialProps {
  material: MaterialType;
  reservations: ReservationType[];
  selectedReservation: string;
  reservationMaterial: ReservationMaterialType[];
  updateMaterials: () => void;
}

const BookingMaterial: React.FC<BookingMaterialProps> = ({ 
  material, 
  reservations, 
  selectedReservation, 
  reservationMaterial, 
  updateMaterials 
}) => {
  const [isBooked, setIsBooked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [availableReservations, setAvailableReservations] = useState<ReservationType[]>([]);
  const [selectedRes, setSelectedRes] = useState<string>("");

  useEffect(() => {
    const res = reservationMaterial.filter((rm) => (
      rm.reservation.id === parseInt(selectedReservation)
    ));

    const isBooked = res.some((rm) => {
      if (typeof rm.material === 'string') {
        return rm.material === material.id;
      } else {
        return rm.material.id === material.id;
      }
    });
    setIsBooked(isBooked);
  }, [selectedReservation, reservationMaterial, material.id]);

  // Filtre les réservations où le matériel est disponible
  useEffect(() => {
        const reservedForThisMaterial = reservationMaterial
      .filter((rm) => {
        if (typeof rm.material === 'string') {
          return rm.material === material.id;
        } else {
          return rm.material.id === material.id;
        }
      })
      .map((rm) => rm.reservation.id);

    const available = reservations.filter(
      (res) => !reservedForThisMaterial.includes(res.id)
    );
    setAvailableReservations(available);
    
  }, [reservationMaterial, material.id, reservations]);

  const handleBook = async () => {
    try {
      await createReservationMaterial({
        material: material.id,
        reservation: selectedRes,
      } as any);
      alert("Matériel réservé avec succès !");
      setShowModal(false);
      setSelectedRes("");
      updateMaterials();
    } catch (error) {
      console.error("Erreur lors de la réservation:", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="card bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-2">{material.name}</h2>
      <p className="text-gray-700 mb-2">{material.description}</p>
      <p className="text-gray-700 mb-2">État: {material.etat}</p>
      <button
        onClick={() => setShowModal(true)}
        className={`text-white px-4 py-2 rounded-lg shadow-md ${isBooked ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        disabled={isBooked}
      >
        {isBooked ? "Déjà réservé" : "Réserver"}
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Sélectionnez une réservation</h2>
            <select
              value={selectedRes}
              onChange={(e) => setSelectedRes(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md mb-4"
            >
              <option value="">Sélectionnez une réservation</option>
              {availableReservations.map((reservation) => (
                <option key={reservation.id} value={reservation.id}>
                  {new Date(reservation.start_datetime).toLocaleString('fr-FR')} - {new Date(reservation.end_datetime).toLocaleString('fr-FR')}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Annuler
              </button>
              <button
                onClick={handleBook}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                disabled={!selectedRes}
              >
                Réserver
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingMaterial;