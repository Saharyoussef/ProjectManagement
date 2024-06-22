"use server";

import { auth } from "@clerk/nextjs/server";
import { CopyList } from "./schema"
import { InputType, ReturnType } from "./types"
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

    const { id,projectId} = data;
    let list;
    try {
        const listToCopy=await db.list.findUnique({
            where:{
                id,
                projectId,
                //project:{
                //  orgId,
                //},
            },
            include:{
                cards:true,
            },
            //c'est pour lorsque on copie une liste tous les taches dedans seront copiés aussi
        });

        if(!listToCopy){
            return{error:"List not found"};
        }

        const lastList=await db.list.findFirst({
            where:{projectId},
            orderBy:{order:"desc"},
            select:{order:true},
        });

        const newOrder=lastList? lastList.order+1:1;

        list=await db.list.create({
            data:{
                projectId:listToCopy.projectId,
                title:`${listToCopy.title}-Copy`,
                order:newOrder,
                cards:{
                    createMany:{
                        data:listToCopy.cards.map((card)=>({
                            title:card.title,
                            description:card.description,
                            order:card.order,
                        })),
                    },
                },
            },
            include:{
                cards:true,
            },
        });
        
    } catch (error) {
        return {
            error: "Failed to copy.",
        };
    }
    revalidatePath(`/project/${projectId}`);
    return{data:list};
};

export const copyList= createSafeAction(CopyList,handler);