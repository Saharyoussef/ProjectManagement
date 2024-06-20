"use server";

import { auth } from "@clerk/nextjs/server";
import { UpdateProject } from "./schema";
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

    const { title, id} = data;
    let project;
    try {
        project = await db.project.update({
            where:{
                id
                //orgId
            },
            data:{
                title
            }
        });
    } catch (error) {
        return {
            error: "Failed to update.",
        };
    }
    revalidatePath(`/project/${id}`);
    return {data:project}
};

export const updateProject= createSafeAction(UpdateProject,handler);