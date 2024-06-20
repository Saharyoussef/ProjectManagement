import { Project } from "@prisma/client";
import { ProjectTitleForm } from "./project-title-form";
import { ProjectOptions } from "./project-options";

interface ProjectNavbarProps{
    data:Project;
}

export const ProjectNavbar=async ({
    data
}:ProjectNavbarProps)=>{
    return(
        <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
            <ProjectTitleForm data={data}></ProjectTitleForm>
            <div className="ml-auto">
                <ProjectOptions id={data.id}></ProjectOptions>
            </div>
        </div>
    );
};