"use client";

import{
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
}from "@/components/ui/popover";

import { Button } from "../ui/button";
import { X } from "lucide-react";
import { Form } from "@/app/(platform)/(dashboard)/organization/[organizationId]/form";

interface FormPopoverProps{
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom" ;
    align?:"start" |"center"| "end";
    sideOffset?:number;
}

export const FormPopover=(
    {
        children,
        side="bottom",
        align,
        sideOffset=0,
    }:FormPopoverProps)=>{
        return(
            <Popover>
                <PopoverTrigger asChild>
                    {children}
                </PopoverTrigger>
                <PopoverContent
                    align={align}
                    className="w-80 pt-3"
                    side={side}
                    sideOffset={sideOffset}
                >
                    <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                        Create a project
                    </div>

                    <PopoverClose asChild>
                        <Button 
                            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                            variant="ghost">
                                <X className="h-4 w-4"></X>
                        </Button>
                    </PopoverClose> 
                    <Form>
                    </Form>       
                </PopoverContent>
            </Popover>
        )
    }