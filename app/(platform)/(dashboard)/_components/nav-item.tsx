import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import Image from "next/image";
import { Activity, Layout, Settings, MessageCircle, Home } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export type Organization = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
};

interface NavItemProps {
  isExpanded: boolean;
  isActive: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
}

export const NavItem = ({
  isExpanded,
  isActive,
  organization,
  onExpand,
}: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      label: "Home",
      icon: <Home className="h-6 w-6 mr-2"></Home>, // Augmente la taille de l'icône
      href: `/organization/${organization.id}/home`,
    },
    {
      label: "Projects",
      icon: <Layout className="h-6 w-6 mr-2"></Layout>, // Augmente la taille de l'icône
      href: `/organization/${organization.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="h-6 w-6 mr-2"></Activity>, // Augmente la taille de l'icône
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Chat",
      icon: <MessageCircle className="h-6 w-6 mr-2"></MessageCircle>, // Augmente la taille de l'icône
      href: `/organization/${organization.id}/chat`,
    },
    {
      label: "Settings",
      icon: <Settings className="h-6 w-6 mr-2"></Settings>, // Augmente la taille de l'icône
      href: `/organization/${organization.id}/settings`,
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-lg hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "bg-[#DACAE8]/10 text-[#684A7F]"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-10 h-10 relative">
            <Image
              fill
              src={organization.imageUrl}
              alt="Organization"
              className="rounded-sm object-cover"
            />
          </div>
          <span className="font-medium text-base">{organization.name}</span> {/* Augmente la taille du texte */}
        </div>
      </AccordionTrigger>

      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => (
          <Button
            key={route.href}
            size="sm"
            onClick={() => onClick(route.href)}
            className={cn(
              "w-full font-normal justify-start pl-12 mb-2",
              pathname === route.href && "bg-[#DACAE8]/10 text-[#684A7F]"
            )}
            variant="ghost"
          >
            {route.icon}
            <span className="ml-2 text-lg">{route.label}</span> {/* Augmente la taille du texte */}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

// Fonction de squelette pour l'élément NavItem
NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute"></Skeleton>
      </div>
      <Skeleton className="h-10 w-full"></Skeleton>
    </div>
  );
};
