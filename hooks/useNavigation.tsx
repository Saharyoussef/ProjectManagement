import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { MessageSquare, Users } from "lucide-react";

export const useNavigation = () => {
  const pathname = usePathname();

  // Extract the organization ID and section from the URL
  const [, , organizationId, section] = pathname.split("/");

  // Determine if we're in the "Conversations" or "Contacts" section
  const activeConversations = section === "conversations";
  const activeContacts = section === "contacts";

  // Construct the paths array based on the current URL section
  const paths = useMemo(
    () => [
      {
        name: "Conversations",
        href: `/organization/${organizationId}/chat/conversations`,
        icon: <MessageSquare />,
        active: activeConversations,
      },
      {
        name: "Contacts",
        href: `/organization/${organizationId}/chat/contacts`,
        icon: <Users />,
        active: activeContacts,
      },
    ],
    [pathname]
  );

  return paths;
};
