"use client";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger
}from "@/components/ui/popover"
import { MoreHorizontal, X } from "lucide-react";
import { deleteProject } from "@/actions/delete-project";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";

interface ProjectOptionsProps{
    id:string;
};

export const ProjectOptions=({id}: ProjectOptionsProps)=>{
    const {execute, isLoading}=useAction(deleteProject,{
        onError:(error)=>{
            toast.error(error);
        }
    });

    const onDelete=()=>{
        execute({id});
    }
    return(
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    className="h-auto w-auto p-2"
                    variant="transparent">
                        <MoreHorizontal></MoreHorizontal>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="px-0 pt-3 pb-3"
                side="bottom"
                align="start">
                    <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                        Project Actions
                    </div>
                    <PopoverClose asChild>
                        <Button 
                            className="h-auto w-auto p-2 absolute top-2 right-2 text-neitral-600"
                            variant="ghost">
                                <X className="h-4 w-4"></X>
                        </Button>
                    </PopoverClose>
                    <Button
                        variant="ghost"
                        onClick={onDelete}
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                        disabled={isLoading}
                    >
                        Delete Project
                    </Button>
            </PopoverContent>
        </Popover>
    )
}