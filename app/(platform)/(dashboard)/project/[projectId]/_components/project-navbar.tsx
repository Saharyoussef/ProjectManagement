import { Project } from "@prisma/client";
import { ProjectTitleForm } from "./project-title-form";
import { ProjectOptions } from "./project-options";

interface ProjectNavbarProps {
    data: Project;
}

export const ProjectNavbar = async ({ data }: ProjectNavbarProps) => {
    return (
        <div className="w-full h-14 z-40 fixed top-14 flex items-center px-6 gap-x-4 text-white
                    rounded-full border-2 border-transparent bg-gradient-to-r from-purple-200 to-purple-400
                    shadow-md  mt-2"
             style={{
                 borderRadius: '51px',
                 boxShadow: 'inset 11px -11px 22px #a8a0b0, inset -11px 11px 22px #ffffff',
             }}>
            <ProjectTitleForm data={data} />
            <div className="ml-auto">
                <ProjectOptions id={data.id} />
            </div>
        </div>
    );
};
