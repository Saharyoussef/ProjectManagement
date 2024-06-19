import {ClerkProvider} from "@clerk/nextjs";

const PlatformLayout=({children}: {children: React.ReactNode;})=>
{
    return(
        <ClerkProvider>
            {children}
        </ClerkProvider>
    );
};
export default PlatformLayout;
/*En utilisant ClerkProvider de cette manière dans un layout, 
vous pouvez garantir que les fonctionnalités de gestion des utilisateurs de Clerk 
sont disponibles pour toutes les pages qui utilisent ce layout, 
simplifiant ainsi le processus d'authentification et de gestion des utilisateurs . */