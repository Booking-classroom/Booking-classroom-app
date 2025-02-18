import { useEffect, useState } from "react";
import {
  findAllClassroom,
  createClassroom,
} from "../../service/classroom.service";
import { ClassroomType } from "../../types/classroom.type";
import ClassroomCard from "../../components/ClassroomCard";

interface ClassroomProps {
  isAdmin: boolean;
}

const Classroom = ({ isAdmin }: ClassroomProps) => {
  const [classrooms, setClassrooms] = useState<ClassroomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [classroomInfo, setClassroomInfo] = useState<ClassroomType>(
    {} as ClassroomType
  );

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const data = await findAllClassroom();
         const sortedData = data.sort((a: ClassroomType, b: ClassroomType) => Number(a.id) - Number(b.id));
         setClassrooms(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching classrooms:", error);
      }
    };
    fetchClassrooms();
  }, []);

  const onSave = async () => {
    try {
      await createClassroom(classroomInfo);
      const data = await findAllClassroom();
      setClassrooms(data);
      setClassroomInfo({} as ClassroomType);
    } catch (error) {
      console.error("Error creating classroom:", error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col min-h-screen pb-40">
      <h1 className="text-3xl font-bold text-center my-5 border-b pb-3">
        Liste des salles
      </h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 flex-grow">
          {classrooms.map((classroom) => (
            <div className="h-full">
              <ClassroomCard
                key={classroom.id}
                classroom={classroom}
                isAdmin={isAdmin}
              />
            </div>
          ))}
        </div>
      )}

      {isAdmin && (
        <div className="border-t mt-5 pt-5 bg-black/20 p-6 sticky bottom-0 left-0 w-full shadow-lg backdrop-blur-lg border-gray-600 divide-y divide-gray-500 rounded-xl">
          <h2 className="text-2xl text-black font-bold text-center mb-4">
            Ajouter une salle
          </h2>
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            <input
              className="border border-gray-500 rounded-lg p-2   bg-gray-100 text-black"
              type="text"
              value={classroomInfo.name}
              onChange={(e) =>
                setClassroomInfo({ ...classroomInfo, name: e.target.value })
              }
              placeholder="Nom de la salle"
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
              placeholder="Description"
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
              placeholder="Capacité"
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
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={onSave}
              className="px-4 py-2 bg-white text-black rounded-lg shadow-md "
            >
              Enregistrer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classroom;
