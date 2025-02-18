import { useNavigate } from "react-router-dom";
import { ClassroomType } from '../types/classroom.type';

interface ClassroomCardProps {
  classroom: ClassroomType;
}

const ClassroomCard: React.FC<ClassroomCardProps> = ({ classroom }) => {
    const navigate = useNavigate();


     const onClick = () => {
    navigate(`/booking/${classroom.id}`);
     }

  return (
    <div className="card bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-2">{classroom.name}</h2>
      <p className="text-gray-700 mb-2">{classroom.description}</p>
      <p className="text-gray-700 mb-2">Capacité: {classroom.capacity}</p>
      <p className="text-gray-700 mb-2">disponible: {classroom.isAvailble ? 'Non' : 'Oui'}</p>
      <button onClick={onClick}> Voir le calendrier </button>
    </div>
  );
};

export default ClassroomCard;