import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import {notFound, redirect } from "next/navigation";
import { ProjectNavbar } from "./_components/project-navbar";

/*export async function generateMetadata({
    params
}:{
    params:{projectId:string;};
}){
    const{orgId}=auth();

    if(!orgId){
        return{
            title:"Project",
        };
    }

    const project =await db.project.findUnique({
        where:{
            id:params.projectId,
            //orgId
        }
    });
    return {
        title:project?.title||"Project",
    }
}*/
//cette fonction pour afficher nom du projet en haut de page

const ProjectIdLayout = async({children,params}:{
    children: React.ReactNode;
    params:{projectId:string;};
    //je dois nommer projectId exactement comme j'ai nommé folder
})=>{
    const {orgId}=auth()

    if(!orgId){
        redirect('/select-org');
    }

    //pour que si je vais ouvrir d'un autre navigateur pas connecté il ne s'ouvre pas

    const project=await db.project.findUnique({
        where:{
            id:params.projectId,
            //id ici pour etre pour un projet spécifique
            //orgId,
            //on ajoute orgId pour etre sur que c'est de cette organization mais je dois d'abord ajouter orgId dans bd
        }
    })

    if(!project){
        notFound();
    }

    return(
        <div 
            className="relative h-full bg-no-repeat bg-cover bg-center">
            <ProjectNavbar data={project}></ProjectNavbar>
            <div className="absolute inset-0"></div>
            {/*c'est le couleur du background */}
            <main className="relative pt-28 h-full">
                {children}
            </main>
        </div>
    );
};

export default ProjectIdLayout;