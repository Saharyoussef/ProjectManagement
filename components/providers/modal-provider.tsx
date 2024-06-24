"use client";

import { CardModal } from "@/components/modals/card-modal";
import{useEffect,useState}from "react";

export const ModalProvider=()=>{
    const [isMounted,setIsMounted]=useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[]);

    //useEffect can only be rendered on the client

    if(!isMounted){
        return null;
    }

    return(
        <>
            <CardModal />
        </>
    )
}

