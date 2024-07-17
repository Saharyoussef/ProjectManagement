import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";
import Link from "next/link";

export type Organization = {
    id: string;
    slug: string;
    imageUrl: string;
    name: string;
};

type Props = {
    id: string;
    imageUrl: string;
    username: string;
    organization: Organization;
    onClick: () => void;
};

const DMConversationItem = ({ id, imageUrl, username, organization, onClick }: Props) => {
    return (
        <div onClick={onClick}>
            <Link href={`/organization/${organization.id}/chat/conversations/${id}`} className="w-full">
                <Card className="p-2 flex flex-row items-center gap-4 truncate">
                    <div className="flex flex-row items-center gap-4 truncate">
                        <Avatar>
                            <AvatarImage src={imageUrl} />
                            <AvatarFallback>
                                <User />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col truncate">
                            <h4 className="truncate">{username}</h4>
                            <p className="text-sm text-muted-foreground truncate">
                                Start the conversation!
                            </p>
                        </div>
                    </div>
                </Card>
            </Link>
        </div>
    );
};

export default DMConversationItem;
