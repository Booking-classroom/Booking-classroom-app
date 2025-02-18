// MaterialPage.tsx
import { useEffect, useState } from "react";

import { findAllMaterial } from "../../service/material.service";
import { findAllReservationMaterial } from "../../service/reservationMaterial.service";
import { findByUserId } from "../../service/reservation.service";

import { MaterialType } from "../../types/material.type";
import { ReservationMaterialType } from "../../types/reservationMaterial.type";
import { ReservationType } from "../../types/reservation.type";

import BookingMaterial from "../../components/BookingMaterial";

const MaterialPage = () => {
  const [materials, setMaterials] = useState<MaterialType[]>([]);
  const [reservationMaterial, setReservationMaterial] = useState<ReservationMaterialType[]>([]);
  const [myReservations, setMyReservations] = useState<ReservationType[]>([]);
  const [availableMaterials, setAvailableMaterials] = useState<MaterialType[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<string>("");

  const fetchMaterials = async () => {
    try {
      const data = await findAllMaterial();
      const sortedData = data.sort((a: { id: any; }, b: { id: any; }) => Number(a.id) - Number(b.id));
      setMaterials(sortedData);
    } catch (error) {
      console.error("Error fetching material:", error);
    }
  };

  const fetchReservationMaterial = async () => {
    try {
      const data = await findAllReservationMaterial();
      const sortedData = data.sort((a: { id: any; }, b: { id: any; }) => Number(a.id) - Number(b.id));
      setReservationMaterial(sortedData);
    } catch (error) {
      console.error("Error fetching reservation material:", error);
    }
  };

  const fetchMyReservations = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) return;

      const user = JSON.parse(atob(token.split('.')[1]));
      const data = await findByUserId(user.id);
      const sortedData = data.sort(
        (a: { start_datetime: any }, b: { start_datetime: any }) =>
          new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime()
      );
      setMyReservations(sortedData);
      console.log("My reservations:", sortedData);
    } catch (error) {
      console.error("Error fetching my reservation:", error);
    }
  };

  const filterAvailableMaterials = () => {
    if (!selectedReservation) {
      setAvailableMaterials(materials);
      return;
    }

    const reservedMaterialIds = reservationMaterial
      .filter(rm => rm.reservation === selectedReservation)
      .map(rm => rm.material);

    const available = materials.filter(material => !reservedMaterialIds.includes(material.id));
    setAvailableMaterials(available);
  };

  const updateMaterials = () => {
    fetchMaterials();
    fetchReservationMaterial();
  };

  useEffect(() => {
    fetchMaterials();
    fetchReservationMaterial();
    fetchMyReservations();
  }, []);

  useEffect(() => {
    filterAvailableMaterials();
  }, [materials, reservationMaterial, selectedReservation]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-5">Matériel disponible</h1>
      <div className="mb-5">
        <label htmlFor="reservation-select" className="block text-lg font-medium text-gray-700">
          Sélectionnez une réservation
        </label>
        <select
          id="reservation-select"
          value={selectedReservation}
          onChange={(e) => setSelectedReservation(e.target.value)}
          className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Toutes les réservations</option>
          {myReservations.map((reservation) => (
            <option key={reservation.id} value={reservation.id}>
              {new Date(reservation.start_datetime).toLocaleString('fr-FR')} - {new Date(reservation.end_datetime).toLocaleString('fr-FR')}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {availableMaterials.map((material) => (
          <BookingMaterial
            key={material.id}
            material={material}
            reservations={myReservations}
            selectedReservation={selectedReservation}
            reservationMaterial={reservationMaterial}
            updateMaterials={updateMaterials}
          />
        ))}
      </div>
    </div>
  );
};

export default MaterialPage;
