import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createReservation } from '../../service/reservation.service';
import { findOneClassroomById } from '../../service/classroom.service';
import BookingCalendar from '../../components/BookingCalendar';
import { findOneUserById } from '../../service/user.service';
import { UserType } from '../../types/user.type';
import { ClassroomType } from '../../types/classroom.type';

const BookingSinglePage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedSlots, setSelectedSlots] = useState<{ start: Date; end: Date }[]>([]);
  const [user, setUser] = useState<UserType>();
  const [classroom, setClassroom] = useState<ClassroomType>();

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


  useEffect(() => {
    const fetchClassroom = async () => {
      console.log('id:', id);
      if (!id) return;
      try {
        const data = await findOneClassroomById(id);
        setClassroom(data);
        console.log('classroom:', data);
      } catch (error) {
        console.error("Error fetching classroom:", error);
      }
    };
    fetchClassroom();
  }, [id]);


  

  const handleReservation = async () => {
    if (!id || selectedSlots.length === 0 || !user) return;

    for (const slot of selectedSlots) {
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
    <div className='gap-4 mb-8'>
      <h1 className='text-8xl font-semibold' >{classroom?.name}</h1>
      <h2 className='text-xl'>Pour réserver, sélectionnez un créneau horaire puis cliquez sur réserver.</h2>
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
      <button onClick={handleReservation} className="mt-4 bg-white text-black py-2 px-4 rounded">
        Réserver
      </button>
    </div>
  );
};

export default BookingSinglePage;
