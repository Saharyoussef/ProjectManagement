import { FormInput } from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from 'lucide-react';
import { useState,ChangeEvent } from "react";


export const Members=()=>{
    const [selectedMember, setSelectedMember] = useState('');

    const handleMemberChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMember(event.target.value);
};
const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
];

    return(
        <div className="flex items-start gap-x-3 w-full">
            <User className="h-5 w-5 mt-0.2 text-neutral-700" />
            <div className="w-full">
                <p className="font-semibold text-neutral-700 mb-2">
                    Members
                </p> 
                
                <form className="max-w-sm mx-auto">
                <select
                    id="members"
                    className="bg-white h-7 border focus-visible:ring-1 border-gray-300 text-sm rounded-lg focus:ring-purple-900 focus:border-purple-900 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-900 dark:focus:border-purple-900"
                    value={selectedMember}
                    onChange={handleMemberChange}
                >
                    <option value="" disabled>

                    </option>
                    <option value="">Sahar Youssef</option>
                </select>
                </form> 
 
            </div>   
        </div>
    );
};

Members.Skeleton=function MembersSkeleton(){
    return(
        <div className="space-y-2 mt-2">
            <Skeleton className="w-20 h-4 bg-neutral-200"></Skeleton>
            <Skeleton className="w-full h-8 bg-neutral-200"></Skeleton>
        </div>
    )
}