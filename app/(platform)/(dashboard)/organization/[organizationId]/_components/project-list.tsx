import { FormPopover } from "@/components/form/form.popover"
import { User2 } from "lucide-react"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Project } from "../project"
import { getRandomImagesFromCollection } from "@/lib/randomImage";  // Assurez-vous que le chemin est correct
import { Skeleton } from "@/components/ui/skeleton"

const COLLECTION_ID = "317099";  // ID de la collection spécifique
const IMAGE_COUNT = 9;  // Nombre d'images à récupérer

export const ProjectList = async () => {
    const { orgId } = auth();

    if (!orgId) {
        return redirect("/select-org");
    }

    const projects = await db.project.findMany();

    // Obtenez des images aléatoires à partir de la collection spécifiée
    const projectImages = await getRandomImagesFromCollection(COLLECTION_ID, IMAGE_COUNT);

    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2 className="h-6 w-6 mr-2"></User2>
                Your Projects
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {projects.map((project, index) => (
                    <Link
                        href={`/project/${project.id}`}
                        key={project.id}
                        className="group relative aspect-video rounded-sm h-full w-full p-2"
                        style={{
                            backgroundImage: `url(${projectImages[index % projectImages.length]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <Project 
                            key={project.id} title={project.title} id={project.id}>
                        </Project>
                    </Link>
                ))}
                <FormPopover sideOffset={10} side="right">
                    <div
                        role="button"
                        className="aspect-video relative h-full w-full bg-muted rounded-sm flex-col gap-y-1 items-center justify-center hover:opacity-75 transition">
                        <p className="text-sm">Create a new project</p>
                    </div>
                </FormPopover>
            </div>
        </div>
    )
}

ProjectList.Skeleton=function SkeletonProjectList(){
    return(
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Skeleton className="aspect-video h-full w-full p-2"></Skeleton>
            <Skeleton className="aspect-video h-full w-full p-2"></Skeleton>
            <Skeleton className="aspect-video h-full w-full p-2"></Skeleton>
            <Skeleton className="aspect-video h-full w-full p-2"></Skeleton>
            <Skeleton className="aspect-video h-full w-full p-2"></Skeleton>
            <Skeleton className="aspect-video h-full w-full p-2"></Skeleton>
            <Skeleton className="aspect-video h-full w-full p-2"></Skeleton>
            <Skeleton className="aspect-video h-full w-full p-2"></Skeleton>
        </div>
    );
};