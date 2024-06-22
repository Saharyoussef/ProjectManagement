"use server";

import { auth } from "@clerk/nextjs/server";
import { CreateList } from "./schema";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId,orgId } = auth();
    if (!userId||!orgId) {
        return {
            error: "Unauthorized",
        };
    }

    const { title, projectId} = data;
    let list;
    try {
        const project=await db.project.findUnique({
            where:{
                id:projectId,
                //orgId
            },
        });

        if(!project){
            return{
                error:"Project not found"
            };
        }
        //we add it because maybe when we want to add a list the project was deleted
        
        const lastList=await db.list.findFirst({
            where:{projectId:projectId},
            orderBy:{order:"desc"},
            select:{order:true},
        })
        //we attempt to fetch the last list in that project

        const newOrder=lastList? lastList.order+1:1;
        list = await db.list.create({
            data:{
                title,
                projectId,
                order:newOrder,
            }
        });
    } catch (error) {
        return {
            error: "Failed to create.",
        };
    }
    revalidatePath(`/project/${projectId}`);
    return {data:list}
};

export const createList= createSafeAction(CreateList,handler);