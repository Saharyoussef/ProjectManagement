"use client";

import { AccordionItem, AccordionTrigger,AccordionContent } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import Image from "next/image";
import {Activity,Layout,Settings}from "lucide-react";
import { useRouter,usePathname} from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export type Organization={
    id: string;
    slug: string;
    imageUrl: string;
    name:string;
};

interface NavItemProps{
    isExpanded: boolean;
    isActive: boolean;
    organization: Organization;
    onExpand: (id: string)=>void;
};

export const NavItem=({
    isExpanded,
    isActive,
    organization,
    onExpand,
}:NavItemProps)=>{

    const router=useRouter()
    //Utilise le hook useRouter de Next.js pour obtenir l'objet router, qui permet de gérer la navigation
    const pathname=usePathname()
    //Utilise le hook usePathname de Next.js pour obtenir le chemin d'accès de l'URL actuelle.
    const routes=[
        {
            label: "Projects",
            icon: <Layout className="h-4 w-4 mr-2"></Layout>,
            href: `/organization/${organization.id}`,
            //${organization.id} est une expression JavaScript insérée dans la chaîne. Elle est remplacée par la valeur de organization.id. 
            //Par exemple, si organization.id vaut "123", l'URL finale sera "/organization/123"
        },

        {
            label: "Activity",
            icon: <Activity className="h-4 w-4 mr-2"></Activity>,
            href: `/organization/${organization.id}/activity`,
        },

        {
            label: "Settings",
            icon: <Settings className="h-4 w-4 mr-2"></Settings>,
            href: `/organization/${organization.id}/settings`,
        }
    ];

    const onClick=(href:string)=>{
        router.push(href);
    };
    /*Définit une fonction onClick qui prend un argument href (l'URL de la section) 
    et utilise router.push(href) pour naviguer vers cette URL lorsque le lien est cliqué. */

    return(
        <AccordionItem
        value={organization.id}
        className="border-none">
            <AccordionTrigger
                onClick={()=>onExpand(organization.id)}
                className={cn (
                    "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-lg hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
                    isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
                )}>
                    <div className="flex items-center gap-x-2">
                        <div className="w-7 h-7 relative">
                            <Image
                                fill
                                src={organization.imageUrl}
                                alt="Organization"
                                className="rounded-sm object-cover">
                            </Image>
                        </div>
                        <span className="font-medium text-sm">
                            {organization.name}
                        </span>
                    </div>
            </AccordionTrigger>

            <AccordionContent className="pt-1 text-neutral-700">
                {routes.map((route)=>(
                    <Button
                        key={route.href}
                        size="sm"
                        onClick={()=>onClick(route.href)}
                        className={cn(
                            "w-full font-normal justify-start pl-10 mb-1",
                            pathname===route.href && "bg-sky-500/10 text-sky-700"
                        )}
                        variant="ghost"
                    >
                        {route.icon}
                        {route.label}
                    </Button>
                ))}
            </AccordionContent>

        </AccordionItem>
    );
};

NavItem.Skeleton= function SkeletonNavItem (){
    return(
        <div className="flex items-center gap-x-2"> 
            <div className="w-10 h-10 relative shrink-0">
                <Skeleton className="h-full w-full absolute"></Skeleton>
            </div>
                <Skeleton className="h-10 w-full"></Skeleton>
        </div>
    )
}