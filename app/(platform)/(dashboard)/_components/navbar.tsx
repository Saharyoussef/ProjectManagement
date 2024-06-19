import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";
import { FormPopover } from "@/components/form/form.popover";

export const Navbar=()=>{
    return(
        <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">

            <MobileSidebar></MobileSidebar>

            <div className="flex items-center gap_x_4">
                <div className="hidden lg:flex">
                    <Logo></Logo>
                </div>
                
                <FormPopover align="start" side="bottom" sideOffset={18}>
                    <Button variant="primary" size="sm" className="rounded-sm hidden md:block h-auto py-1.5 px-2">
                        Create
                    </Button>
                </FormPopover>
               
                <FormPopover>
                    <Button variant="primary" size="sm" className="rounded-sm block md:hidden">
                        <Plus className="h-4 w-4"></Plus>
                    </Button>
                </FormPopover>
                
            </div>

            <div>
                <OrganizationSwitcher
                hidePersonal
                //Masque l'organisation personnelle de l'utilisateur dans le sélecteur d'organisation.
                afterCreateOrganizationUrl="/organization/:id"
                afterLeaveOrganizationUrl="/select-org"
                afterSelectOrganizationUrl="/organization/:id"
                
                //Propriété permettant de définir des styles personnalisés pour le composant.
                appearance={{
                    elements:{
                        rootBox:{
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                        },
                    },
                }}>
                </OrganizationSwitcher>

                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements:{
                            avatarBox:{
                                height:30,
                                width:30,
                            }
                        }
                    }}
                ></UserButton>

            </div>
        </nav>
    );
};