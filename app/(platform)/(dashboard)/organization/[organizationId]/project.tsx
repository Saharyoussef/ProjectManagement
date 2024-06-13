import { deleteProject } from "@/actions/deleteProjects";
import { Button } from "@/components/ui/button";

interface ProjectProps{
    title: string;
    id:string;
}

export const Project =({
    title,
    id
}: ProjectProps)=>{
    const deleteProjectWithId= deleteProject.bind(null,id);
    return (
        <form action={deleteProjectWithId}className="flex items-center gap-x-2"> 
            <p>
                Project title: {title}
            </p>
            <Button type="submit" variant="destructive" size="sm">
                Delete
            </Button>
        </form>
    )
}