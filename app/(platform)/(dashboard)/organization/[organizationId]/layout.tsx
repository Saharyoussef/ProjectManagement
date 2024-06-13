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