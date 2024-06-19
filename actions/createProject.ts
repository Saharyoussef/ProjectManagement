"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function create(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dateEch = formData.get("dateEch") as string;

    const newProject = await db.project.create({
        data: {
            title,
            description: description || "Default description",
            dateEch: new Date(dateEch),
        }
    });

    revalidatePath("/organization/org_2hm8rThH20oTii5s33QqnncxMsE");
    
    return newProject; // Return the entire project object
}
