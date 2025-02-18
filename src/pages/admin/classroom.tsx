import { useEffect, useState } from "react";
import { findAllClassroom, createClassroom } from "../../service/classroom.service";
import { ClassroomType } from "../../types/classroom.type";
import ClassroomCard from "../../components/ClassroomCard";

interface ClassroomProps {
  isAdmin: boolean;
}

const Classroom = ({ isAdmin }: ClassroomProps) => {
  const [classrooms, setClassrooms] = useState<ClassroomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [classroomInfo, setClassroomInfo] = useState<ClassroomType>({} as ClassroomType);

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
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-5">Liste des salles</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {classrooms.map((classroom) => (
            <ClassroomCard key={classroom.id} classroom={classroom} isAdmin={isAdmin} />
          ))}
          {isAdmin && (
            <div className="card bg-white shadow-md rounded-lg p-6">
              <input
                className="text-xl font-bold mb-2"
                type="text"
                value={classroomInfo.name}
                onChange={(e) => setClassroomInfo({ ...classroomInfo, name: e.target.value })}
                placeholder="Nom de la salle"
              />
              <input
                className="text-gray-700 mb-2"
                type="text"
                value={classroomInfo.description}
                onChange={(e) => setClassroomInfo({ ...classroomInfo, description: e.target.value })}
                placeholder="Description"
              />
              <input
                className="text-gray-700 mb-2"
                type="number"
                value={classroomInfo.capacity}
                onChange={(e) => setClassroomInfo({ ...classroomInfo, capacity: parseInt(e.target.value) })}
                placeholder="Capacité"
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

export default Classroom;