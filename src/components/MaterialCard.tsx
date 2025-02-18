import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MaterialType } from "../types/material.type";
import { updateMaterial, removeMaterial } from "../service/material.service";
import { FaCalendarAlt } from "react-icons/fa";

interface ClassroomCardProps {
  material: MaterialType;
  isAdmin?: boolean;
}

const MaterialCard: React.FC<ClassroomCardProps> = ({ material, isAdmin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [materialInfo, setMaterialInfo] = useState<MaterialType>(material);
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/booking/${material.id}`);
  };

  const onEdit = () => {
    setIsEditing(true);
    setMaterialInfo(material);
  };

  const onDelete = async () => {
    try {
      await removeMaterial(material.id);
      alert("Classroom deleted successfully.");
    } catch (error) {
      console.error("Error deleting classroom:", error);
      alert("An error occurred while deleting the classroom.");
    }
  };

  const onSave = async () => {
    try {
      await updateMaterial(material.id, materialInfo);
      setIsEditing(false);
      alert("Classroom updated successfully.");
    } catch (error) {
      console.error("Error updating classroom:", error);
      alert("An error occurred while updating the classroom.");
    }
  };

  return (
    <div className="relative p-6 rounded-xl shadow-lg backdrop-blur-lg bg-black/20 border border-gray-600 divide-y divide-gray-500 transition-all hover:shadow-xl hover:scale-105">
      {!isEditing ? (
        <>
          <div className="border-b pb-3 mb-3">
            <h2 className="text-2xl text-black font-bold">{material.name}</h2>
            <p className="text-black">{material.description}</p>
          </div>
          <div className="flex space-x-4 pt-4">
            <button
              onClick={onClick}
              className="px-4 py-2 bg-white text-black rounded-lg shadow-md flex items-center space-x-2 transition-all"
            >
              <FaCalendarAlt size={18} />
              <span>Voir le calendrier</span>
            </button>
            {isAdmin && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-white text-black ite rounded-lg shadow-md transition-all
                  "
                >
                  Modifier
                </button>
                <button
                  onClick={onDelete}
                  className="px-4 py-2 bg-white text-black rounded-lg shadow-md transition-all"
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
            className="border border-gray-500 rounded-lg p-2 text-xl font-bold bg-gray-100 text-black focus:ring-2 "
            type="text"
            value={materialInfo.name}
            onChange={(e) =>
              setMaterialInfo({ ...materialInfo, name: e.target.value })
            }
          />
          <input
            className="border border-gray-500 rounded-lg p-2 bg-gray-100 text-black focus:ring-2 focus:ring-gray-800"
            type="text"
            value={materialInfo.description}
            onChange={(e) =>
              setMaterialInfo({ ...materialInfo, description: e.target.value })
            }
          />
          <div className="flex space-x-2">
            <button
              onClick={() => {
                onSave();
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md transition-all hover:bg-green-700"
            >
              Enregistrer
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md transition-all hover:bg-gray-300"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialCard;
