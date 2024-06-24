import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info";
import { ActivityList } from "./_components/activity-list";
import { Suspense } from "react";

const ActivityPage=()=>{
    return(
        <div className="w-full">
            <Info></Info>
            <Separator className="my-2"></Separator>
            <Suspense fallback={<ActivityList.Skeleton/>}>
                <ActivityList></ActivityList>
            </Suspense> 
        </div>
    );
};

export default ActivityPage;
//car dans nav-item dans components dans dashboard on a dans routes : activity
//donc le dossier doit etre nommé activity en miniscule