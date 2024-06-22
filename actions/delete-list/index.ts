"use server";

import { auth } from "@clerk/nextjs/server";
import { DeleteList } from "./schema"
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
        list = await db.list.delete({
            where:{
                id,
                projectId,
                //project:{
                //  orgId
                //},
            },
        });
    } catch (error) {
        return {
            error: "Failed to delete.",
        };
    }
    revalidatePath(`/project/${projectId}`);
    return{data:list};
};

export const deleteList= createSafeAction(DeleteList,handler);