"use client"
import { useRouter } from 'next/navigation';

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
        <form  className="flex items-center gap-x-2" onClick={navigateToProject}> 
            <p className="font-bold text-white">
                {title}
            </p>
        </form>
    )
}
