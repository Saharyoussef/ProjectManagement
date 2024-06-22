"use client";
import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import {List} from "@prisma/client";
import{useState, useRef,ElementRef}from "react"
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import { ListOptions } from "./list-options";

interface ListHeaderProps{
    data:List;
    onAddCard:()=>void;
};

export const ListHeader=({
    data,
    onAddCard,
}:ListHeaderProps)=>{
    const[title, setTitle]=useState(data.title)
    //to store the title in its own state to facilitate its modification
    const [isEditing,setIsEditing]=useState(false);

    const formRef=useRef<ElementRef<"form">>(null);
    const inputRef=useRef<ElementRef<"input">>(null);

    const enableEditing =()=>{
        setIsEditing(true);
        setTimeout(()=>{
            inputRef.current?.focus();
            inputRef.current?.select();
        })
    };

    const disableEditing=()=>{
        setIsEditing(false);
    };

    const{execute}=useAction(updateList,{
        onSuccess:(data)=>{
            toast.success(`Renamed to "${data.title}"`);
            setTitle(data.title);
            disableEditing();
        },
        onError:(error)=>{
            toast.error(error);
        }
    });

    const handleSubmit=(formDta:FormData)=>{
        const title=formDta.get("title")as string;
        const id=formDta.get("id")as string;
        const projectId=formDta.get("projectId")as string;

        if(title===data.title){
            return disableEditing();
        }

        execute({
            title,id,projectId
        });
    }

    const onBlur=()=>{
        formRef.current?.requestSubmit();
    }

    const oneKeyDown =(e:KeyboardEvent)=>{
        if(e.key==="Escape"){
            formRef.current?.requestSubmit();
        }
    };

    useEventListener("keydown",oneKeyDown);



    return (
        <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
            {isEditing ? (
                <form 
                    ref={formRef}
                    action={handleSubmit}
                    className="flex-1 px-[2px]">
                    <input hidden id="id" name="id" value={data.id}></input>
                    <input hidden id="projectId" name="projectId" value={data.projectId}></input>
                    <FormInput
                        ref={inputRef}
                        onBlur={onBlur}
                        id="title"
                        placeholder="Enter list title"
                        defaultValue={title}
                        className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
                    ></FormInput>
                    <button type="submit" hidden></button>
                </form>
            ):(
                <div 
                    className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
                    onClick={enableEditing}>
                        {title}
                </div>
            )}  
            <ListOptions
                onAddCard={onAddCard}
                data={data}
            ></ListOptions>    
        </div>
    )
}