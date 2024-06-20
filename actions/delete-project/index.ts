"use server";

import { auth } from "@clerk/nextjs/server";
import { DeleteProject } from "./schema"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { redirect } from "next/navigation";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId,orgId } = auth();
    if (!userId||!orgId) {
        return {
            error: "Unauthorized",
        };
    }

    const { id} = data;
    let project;
    try {
        project = await db.project.delete({
            where:{
                id
                //orgId
            },
        });
    } catch (error) {
        return {
            error: "Failed to delete.",
        };
    }
    revalidatePath(`/organization/${orgId}`);
    redirect (`/organization/${orgId}`);
};

export const deleteProject= createSafeAction(DeleteProject,handler);