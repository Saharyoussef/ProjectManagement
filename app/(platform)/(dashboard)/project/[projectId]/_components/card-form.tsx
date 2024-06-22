"use client";

import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { forwardRef } from "react";
import{useAction} from "@/hooks/use-action";
import {createCard} from "@/actions/create-card";
import {useRef, ElementRef,KeyboardEventHandler}from "react";
import{useParams} from"next/navigation";
import{useOnClickOutside,useEventListener}from "usehooks-ts"
import { toast } from "sonner";

interface CardFormProps{
    listId:string;
    enableEditing:()=>void;
    disableEditing:()=>void;
    isEditing:boolean;
};

export const CardForm=forwardRef<HTMLTextAreaElement,CardFormProps>(({
    listId,
    enableEditing,
    disableEditing,
    isEditing,
},ref)=>{

    const params=useParams();
    const formRef=useRef<ElementRef<"form">>(null);
    const{execute,fieldErrors}=useAction(createCard,{
        onSuccess:(data)=>{
            toast.success(`Card"${data.title}" created`);
            formRef.current?.reset();
            //pour vider le form
        },
        onError:(error)=>{
            toast.error(error);
        },
    });
    const onKeyDown=(e:KeyboardEvent)=>{
        if(e.key==="Escape"){
            disableEditing();
        }
    };

    useOnClickOutside(formRef,disableEditing);
    useEventListener("keydown",onKeyDown);

    const onTextareakeyDown:KeyboardEventHandler<HTMLTextAreaElement>=(e)=>{
        if(e.key==="Enter"&& !e.shiftKey){
            e.preventDefault();
            formRef.current?.requestSubmit();
        };
        //if the user press enter it will submit the form except if he does shift he goes to e new line.
    };

    const onSubmit=(formData:FormData)=>{
        const title=formData.get("title") as string;
        const listId=formData.get("listId") as string;
        const projectId=params.projectId as string;
        execute({title, listId,projectId})
    }

    if(isEditing){
        return(
            <form 
            ref={formRef}
            action={onSubmit}
            className="m-1 py-0.5 px-1 space-y-4">
                <FormTextarea
                    id="title"
                    onKeyDown={onTextareakeyDown}
                    ref={ref}
                    placeholder="Enter a task"
                    errors={fieldErrors}
                ></FormTextarea>
                <input
                    hidden
                    id="listId"
                    name="listId"
                    value={listId}>
                </input>
                <div className="flex items-center gap-x-1">
                    <FormSubmit>
                        Add a task
                    </FormSubmit>
                    <Button onClick={disableEditing} size="sm" variant="ghost">
                        <X className="h-5 w-5"></X>
                    </Button>
                </div>
            </form>
        )
    }
    return(
        <div className="pt-2 px-2">
            <Button
                onClick={enableEditing}
                className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
                size="sm"
                variant="ghost">
                    <Plus className="h-4 w-4 mr-2"></Plus>
                    Add a task
            </Button>
        </div>
    );
});

CardForm.displayName="CardForm";

//on a utilisé forwardRef car on a comme props ref