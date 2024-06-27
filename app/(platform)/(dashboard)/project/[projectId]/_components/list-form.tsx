"use client";
import { Plus, X } from "lucide-react";
import { ListWrapper } from "./list-wrapper";
import {useState, useRef, ElementRef}from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { useParams, useRouter } from "next/navigation";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { createList } from "@/actions/create-list";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";

export const ListForm=()=>{
    const router=useRouter();
    const params=useParams();
    const formRef=useRef<ElementRef<"form">>(null);
    const inputRef=useRef<ElementRef<"input">>(null);
    const [isEditing, setIsEditing]=useState(false);
    const enableEditing=()=>{
        setIsEditing(true);
        setTimeout(()=>{
            inputRef.current?.focus();
        });
    }; 

    const disableEditing=()=>{
        setIsEditing(false);
    };

    const {execute,fieldErrors}=useAction(createList,{
        onSuccess:(data)=>{
            toast.success(`List"${data.title}" created`);
            disableEditing();
            router.refresh();
        },
        onError:(error)=>{
            toast.error(error);
        }
    })

    const oneKeyDown=(e:KeyboardEvent)=>{
        if(e.key==="Escape"){
            disableEditing();
    };
};

useEventListener("keydown",oneKeyDown);
useOnClickOutside(formRef,disableEditing);

const onSubmit=(formData: FormData)=>{
    const title=formData.get("title")as string;
    const projectId=formData.get("projectId")as string;
    execute({title,projectId});
}

if(isEditing){
    return(
        <ListWrapper>
            <form
            action={onSubmit}
            ref={formRef}
            className="w-full p-3 rounded-md bg-gradient-to-r from-[#f3eff8] to-[#dacae8] space-y-4 shadow-md"
            >
                <FormInput
                    errors={fieldErrors}
                    ref={inputRef}
                    id="title"
                    className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-purple-500 focus:ring-0 focus:ring-purple-500"
                    placeholder="Enter List Title"
                    > 
                </FormInput>
                <input
                    hidden
                    value={params.projectId}
                    name="projectId">
                </input>
                <div className="flex items-center gap-x-1">
                    <FormSubmit>
                        Add List
                    </FormSubmit>
                    <Button
                        onClick={disableEditing}
                        size="sm"
                        variant="ghost"
                    >
                        <X className="h-5 w-5"></X>
                    </Button>
                </div>
            </form>
        </ListWrapper>
    )
}

    return(
        <ListWrapper>
            <button 
                onClick={enableEditing}
                className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm">
                    <Plus className="h-4 w-4 mr-2"></Plus>
                    Add a list
            </button>
        </ListWrapper>
    )
}