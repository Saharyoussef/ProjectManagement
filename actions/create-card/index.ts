"use server";

import { auth } from "@clerk/nextjs/server";
import { CreateCard } from "./schema";
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

    const { title, projectId,listId} = data;
    let card;
    try {
        const list=await db.list.findUnique({
            where:{
                id:listId,
                //project:{
                //    orgId
                //},
            },
        });

        if(!list){
            return{
                error:"list not found",
            };
        }
        
        const lastCard=await db.card.findFirst({
            where:{listId},
            orderBy:{order:"desc"},
            select:{order:true},
        });

        const newOrder=lastCard? lastCard.order+1:1;

        card=await db.card.create({
            data:{
                title,
                listId,
                order:newOrder,
            },
        });

    } catch (error) {
        return {
            error: "Failed to create.",
        };
    }
    revalidatePath(`/project/${projectId}`);
    return {data:card};
};

export const createCard= createSafeAction(CreateCard,handler);