import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import {ClerkProvider} from "@clerk/nextjs";
import { Toaster } from "sonner";

const PlatformLayout=({children}: {children: React.ReactNode;})=>
{
    return(
        <ClerkProvider>
            <QueryProvider>
                <Toaster></Toaster>
                <ModalProvider></ModalProvider>
                {children}
            </QueryProvider>    
        </ClerkProvider>
    );
};
export default PlatformLayout;
/*En utilisant ClerkProvider de cette manière dans un layout, 
vous pouvez garantir que les fonctionnalités de gestion des utilisateurs de Clerk 
sont disponibles pour toutes les pages qui utilisent ce layout, 
simplifiant ainsi le processus d'authentification et de gestion des utilisateurs . */

/*je dois mettre toaster pour avoir les pop up qui s'affiche aprés chaque action */

/*QueryProvider will not render everything as client componnent jsut because it's a client comp
 because children is a server component*/