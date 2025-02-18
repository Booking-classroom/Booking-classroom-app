import { useParams } from "react-router-dom";
import { findByUserId } from "../../../service/reservation.service";    
import { useState, useEffect } from 'react';
import PersonnalBookingCalendar from '../../../components/PersonnalBookingCalendar';
import { ReservationType } from "../../../types/reservation.type";

const PersonnalCalendar = () => {  
  const { userId } = useParams<{ userId: string }>();
  const [reservations, setReservations] = useState<ReservationType[]>([]);

  useEffect(() => {
    if (!userId) return;

    const fetchReservations = async (userId: string) => {
      try {
        console.log(userId);
        const data = await findByUserId(userId);
        setReservations(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations(userId);
  }, [userId]);

  if (!userId) {
    return <h1>User not found</h1>;
  }

  return (
    <div>
      <h1>Personnal Calendar</h1>
      <PersonnalBookingCalendar userId={userId} reservations={reservations} />
    </div>
  );
};

export default PersonnalCalendar;