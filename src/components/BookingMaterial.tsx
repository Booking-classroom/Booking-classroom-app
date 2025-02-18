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
  updateMaterials,
}) => {
  const [isBooked, setIsBooked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [availableReservations, setAvailableReservations] = useState<
    ReservationType[]
  >([]);
  const [selectedRes, setSelectedRes] = useState<string>("");

  useEffect(() => {
    const res = reservationMaterial.filter((rm) => {
      if (typeof rm.reservation === "string") {
        return rm.reservation === selectedReservation;
      } else {
        return rm.reservation.id.toString() === selectedReservation;
      }
    });

    const isBooked = res.some((rm) => {
      if (typeof rm.material === "string") {
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
        if (typeof rm.material === "string") {
          return rm.material === material.id;
        } else {
          return rm.material.id === material.id;
        }
      })
      .map((rm) => {
        if (typeof rm.reservation === "string") {
          return rm.reservation;
        } else {
          return rm.reservation.id.toString();
        }
      });

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
    <div className="relative p-4 rounded-lg shadow-md bg-gray-100 border border-gray-400 w-72">
      <h2 className="text-lg font-bold text-gray-900">{material.name}</h2>
      <p className="text-gray-700 text-sm">{material.description}</p>
      <p className="text-gray-700 text-sm">État: {material.etat}</p>
      <button
        onClick={() => setShowModal(true)}
        className={`w-full mt-3 px-3 py-1.5 rounded-md shadow-md text-sm bg-white text-black border border-gray-400 ${
          isBooked ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
        }`}
        disabled={isBooked}
      >
        {isBooked ? "Déjà réservé" : "Réserver"}
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-72">
            <h2 className="text-lg font-bold mb-3">
              Sélectionnez une réservation
            </h2>
            <select
              value={selectedRes}
              onChange={(e) => setSelectedRes(e.target.value)}
              className="block w-full pl-3 pr-10 py-1.5 text-sm border border-gray-400 focus:outline-none focus:ring-gray-800 focus:border-gray-800 rounded-md mb-3"
            >
              <option value="">Sélectionnez une réservation</option>
              {availableReservations.map((reservation) => (
                <option key={reservation.id} value={reservation.id}>
                  {new Date(reservation.start_datetime).toLocaleString("fr-FR")}{" "}
                  - {new Date(reservation.end_datetime).toLocaleString("fr-FR")}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1.5 bg-white text-black border border-gray-400 rounded-md text-sm shadow-md hover:bg-gray-200"
              >
                Annuler
              </button>
              <button
                onClick={handleBook}
                className="px-3 py-1.5 bg-white text-black border border-gray-400 rounded-md text-sm shadow-md hover:bg-gray-200"
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
