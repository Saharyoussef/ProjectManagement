import { Separator } from "@/components/ui/separator";
import { Info } from "./_components/info";
import { ProjectList } from "./_components/project-list";
import { Suspense } from "react";

const OrganizationIdPage = async () => {
    return (
        <div className="w-full mb-20">
            <Info></Info>
            <Separator className="my-4"></Separator>
            <div className="px-2 md:px-4">
                <Suspense fallback={<ProjectList.Skeleton/>}>
                    <ProjectList/>
                </Suspense>
            </div>
        </div>
    );
};

export default OrganizationIdPage;
