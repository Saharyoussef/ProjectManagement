import { auth } from '@clerk/nextjs/server';
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateProject } from "./schema";
import { createAuditLog } from '@/lib/create-audit-log';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

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

        
        await createAuditLog({
            entityTitle:project.title,
            entityId:project.id,
            entityType:ENTITY_TYPE.PROJECT,
            action:ACTION.CREATE,
        })
        
    } catch (error) {
        return {
            error: "Failed to create.",
        };
    }
    revalidatePath(`/project/${project.id}`);
    return { data: project };
};

export const createProject = createSafeAction(CreateProject, handler);
