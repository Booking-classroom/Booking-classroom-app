import { useEffect, useState } from "react";
import {
  findAllMaterial,
  createMaterial,
} from "../../service/material.service";
import { MaterialType } from "../../types/material.type";
import MaterialCard from "../../components/MaterialCard";

interface MaterialProps {
  isAdmin: boolean;
}

const Material = ({ isAdmin }: MaterialProps) => {
  const [materials, setMaterials] = useState<MaterialType[]>([]);
  const [loading, setLoading] = useState(true);
  const [materialInfo, setMaterialInfo] = useState<MaterialType>(
    {} as MaterialType
  );

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const data = await findAllMaterial();
        const sortedData = data.sort(
          (a: MaterialType, b: MaterialType) => Number(a.id) - Number(b.id)
        );
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
      const newMaterial = { ...materialInfo, etat: "neuf" };
      await createMaterial(newMaterial as MaterialType);
      const data = await findAllMaterial();
      setMaterials(data);
      setMaterialInfo({} as MaterialType);
    } catch (error) {
      console.error("Error creating material:", error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col min-h-screen pb-40">
      <h1 className="text-3xl font-bold text-center my-5 border-b pb-3">
        Liste du Matériel
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Chargement...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 flex-grow auto-rows-fr">
          {materials.map((material) => (
            <MaterialCard
              key={material.id}
              material={material}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      )}

      {isAdmin && (
        <div className="border-t mt-5 pt-5 bg-black/20 p-6 sticky bottom-0 left-0 w-full shadow-lg backdrop-blur-lg border-gray-600 divide-y divide-gray-500 rounded-xl">
          <h2 className="text-2xl text-black font-bold text-center mb-4">
            Ajouter un Matériel
          </h2>
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            <input
              className="border border-gray-500 rounded-lg p-2 bg-gray-100 text-black"
              type="text"
              value={materialInfo.name}
              onChange={(e) =>
                setMaterialInfo({ ...materialInfo, name: e.target.value })
              }
              placeholder="Nom de l'appareil"
            />
            <input
              className="border border-gray-500 rounded-lg p-2 bg-gray-100 text-black"
              type="text"
              value={materialInfo.description}
              onChange={(e) =>
                setMaterialInfo({
                  ...materialInfo,
                  description: e.target.value,
                })
              }
              placeholder="Description"
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={onSave}
              className="px-4 py-2 bg-white text-black rounded-lg shadow-md transition-transform hover:scale-105"
            >
              Enregistrer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Material;
