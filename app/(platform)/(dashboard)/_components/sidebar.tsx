"use client";
//L'utilisation de "use client" au début du fichier indique que le code suivant 
//doit être exécuté uniquement du côté client (côté navigateur) 

import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

import Link from "next/link";
import {Plus} from "lucide-react";
import {useLocalStorage} from "usehooks-ts";
import {useOrganization, useOrganizationList}from "@clerk/nextjs";
import { NavItem, Organization } from "./nav-item";

interface SideBarProps {
    storageKey?:string;
};

/*'interface SideBarProps est une manière de définir la structure des propriétés (props) attendues par le composant Sidebar. 
Cette interface spécifie qu'une prop optionnelle appelée storageKey peut être passée au composant, 
et qu'elle doit être de type string si elle est fournie. */

/*Lorsqu'un utilisateur interagit avec la barre latérale 
(par exemple, en développant ou réduisant un élément de la barre latérale), 
l'état de ces interactions peut être enregistré localement dans le navigateur à l'aide du stockage local. 
Cela permet de conserver l'état de la barre latérale même après un rafraîchissement de la page ou une navigation vers une autre page. */

export const Sidebar =({
    storageKey= "t-sidebar-state",
    //"t-sidebar-state" est une chaîne de caractères utilisée comme clé pour stocker les informations sur l'état de la barre latérale 
    //dans le stockage local du navigateur. 

}:SideBarProps)=>{

    //les props passées à ce composant doivent être conformes à la structure définie dans l'interface SideBarProps.

    const[expanded, setExpanded]= useLocalStorage<Record<string, any>>(storageKey,{});
    /*useLocalStorage est un hook qui permet de stocker des données localement dans le navigateur.
    Record<string, any> est un type TypeScript qui définit un objet avec des clés de type string et des valeurs de type any.
    storageKey est la clé utilisée pour stocker les données dans le stockage local du navigateur.
    expanded est la variable qui contiendra les données récupérées du stockage local, représentant l'état d'expansion des éléments de la barre latérale.
    setExpanded est une fonction qui permet de mettre à jour les données stockées dans le stockage local. */

    /*Le deuxième argument {} est la valeur par défaut à utiliser si aucune valeur n'est déjà stockée sous la clé storageKey. 
    Cela signifie que si aucune donnée n'est stockée sous la clé storageKey,expanded sera initialisé avec un objet vide {}. */

    /*Cette syntaxe utilise la décomposition de tableau pour extraire les valeurs retournées par useLocalStorage
    dans deux variables distinctes : expanded et setExpanded. */

    const {
        organization: activeOrganization,
        isLoaded: isLoadedOrg
    }=useOrganization();

    /*useOrganization est un hook qui permet de récupérer des informations sur l'organisation active de l'utilisateur.
    organization: activeOrganization extrait la propriété organization renvoyée par useOrganization et la stocke dans la variable activeOrganization.
    isLoaded: isLoadedOrg extrait la propriété isLoaded renvoyée par useOrganization et la stocke dans la variable isLoadedOrg. Cette propriété indique si les informations sur l'organisation sont chargées.*/
    
    /*Cette syntaxe utilise la décomposition d'objet pour extraire les valeurs renvoyées par useOrganization() 
    dans deux variables distinctes : activeOrganization et isLoadedOrg. */

    const{
        userMemberships,
        isLoaded: isLoadedOrgList
    }=useOrganizationList({
        userMemberships:{
            infinite: true,
        },
    });

    /*useOrganizationList est un hook qui permet de récupérer la liste des organisations auxquelles l'utilisateur appartient.
    { userMemberships: { infinite: true } } est un argument passé à useOrganizationList pour spécifier que l'on souhaite récupérer les adhésions de l'utilisateur de manière infinie (c'est-à-dire toutes les adhésions).
    userMemberships contient la liste des adhésions de l'utilisateur.
    isLoaded: isLoadedOrgList extrait la propriété isLoaded renvoyée par useOrganizationList et la stocke dans la variable isLoadedOrgList. Cette propriété indique si les informations sur les adhésions de l'utilisateur sont chargées. */

    const defaultAccordionValue: string[]=Object.keys(expanded)
    .reduce((acc:string[],key:string)=>{
        if(expanded[key]){
            acc.push(key);
        }
        return acc;
    },[]);

    /*const defaultAccordionValue: string[] = : Déclare une variable defaultAccordionValue comme un tableau de chaînes de caractères.
    Object.keys(expanded) : Récupère un tableau contenant les clés de l'objet expanded.
    .reduce((acc: string[], key: string) => { : Utilise la méthode reduce pour parcourir chaque clé de l'objet expanded. acc est l'accumulateur qui stocke les valeurs au fur et à mesure que la réduction progresse. key est la clé actuellement traitée.
    if (expanded[key]) { acc.push(key); } : Vérifie si la valeur associée à la clé key dans l'objet expanded est true. Si c'est le cas, la clé est ajoutée à l'accumulateur acc.
    return acc; : Retourne l'accumulateur mis à jour à chaque itération.
    }, []); : Fournit un tableau vide comme valeur initiale de l'accumulateur. Cela signifie que acc commence comme un tableau vide au premier tour de la réduction. */

    const onExpand =(id:string)=>{
        setExpanded((curr)=>({
        ...curr,
        [id]:!expanded[id],   
        }));
    };

    /*Cette fonction onExpand est utilisée pour mettre à jour l'état d'expansion d'un élément de l'accordéon lorsqu'il est cliqué.
    const onExpand =(id:string)=>{ : Définit une fonction onExpand qui prend un argument id de type string, qui représente l'identifiant de l'élément de l'accordéon à modifier.
    setExpanded((curr)=>({ ...curr, [id]:!expanded[id], }));
    Utilise la fonction de mise à jour de l'état setExpanded pour modifier l'état de l'accordéon.
    La fonction de mise à jour reçoit une fonction curr qui représente l'état actuel de l'accordéon.
    L'opération { ...curr, [id]:!expanded[id], } crée un nouvel objet d'état en copiant d'abord toutes les valeurs de l'état actuel (...curr) et en mettant à jour la valeur associée à la clé id.
    La valeur associée à la clé id est inversée en utilisant !expanded[id], ce qui signifie que si expanded[id] est true, elle devient false, et vice versa.
    Cela garantit que chaque fois que la fonction onExpand est appelée avec un identifiant id, l'état d'expansion de cet élément est inversé dans l'état de l'accordéon. */

    if(!isLoadedOrg||!isLoadedOrgList||userMemberships.isLoading){
        return(
            <>
                <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-10 w-[50%]"></Skeleton>
                    <Skeleton className="h-10 w-10"></Skeleton>    
                </div> 
                <div className="space-y-2">
                    <NavItem.Skeleton></NavItem.Skeleton>
                    <NavItem.Skeleton></NavItem.Skeleton>
                    {/* ceci pour avoir l'effet transparent lors du chargement de la page */}
                </div>  
            </>
        )
    }

    /*if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) { : Vérifie si les données nécessaires ne sont pas encore chargées.
    !isLoadedOrg et !isLoadedOrgList vérifient si les données de l'organisation et de la liste des organisations ne sont pas encore chargées.
    userMemberships.isLoading vérifie si les adhésions de l'utilisateur sont en cours de chargement.
    return ( ... ) : Si les données ne sont pas encore chargées, affiche un effet de chargement (squelette) à la place du contenu réel. */

    return(
        <>
            <div className="font-medium text-xs flex items-center mb-1">
                <span className="pl-4">
                    Pole
                </span>
                <Button
                    asChild
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="ml-auto"
                 >
                    <Link href="/select-org">
                        <Plus className="h-4 w-4"></Plus>
                    </Link>
                </Button>
            </div>
            <Accordion
            type="multiple"
            defaultValue={defaultAccordionValue}
            className="space-y-2">
                {userMemberships.data.map(({organization})=>(
                    /*C'est une boucle qui parcourt chaque élément organization dans userMemberships.data 
                    (la liste des organisations de l'utilisateur) 
                    et crée un élément NavItem pour chaque organisation. */
                    <NavItem 
                        key={organization.id}
                        isActive={activeOrganization?.id===organization.id}
                        //Détermine si l'organisation actuelle est active 
                        isExpanded={expanded[organization.id]}
                        //Détermine si l'organisation est actuellement étendue
                        organization={organization as Organization}
                        //Fournit les détails de l'organisation à afficher dans le NavItem
                        onExpand={onExpand}>
                    </NavItem>
                ))}
            </Accordion>
        </>      
    )
}