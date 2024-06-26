import { FormPopover } from "@/components/form/form.popover"
import { User2, Plus } from "lucide-react" // Importer l'icône Plus
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Project } from "../project"
import { Skeleton } from "@/components/ui/skeleton"

export const ProjectList = async () => {
    const { orgId } = auth();

    if (!orgId) {
        return redirect("/select-org");
    }

    const projects = await db.project.findMany();

    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2 className="h-6 w-6 mr-2"></User2>
                Your Projects
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 md:gap-18 lg:gap-20 xl:gap-20">
                {projects.map((project, index) => (
                    <Link
                        href={`/project/${project.id}`}
                        key={project.id}
                        className="group relative aspect-video rounded-lg h-full w-full p-2"
                    >
                        <Project 
                            key={project.id} title={project.title} id={project.id}>
                        </Project>
                    </Link>
                ))}
                <FormPopover sideOffset={10} side="right">
                    <div
                        role="button"
                        className="relative h-16 w-16 rounded-full bg-gradient-to-br from-[#e3d8ee] to-[#c1a8d8]  flex items-center justify-center hover:opacity-75 transition m-[7rem]">
                        <Plus className="h-8 w-8 text-neutral-600" /> {/* Icone Plus */}
                    </div>
                </FormPopover>
            </div>
        </div>
    )
}

ProjectList.Skeleton = function SkeletonProjectList() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Skeleton className="aspect-video h-full w-full p-2 bg-slate-300 shadow-lg rounded-lg"></Skeleton>
            <Skeleton className="aspect-video h-full w-full p-2 bg-slate-300 shadow-lg rounded-lg"></Skeleton>
            
        </div>
    );
};
