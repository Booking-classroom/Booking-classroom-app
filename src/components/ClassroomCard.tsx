import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ClassroomType } from "../types/classroom.type";
import { updateClassroom, removeClassroom } from "../service/classroom.service";
import { FaCalendarAlt } from "react-icons/fa";

interface ClassroomCardProps {
  classroom: ClassroomType;
  isAdmin?: boolean;
}

const ClassroomCard: React.FC<ClassroomCardProps> = ({
  classroom,
  isAdmin,
}) => {
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
    <div className="relative p-6 rounded-xl shadow-lg backdrop-blur-lg bg-black/20 border border-gray-600 divide-y divide-gray-500">
      {!isEditing ? (
        <>
          <h2 className="text-2xl text-black font-bold pb-2">
            {classroom.name}
          </h2>
          <div className="py-2">
            <p className="text-black">{classroom.description}</p>
          </div>
          <div className="py-2">
            <p className="text-black">Capacité: {classroom.capacity}</p>
          </div>
          <div className="py-2">
            <p className="text-black">
              Disponible: {classroom.isAvailable ? "Oui" : "Non"}
            </p>
          </div>
          <div className="flex space-x-4 pt-4">
            <button
              onClick={onClick}
              className="px-4 py-2 bg-white text-black rounded-lg shadow-md flex items-center space-x-2"
            >
              <FaCalendarAlt size={18} />
              <span>Voir le calendrier</span>
            </button>
            {isAdmin && (
              <>
                <button
                  onClick={onEdit}
                  className="px-4 py-2 bg-white text-black rounded-lg shadow-md "
                >
                  Modifier
                </button>
                <button
                  onClick={onDelete}
                  className="px-4 py-2 bg-white text-black rounded-lg shadow-md"
                >
                  Supprimer
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col space-y-3 pt-4">
          <input
            className="border border-gray-500 rounded-lg p-2 text-xl font-bold bg-gray-100 text-black"
            type="text"
            value={classroomInfo.name}
            onChange={(e) =>
              setClassroomInfo({ ...classroomInfo, name: e.target.value })
            }
          />
          <input
            className="border border-gray-500 rounded-lg p-2 bg-gray-100 text-black"
            type="text"
            value={classroomInfo.description}
            onChange={(e) =>
              setClassroomInfo({
                ...classroomInfo,
                description: e.target.value,
              })
            }
          />
          <input
            className="border border-gray-500 rounded-lg p-2 bg-gray-100 text-black"
            type="number"
            value={classroomInfo.capacity}
            onChange={(e) =>
              setClassroomInfo({
                ...classroomInfo,
                capacity: parseInt(e.target.value),
              })
            }
          />
          <div className="flex items-center space-x-2">
            <label className="text-gray-800">Disponible</label>
            <input
              type="checkbox"
              checked={classroomInfo.isAvailable}
              onChange={(e) =>
                setClassroomInfo({
                  ...classroomInfo,
                  isAvailable: e.target.checked,
                })
              }
              className="accent-black"
            />
          </div>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-black text-beige rounded-lg shadow-md hover:bg-gray-900"
          >
            Enregistrer
          </button>
        </div>
      )}
    </div>
  );
};

export default ClassroomCard;
