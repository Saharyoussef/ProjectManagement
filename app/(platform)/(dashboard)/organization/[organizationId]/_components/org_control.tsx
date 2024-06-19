"use client"

import {useEffect} from "react";
import { useParams } from "next/navigation";
import { useOrganizationList } from "@clerk/nextjs";

export const OrgControl =()=>{
    const params=useParams();
    //Utilise le hook useParams pour obtenir les paramètres de l'URL

    const {setActive}=useOrganizationList();
    /*Utilise le hook useOrganizationList pour obtenir la fonction setActive, 
    qui est une fonction pour définir l'organisation active dans la liste des organisations. */

    useEffect(()=>{
        if(!setActive) return;
        //Vérifie si setActive est défini. S'il n'est pas défini, le composant ne fait rien et retourne null.

        setActive({
            organization: params.organizationId as string,
        });
    },[setActive, params.organizationId]);
    return null;
};

/*Appelle la fonction setActive avec un objet contenant la clé organization définie 
sur la valeur de params.organizationId en tant que chaîne de caractères. 
Cela permet de définir l'organisation active dans la liste des organisations. */