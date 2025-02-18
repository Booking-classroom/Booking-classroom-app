import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ClassroomType } from '../types/classroom.type';

interface ClassroomCardProps {
  classroom: ClassroomType;
  isAdmin?: boolean;
}

const ClassroomCard: React.FC<ClassroomCardProps> = ({ classroom, isAdmin }) => {
  const [editing, setEditing] = useState(false);
  const [classroomInfo, setClassroomInfo] = useState<ClassroomType>(classroom);


    const navigate = useNavigate();



     const onClick = () => {
    navigate(`/booking/${classroom.id}`);
     }

     const onEdit = () => {
        setEditing(true);
        setClassroomInfo(classroom);
      console.log('edit classroom : ', classroomInfo);
      }

     const onDelete = () => {
        console.log('delete classroom');
      };

  return (
    <div className="card bg-white shadow-md rounded-lg p-6">
      {editing ? (
        <>
      <h2 className="text-xl font-bold mb-2">{classroom.name}</h2>
      <p className="text-gray-700 mb-2">{classroom.description}</p>
      <p className="text-gray-700 mb-2">Capacité: {classroom.capacity}</p>
      <p className="text-gray-700 mb-2">disponible: {classroom.isAvailble ? 'Non' : 'Oui'}</p>
      <div>
        <button onClick={onClick}> Voir le calendrier </button>
        {isAdmin && (
          <>
          <button onClick={onEdit} className="bg-blue-500 text-white px-2 py-1 rounded-lg">Modifier</button>
          <button onClick={onDelete} className="bg-red-500 text-white px-2 py-1 rounded-lg">Supprimer</button>
          </>
        )}
      </div>
      </>
      ) : (
        <>
        <input type="text" value={classroomInfo.name} onChange={(e) => setClassroomInfo({ ...classroomInfo, name: e.target.value })} />
        <input type="text" value={classroomInfo.description} onChange={(e) => setClassroomInfo({ ...classroomInfo, description: e.target.value })} />
        <input type="number" value={classroomInfo.capacity} onChange={(e) => setClassroomInfo({ ...classroomInfo, capacity: parseInt(e.target.value) })} />
        <input type="checkbox" checked={classroomInfo.isAvailble} onChange={(e) => setClassroomInfo({ ...classroomInfo, isAvailble: e.target.checked })} />
        <button>Save</button>
        </>
      )}

    </div>
  );
};

export default ClassroomCard;