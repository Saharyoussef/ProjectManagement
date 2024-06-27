"use client"
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Project } from "@prisma/client";
import { ElementRef,useRef, useState } from "react";
import{updateProject} from "@/actions/update-project"
import { useAction } from "@/hooks/use-action";
import {toast} from "sonner";

interface ProjectTitleFormProps{
    data:Project;
};

export const ProjectTitleForm=({
    data,
}:ProjectTitleFormProps)=>{
    const {execute}=useAction(updateProject,{
        onSuccess:(data)=>{
            toast.success(`Project"${data.title}"uddated!`);
            setTitle(data.title);
            disableEditing();
        },
        onError:(error)=>{
            toast.error(error);
        }
    })

    const formRef=useRef<ElementRef<"form">>(null);
    const inputRef=useRef<ElementRef<"input">>(null);
    
    const[title,setTitle]=useState(data.title);
    const[isEditing,setIsEditing]=useState(false);
    
    const enableEditing=()=>{
        setIsEditing(true);
        setTimeout(()=>{
            inputRef.current?.focus();
            inputRef.current?.select();
        })
        //pour selecter le titre pour le modifier
    }
    
    const disableEditing=()=>{
        setIsEditing(false);
    }

    const onSubmit=(formData:FormData)=>{
        const title=formData.get("title")as string;

        execute({
            title,
            id:data.id,
        });
    };

    const onBlur=()=>{
        formRef.current?.requestSubmit();
    }

    if(isEditing){
        return(
            <form 
                action={onSubmit}
                ref={formRef} 
                className="flex items-center gap-x-2">
                    <FormInput
                        ref={inputRef}
                        id="title"
                        onBlur={()=>{}}
                        defaultValue={title}
                        className="text-2xl font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent text-gray-500 uppercase"
                    ></FormInput>
            </form>
        )
    }
    
    return(
        <Button 
        onClick={enableEditing}
        variant="transparent"
        className="font-bold text-2xl h-auto w-auto p-1 px-2 text-gray-500 uppercase text-center ml-6">
            {title}
        </Button>
    )
}