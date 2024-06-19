import { auth } from '@clerk/nextjs/server';
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateProject } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId,orgId } = auth();
    if (!userId||!orgId) {
        return {
            error: "Unauthorized",
        };
    }

    const { title, description, dateEch} = data;
    let project;
    try {
        project = await db.project.create({
            data: {
                title,
                description,
                dateEch,
            },
        });
    } catch (error) {
        return {
            error: "Failed to create.",
        };
    }
    revalidatePath(`/project/${project.id}`);
    return { data: project };
};

export const createProject = createSafeAction(CreateProject, handler);
