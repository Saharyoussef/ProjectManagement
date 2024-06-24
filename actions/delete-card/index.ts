"use server";

import { auth } from "@clerk/nextjs/server";
import { DeleteCard } from "./schema"
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
    let card;
    try {
        card=await db.card.delete({
            where:{
                id,
                list:{
                    project:{
                        //orgId,
                    },
                },
            },
        });
        
    } catch (error) {
        return {
            error: "Failed to delete.",
        };
    }
    revalidatePath(`/project/${projectId}`);
    return{data:card};
};

export const deleteCard= createSafeAction(DeleteCard,handler);