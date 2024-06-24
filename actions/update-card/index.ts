"use server";

import { auth } from "@clerk/nextjs/server";
import { UpdateCard } from "./schema";
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

    const { id, projectId,...values} = data;
    let card;
    try {
        card = await db.card.update({
            where:{
                id,
                list:{
                    project:{
                        //orgId,
                    },
                },
            },
            data:{
                ...values,
                //to cover both title editing and description editing
            }
        });
    } catch (error) {
        return {
            error: "Failed to update.",
        };
    }
    revalidatePath(`/project/${projectId}`);
    return {data:card}
};

export const updateCard= createSafeAction(UpdateCard,handler);