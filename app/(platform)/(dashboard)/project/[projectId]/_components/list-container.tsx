"use client";

import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";

interface ListContainerProps{
    data:ListWithCards[];
    projectId: string;
};

export const ListContainer=({
    data,
    projectId,
}:ListContainerProps)=>{
    return(
        <ol>
            <ListForm></ListForm>
            <div className="flex-shrink-0 w-1"></div>
        </ol>
    )
}