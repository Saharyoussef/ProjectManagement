import { create } from "@/actions/createProject";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Project } from "./project";
import { Form } from "./form";

const OrganizationIdPage = async () => {
    const projects =await db.project.findMany()
    return (
        <div className="flex flex-col space-y-4">
            <Form></Form>
            <div className="space-y-2">
                {projects.map((project)=>(
                    <Project key={project.id} title={project.title} id={project.id}></Project>
                ))}

            </div>
        </div>
    );
};

export default OrganizationIdPage;
