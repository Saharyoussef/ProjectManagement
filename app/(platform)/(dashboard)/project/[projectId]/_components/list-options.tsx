"use client";

import { List } from "@prisma/client";
import{Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverClose
}from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { FormSubmit } from "@/components/form/form-submit";
import { Separator } from "@/components/ui/separator";
import {useAction} from "@/hooks/use-action"
import{deleteList}from "@/actions/delete-list";
import { toast } from "sonner";
import{ElementRef,useRef, useState}from "react"
import { copyList } from "@/actions/copy-list";
import ConfirmDialog from "../../../organization/[organizationId]/chat/contacts/_components/confirmDialog";

interface ListOptionsProps{
    data:List;
    onAddCard:()=>void;
};

export const ListOptions=({
    data,
    onAddCard,
}:ListOptionsProps)=>{

    const closeRef=useRef<ElementRef<"button">>(null)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [deleteFormData, setDeleteFormData] = useState<FormData | null>(null);

    const {execute:executeDelete}=useAction(deleteList,{
        onSuccess:(data)=>{
            toast.success(`List"${data.title}"deleted`);
            closeRef.current?.click();
        },
        onError:(error)=>{
            toast.error(error);
        }
    });

    const {execute:executeCopy}=useAction(copyList,{
        onSuccess:(data)=>{
            toast.success(`List"${data.title}"deleted`);
            closeRef.current?.click();
        },
        onError:(error)=>{
            toast.error(error);
        }
    });

    const onCopy=(formData:FormData)=>{
        const id=formData.get("id")as string;
        const projectId=formData.get("projectId") as string;
        executeCopy({id, projectId});
    };

    const onDelete = (formData: FormData) => {
        setDeleteFormData(formData);
        setShowConfirmDialog(true);
    };

    const confirmDelete = () => {
        if (deleteFormData) {
            const id = deleteFormData.get("id") as string;
            const projectId = deleteFormData.get("projectId") as string;
            executeDelete({ id, projectId });
        }
        setShowConfirmDialog(false);
    };

    const cancelDelete = () => {
        setShowConfirmDialog(false);
    };


    return(
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button className="h-auto w-auto p-2" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
                    <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                        List Actions
                    </div>
                    <PopoverClose ref={closeRef} asChild>
                        <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
                            <X className="h-4 w-4" />
                        </Button>
                    </PopoverClose>
                    <Button
                        onClick={onAddCard}
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                        variant="ghost">
                        Add Task
                    </Button>

                    <form action={onCopy}>
                        <input hidden name="id" id="id" value={data.id}></input>
                        <input hidden name="projectId" id="projectId" value={data.projectId}></input>
                        <Button
                            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                            variant="ghost">
                            Copy List
                        </Button>
                    </form>

                    <Separator />

                    <form action={onDelete}>
                        <input hidden name="id" id="id" value={data.id}></input>
                        <input hidden name="projectId" id="projectId" value={data.projectId}></input>
                        <Button
                            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                            variant="ghost">
                            Delete List
                        </Button>
                    </form>
                </PopoverContent>
            </Popover>
            {showConfirmDialog && (
                <ConfirmDialog
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                    message="Are you sure you want to delete this list?"
                />
            )}
        </>
    );
};