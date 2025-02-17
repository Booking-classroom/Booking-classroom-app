import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { createReservation } from '../../service/reservation.service';
import BookingCalendar from '../../components/BookingCalendar';
import { ReservationType } from '../../types/reservation.type';

const BookingSinglePage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedSlots, setSelectedSlots] = useState<{ start: Date; end: Date }[]>([]);

  const handleReservation = async () => {
    if (!id || selectedSlots.length === 0) return;

    for (const slot of selectedSlots) {
      const reservation = {
        classroom: id,
        start_datetime: slot.start.toISOString(),
        end_datetime: slot.end.toISOString(),
        etat: 'confirmée',
      };

      await createReservation(reservation as ReservationType);
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
            setSelectedSlots([...selectedSlots, slot]);
          }
        }}
      />
        <button onClick={handleReservation} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          Réserver
        </button>
    </div>
  );
};

export default BookingSinglePage;
