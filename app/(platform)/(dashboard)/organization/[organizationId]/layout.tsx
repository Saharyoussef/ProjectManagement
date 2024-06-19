import { OrgControl } from "./_components/org_control";

const OrganizationIdLayout = ({children}:{children: React.ReactNode;})=>{
    return(
        <>
            <OrgControl></OrgControl>
            {children}
        </>
        
    );
};

export default OrganizationIdLayout;

/*OrgControl est responsable de définir l'organisation active en fonction des paramètres d'URL. 
En plaçant ce composant dans le Layout, 
vous vous assurez que l'organisation active est toujours correctement configurée chaque fois que cette section de l'application est rendue. */