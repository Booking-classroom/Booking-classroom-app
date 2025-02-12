import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { findOneClassroomById } from '../../service/classroom.service';
import { ClassroomType } from '../../types/classroom.type';
import BookingCalendar from '../../components/BookingCalendar';

const BookingSinglePage = () => {
  const { id } = useParams<{ id: string }>();
  const [classroom, setClassroom] = useState<ClassroomType | null>(null);

  useEffect(() => {
    const fetchClassroom = async () => {
      if (!id) return;
      const data = await findOneClassroomById(id);
      setClassroom(data);
    };
    fetchClassroom();
  }, [id]);

  if (!id) {
    return <h1>Classroom not found</h1>;
  }

  return (
    <div>
      <h1>Booking Single Page : {id}</h1>
      <BookingCalendar id={id} />
    </div>
  );
};

export default BookingSinglePage;