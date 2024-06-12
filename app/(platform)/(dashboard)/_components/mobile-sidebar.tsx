"use client";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {Sidebar} from "./sidebar";
import {useMobileSidebar} from "@/hooks/use-mobile-sidebar";
import {Menu} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet,SheetContent } from "@/components/ui/sheet";


export const MobileSidebar=()=>{
    const pathname=usePathname();
    const[isMounted, setIsMounted]= useState(false);

    const onOpen=useMobileSidebar((state)=>state.onOpen);
    const onClose=useMobileSidebar((state)=>state.onClose);
    const isOpen=useMobileSidebar((state)=>state.isOpen);
    
    useEffect(()=>{
        setIsMounted(true);
    },[]);

    useEffect(()=>{
        onClose();
    },[pathname,onClose]);

    if(!isMounted){
        return null;
    }

    return(
        <>
            <Button
                onClick={onOpen}
                className="block lg:hidden"
                variant="ghost"
                size="sm">
                <Menu className="h-4 w-4"></Menu>
            </Button>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent
                    side="left"
                    className="p-2 pt-10">
                    <Sidebar
                        storageKey="t-sidebar-mobile-state"
                    ></Sidebar>  
                </SheetContent>
            </Sheet>
        </>
    )
}