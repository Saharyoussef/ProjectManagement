import { Logo } from "@/components/logo";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b bg-white flex items-center rounded-full shadow-2xl"
    style={{
        borderRadius: '3px',
        background: '#e3d8ee',
        boxShadow: 'inset -21px -21px 42px #f2f2f2, inset 21px 21px 42px #ffffff'
      }}>

      <MobileSidebar></MobileSidebar>

      <div className="flex items-center gap-x-4 flex-1"> {/* Utilisation de flex-1 pour occuper tout l'espace restant */}
        <div className="hidden lg:flex">
          <Logo></Logo>
        </div>
      </div>

      <div className="flex items-center gap-x-4"> {/* Conteneur pour aligner OrganizationSwitcher et UserButton */}
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl="/organization/:id"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        >
        </OrganizationSwitcher>

        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        ></UserButton>
      </div>
    </nav>
  );
};
