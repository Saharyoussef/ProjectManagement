import { auth } from "@clerk/nextjs/server";
import {db} from "@/lib/db";
import { redirect } from "next/navigation";
import { ListContainer } from "./_components/list-container";
interface ProjectIdPageProps{
    params:{
        projectId: string;
    };
};

const ProjectIdPage=async({
    params,}:ProjectIdPageProps)=>{
        const {orgId}=auth();
        if(!orgId){
            redirect("/select-org");
        }

        const lists=await db.list.findMany({
            where: {
                projectId: params.projectId,
                //project:{
                //    orgId
                //},
            },
            include: {
                cards:{
                    orderBy:{
                        order: "asc"
                    },
                },
            },
            orderBy:{
                order:"asc"
            },
        });
    return(
        <div className="p-4 h-full overflow-x-auto">
            <ListContainer
                projectId={params.projectId}
                data={lists}
            ></ListContainer>
        </div>
    );
};

export default ProjectIdPage;