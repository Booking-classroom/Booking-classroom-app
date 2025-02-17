import { useEffect, useState } from 'react';
import { findAllClassroom } from '../../service/classroom.service';
import { ClassroomType } from '../../types/classroom.type';
import ClassroomCard from '../../components/ClassroomCard';

const BookingPage = () => {
  const [classrooms, setClassrooms] = useState<ClassroomType[]>([]);

  useEffect(() => {
    const fetchClassroom = async () => {
      const data = await findAllClassroom();
      setClassrooms(data);
      console.log(data);
    };
    fetchClassroom();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Booking Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
        {classrooms.map((classroom) => (
          <ClassroomCard key={classroom.id} classroom={classroom} />
        ))}
      </div>
    </div>
  );
};

export default BookingPage;