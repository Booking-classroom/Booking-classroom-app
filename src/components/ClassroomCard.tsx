import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ClassroomType } from '../types/classroom.type';
import { updateClassroom, removeClassroom } from "../service/classroom.service";

interface ClassroomCardProps {
  classroom: ClassroomType;
  isAdmin?: boolean;
}

const ClassroomCard: React.FC<ClassroomCardProps> = ({ classroom, isAdmin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [classroomInfo, setClassroomInfo] = useState<ClassroomType>(classroom);
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/booking/${classroom.id}`);
  };

  const onEdit = () => {
    setIsEditing(true);
    setClassroomInfo(classroom);
  };

  const onDelete = async () => {
    try {
      await removeClassroom(classroom.id);
      alert("Classroom deleted successfully.");
    } catch (error) {
      console.error("Error deleting classroom:", error);
      alert("An error occurred while deleting the classroom.");
    }
  };

  const onSave = async () => {
    try {
      await updateClassroom(classroom.id, classroomInfo);
      setIsEditing(false);
      alert("Classroom updated successfully.");
    } catch (error) {
      console.error("Error updating classroom:", error);
      alert("An error occurred while updating the classroom.");
    }
  };

  return (
    <div className="card bg-white shadow-md rounded-lg p-6">
      {!isEditing ? (
        <>
          <h2 className="text-xl font-bold mb-2">{classroom.name}</h2>
          <p className="text-gray-700 mb-2">{classroom.description}</p>
          <p className="text-gray-700 mb-2">Capacité: {classroom.capacity}</p>
          <p className="text-gray-700 mb-2">Disponible: {classroom.isAvailable ? 'Oui' : 'Non'}</p>
          <div className="flex space-x-2">
            <button onClick={onClick} className="flex items-center space-x-2 text-black px-4 py-2 rounded-lg shadow-md">Voir le calendrier</button>
            {isAdmin && (
              <>
                <button onClick={onEdit} className="flex items-center space-x-2 text-black px-4 py-2 rounded-lg shadow-md">Modifier</button>
                <button onClick={onDelete} className="flex items-center space-x-2 text-black px-4 py-2 rounded-lg shadow-md">Supprimer</button>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col space-y-2">
          <input
            className="text-xl font-bold mb-2 border border-gray-300 rounded-lg p-2"
            type="text"
            value={classroomInfo.name}
            onChange={(e) => setClassroomInfo({ ...classroomInfo, name: e.target.value })}
          />
          <input
            className="text-gray-700 mb-2 border border-gray-300 rounded-lg p-2"
            type="text"
            value={classroomInfo.description}
            onChange={(e) => setClassroomInfo({ ...classroomInfo, description: e.target.value })}
          />
          <input
            className="text-gray-700 mb-2 border border-gray-300 rounded-lg p-2"
            type="number"
            value={classroomInfo.capacity}
            onChange={(e) => setClassroomInfo({ ...classroomInfo, capacity: parseInt(e.target.value) })}
          />
          <div className="flex items-center space-x-2">
            <label className="text-gray-700 mb-2">Disponible</label>
            <input
              className="text-gray-700 mb-2"
              type="checkbox"
              checked={classroomInfo.isAvailable}
              onChange={(e) => setClassroomInfo({ ...classroomInfo, isAvailable: e.target.checked })}
            />
          </div>
          <div>
            <button onClick={onSave} className="flex items-center space-x-2 text-black px-4 py-2 rounded-lg shadow-md">Enregistrer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassroomCard;