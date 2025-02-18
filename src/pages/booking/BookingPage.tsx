import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { findAllClassroom } from "../../service/classroom.service";
import { ClassroomType } from "../../types/classroom.type";
import ClassroomCard from "../../components/ClassroomCard";
import { UserType } from "../../types/user.type";

interface BookingPageProps {
  user: Partial<UserType>;
}

const BookingPage = ({ user }: BookingPageProps) => {
  const [classrooms, setClassrooms] = useState<ClassroomType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassroom = async () => {
      const data = await findAllClassroom();
      setClassrooms(data);
    };
    fetchClassroom();
  }, []);

  const onClick = () => {
    console.log(user);
    navigate(`/booking/user/${user.id}`);
  };

  return (
    <div className="container mx-auto  p-20 ">
      <h1 className="text-3xl font-bold mb-6 text-center">Booking Page</h1>
      <button
        onClick={onClick}
        className="flex items-center space-x-2 text-black px-4 py-2 rounded-lg shadow-md bg-white mb-4 "
      >
        Mon Calendrier
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
        {classrooms.map((classroom) => (
          <ClassroomCard key={classroom.id} classroom={classroom} />
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
