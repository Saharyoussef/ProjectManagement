"use client"
import { useRouter } from 'next/navigation';
import { ProjectOptions } from '../../project/[projectId]/_components/project-options';


interface ProjectProps {
    title: string;
    id: string;
}

export const Project = ({
    title,
    id
}: ProjectProps) => {
    const router = useRouter();

    const navigateToProject = () => {
        router.push(`/project/${id}`);
    }

    return (
        <form 
            className="relative overflow-hidden w-60 h-80 rounded-3xl cursor-pointer text-2xl font-bold bg-purple-400 flex items-center justify-center transform transition duration-300 hover:scale-105 mb-4"
            style={{
                cursor: 'pointer',  // Ajout de l'indicateur de curseur pointer pour indiquer l'interactivité
            }}
            onClick={navigateToProject}
        >
                <div className="z-10 absolute w-full h-full peer"></div>
                <div className="absolute peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[140%] peer-hover:h-[140%] -top-32 -left-16 w-32 h-44 rounded-full bg-purple-300 transition-all duration-500"></div>
                <div className="absolute flex text-xl text-center items-end justify-end peer-hover:right-0 peer-hover:rounded-b-none peer-hover:bottom-0 peer-hover:items-center peer-hover:justify-center peer-hover:w-full peer-hover:h-full -bottom-32 -right-16 w-36 h-44 rounded-full bg-purple-300 transition-all duration-500">
                    <p className="font-bold text-2xl text-gray-600 text-center">
                        {title} Project
                    </p>
                </div>
                <div className="w-full h-full items-center justify-center flex uppercase">
                    Discover
                </div>
                <div className="absolute top-0 right-0 m-2">
                    <ProjectOptions id={id}></ProjectOptions>
                </div>
        </form>    
    )
}
