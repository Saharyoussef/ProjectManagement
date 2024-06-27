import { FormInput } from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock } from "lucide-react";

export const Deadline=()=>{
    return(
        <div className="flex items-start gap-x-3 w-full">
            <Clock className="h-5 w-5 mt-0.2 text-neutral-700" />
            <div className="w-full">
                <p className="font-semibold text-neutral-700 mb-2">
                    Deadline
                </p> 
                <FormInput
                    id="dateEch"
                    type="date"
                    className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-purple-700"
                /> 
            </div>   
        </div>
    );
};

Deadline.Skeleton=function DeadlineSkeleton(){
    return(
        <div className="space-y-2 mt-2">
            <Skeleton className="w-20 h-4 bg-neutral-200"></Skeleton>
            <Skeleton className="w-full h-8 bg-neutral-200"></Skeleton>
        </div>
    )
}