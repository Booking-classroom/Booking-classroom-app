import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createReservation } from '../../service/reservation.service';
import BookingCalendar from '../../components/BookingCalendar';
import { findOneUserById } from '../../service/user.service';
import { UserType } from '../../types/user.type';

const BookingSinglePage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedSlots, setSelectedSlots] = useState<{ start: Date; end: Date }[]>([]);
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      window.location.href = '/login'; 
    }

    const tokenData = token ? token.split('.')[1] : '';
    const decodedToken = atob(tokenData);
    const parsedToken = JSON.parse(decodedToken);

    const fetchUser = async () => {
      try {
        const data = await findOneUserById(parsedToken.id);
        if (!data) {
          window.location.href = '/login';
        }
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        window.location.href = '/login';
      }
    };
    fetchUser();

  }, []);

  const handleReservation = async () => {
    if (!id || selectedSlots.length === 0 || !user) return;

    for (const slot of selectedSlots) {
      console.log('user : ', user);
      const reservation = {
        user: user.id,
        classroom: id,
        start_datetime: slot.start.toISOString(),
        end_datetime: slot.end.toISOString(),
        etat: 'confirmée',
      };

      await createReservation(reservation);
    }
    alert('Réservation réussie!');
    setSelectedSlots([]);
  };

  if (!id) {
    return <h1>Classroom not found</h1>;
  }

  return (
    <div>
      <h1>Booking Single Page : {id}</h1>
      Pour réserver, sélectionnez un créneau horaire puis cliquez sur réserver.
      <BookingCalendar
        id={id}
        selectedSlots={selectedSlots}
        setSelectedSlots={setSelectedSlots}
        onSelectSlot={(slot) => {
          if (slot) {
            setSelectedSlots((prevSlots) => [...prevSlots, slot]);
          }
        }}
        userId={user?.id || ''}
      />
      <button onClick={handleReservation} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Réserver
      </button>
    </div>
  );
};

export default BookingSinglePage;
