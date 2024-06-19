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
    //Utilise le hook useState pour gérer l'état de isMounted, qui indique si le composant est monté ou non. 
    //Au départ, il est défini sur false.

    const onOpen=useMobileSidebar((state)=>state.onOpen);
    //Utilise le hook useMobileSidebar pour obtenir la fonction onOpen qui ouvre la barre latérale mobile.
    
    const onClose=useMobileSidebar((state)=>state.onClose);
    //Utilise le hook useMobileSidebar pour obtenir la fonction onClose qui ferme la barre latérale mobile
    
    const isOpen=useMobileSidebar((state)=>state.isOpen);
    //indique si la barre latérale mobile est ouverte ou non.
    
    useEffect(()=>{
        setIsMounted(true);
    },[]);

    useEffect(()=>{
        onClose();
    },[pathname,onClose]);
    //Utilise le hook useEffect pour fermer la barre latérale mobile lorsque le chemin d'URL change.

    if(!isMounted){
        return null;
    }

    return(
        <>
            <Button
                onClick={onOpen}
                className="block lg:hidden mr-2"
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