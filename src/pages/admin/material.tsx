import { useEffect, useState } from "react";
import { findAllMaterial, createMaterial } from "../../service/material.service";
import { MaterialType } from "../../types/material.type";
import MaterialCard from "../../components/MaterialCard";

interface MaterialProps {
  isAdmin: boolean;
}

const Material = ({ isAdmin }: MaterialProps) => {
  const [materials, setMaterials] = useState<MaterialType[]>([]);
  const [loading, setLoading] = useState(true);
  const [materialInfo, setMaterialInfo] = useState<MaterialType>({} as MaterialType);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const data = await findAllMaterial();
        const sortedData = data.sort((a: MaterialType, b: MaterialType) => Number(a.id) - Number(b.id));
        setMaterials(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching material:", error);
      }
    };
    fetchMaterials();
  }, []);

  const onSave = async () => {
    try {
      const newMaterial = { ...materialInfo, etat: 'neuf' };
      await createMaterial(newMaterial as MaterialType);
      const data = await findAllMaterial();
      setMaterials(data);
      setMaterialInfo({} as MaterialType);
    } catch (error) {
      console.error("Error creating material:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-5">Liste du materiel</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {materials.map((material) => (
            <MaterialCard key={material.id} material={material} isAdmin={isAdmin} />
          ))}
          {isAdmin && (
            <div className="card bg-white shadow-md rounded-lg p-6">
              <input
                className="text-xl font-bold mb-2"
                type="text"
                value={materialInfo.name}
                onChange={(e) => setMaterialInfo({ ...materialInfo, name: e.target.value })}
                placeholder="Nom de l'appareil"
              />
              <input
                className="text-gray-700 mb-2"
                type="text"
                value={materialInfo.description}
                onChange={(e) => setMaterialInfo({ ...materialInfo, description: e.target.value })}
                placeholder="Description"
              />
              <div>
                <button onClick={onSave} className="flex items-center space-x-2 text-black px-4 py-2 rounded-lg shadow-md   ">
                  Enregistrer
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Material;