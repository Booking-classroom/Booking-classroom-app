import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MaterialType } from "../types/material.type";
import { updateMaterial, removeMaterial } from "../service/material.service";

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
    <div className="card bg-white shadow-md rounded-lg p-6">
      {!isEditing ? (
        <>
          <h2 className="text-xl font-bold mb-2">{material.name}</h2>
          <p className="text-gray-700 mb-2">{material.description}</p>
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
            value={materialInfo.name}
            onChange={(e) => setMaterialInfo({ ...materialInfo, name: e.target.value })}
          />
          <input
            className="text-gray-700 mb-2 border border-gray-300 rounded-lg p-2"
            type="text"
            value={materialInfo.description}
            onChange={(e) => setMaterialInfo({ ...materialInfo, description: e.target.value })}
          />
          <div>
            <button onClick={onSave} className="flex items-center space-x-2 text-black px-4 py-2 rounded-lg shadow-md">Enregistrer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialCard;