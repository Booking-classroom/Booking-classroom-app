import { useEffect, useState } from "react";
import { findAllClassroom } from "../../service/classroom.service";
import { ClassroomType } from "../../types/classroom.type";
import ClassroomCard from "../../components/ClassroomCard";

interface ClassroomProps {
    isAdmin: boolean;
}


const Classroom = ({isAdmin}: ClassroomProps) => {
    const [classrooms, setClassrooms] = useState<ClassroomType[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchClassrooms = async () => {
        try {
            const data = await findAllClassroom();
            setClassrooms(data);
            setLoading(false);
            console.log(data);
        } catch (error) {
            console.error("Error fetching classrooms:", error);
        }
        };
        fetchClassrooms();
    }, []);
    
    return (
        <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center my-5">Liste des salles</h1>
        {loading ? (
            <p>Chargement...</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {classrooms.map((classroom) => (
                <ClassroomCard key={classroom.id} classroom={classroom} isAdmin={isAdmin}/>
            ))}
            </div>
        )}
        </div>
    );
    }   

export default Classroom;