"use server"
import{ db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteProject (id: string){
    await db.project.delete({
        where:{
            id
        }
    });
    revalidatePath("/organization/org_2hm8rThH20oTii5s33QqnncxMsE")
}