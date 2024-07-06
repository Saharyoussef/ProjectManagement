import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, User, X } from "lucide-react";

type Props = {
    id: string;
    imageUrl: string;
    username: string;
    email: string;
    onAccept: (id: string, username: string) => void;
    onReject: (id: string) => void;
};

const Request = ({ id, imageUrl, username, email, onAccept, onReject }: Props) => {
    return (
        <Card className="w-full p-2 flex flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-4 truncate">
                <Avatar>
                    <AvatarImage src={imageUrl} />
                    <AvatarFallback>
                        <User />
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col truncate">
                    <h4 className="truncate">{username}</h4>
                    <p className="text-xs text-muted-foreground truncate">{email}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button size="icon" onClick={() => onAccept(id, username)}>
                    <Check />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => onReject(id)}>
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </Card>
    );
};

export default Request;
