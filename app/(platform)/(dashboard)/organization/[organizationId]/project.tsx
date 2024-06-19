"use client"
import { deleteProject } from "@/actions/deleteProjects";
import { Button } from "@/components/ui/button";
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

    const deleteProjectWithId = deleteProject.bind(null, id);

    const navigateToProject = () => {
        router.push(`/project/${id}`);
    }

    return (
        <form action={deleteProjectWithId} className="flex items-center gap-x-2" onClick={navigateToProject}> 
            <p className="font-bold text-white">
                {title}
            </p>
            <Button type="submit" variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); }}>
                Delete
            </Button>
        </form>
    )
}
