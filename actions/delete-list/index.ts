"use server";

import { auth } from "@clerk/nextjs/server";
import { DeleteList } from "./schema"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

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

        await createAuditLog({
            entityTitle:list.title,
            entityId:list.id,
            entityType:ENTITY_TYPE.LIST,
            action:ACTION.DELETE,
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