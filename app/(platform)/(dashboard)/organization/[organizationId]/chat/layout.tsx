import { TooltipProvider } from "@/components/ui/tooltip";
import SidebarWrapper from "./_components/SidebarWrapper";


const ChatLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <TooltipProvider>
            <SidebarWrapper>
                {children}
            </SidebarWrapper>
        </TooltipProvider>
    );
};

export default ChatLayout;