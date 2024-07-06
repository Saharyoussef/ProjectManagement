"use client"
import { useState } from "react";
import React from "react";
import Request from "./_components/Request";
import { toast } from "sonner";
import ItemList from "../_components/item-list";
import AddContactDialog from "./_components/AddContactDialog";
import ConversationFallback from "../conversations/_components/ConversationFallback";
import ConfirmDialog from "./_components/confirmDialog";


type Props = {};

const staticRequests = [
    {
        id: "1",
        imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=faces&fit=crop&w=150&h=150&q=80",
        username: "John Doe",
        email: "john.doe@gmail.com"
    },
    {
        id: "2",
        imageUrl: "https://images.unsplash.com/photo-1595433707802-e1662c2a67c3?crop=faces&fit=crop&w=150&h=150&q=80",
        username: "Jane Smith",
        email: "jane.smith@gmail.com"
    },
    {
        id: "3",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=faces&fit=crop&w=150&h=150&q=80",
        username: "Alice Johnson",
        email: "alice.johnson@gmail.com"
    },
    {
        id: "4",
        imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=faces&fit=crop&w=150&h=150&q=80",
        username: "Bob Brown",
        email: "bob.brown@gmail.com"
    },
    // Ajoutez d'autres demandes statiques ici avec des URL d'avatars professionnelles différentes
];

const FriendsPage = (props: Props) => {
    const [requests, setRequests] = useState(staticRequests);
    const [rejectingRequest, setRejectingRequest] = useState<string | null>(null);

    const handleAccept = (id: string) => {
        setRequests(requests.filter(request => request.id !== id));
        toast.success("You can send a message");
    };

    const handleReject = (id: string) => {
        setRejectingRequest(id);
    };

    const confirmReject = (id: string) => {
        setRequests(requests.filter(request => request.id !== id));
        toast.error("Chat request refused!");
        setRejectingRequest(null);
    };

    const cancelReject = () => {
        setRejectingRequest(null);
    };

    return (
        <>
            <ItemList title="Contacts" action={<AddContactDialog />}>
                {requests.map((request) => (
                    <Request
                        key={request.id}
                        id={request.id}
                        imageUrl={request.imageUrl}
                        username={request.username}
                        email={request.email}
                        onAccept={handleAccept}
                        onReject={handleReject}
                    />
                ))}
            </ItemList>
            <ConversationFallback />
            {rejectingRequest && (
                <ConfirmDialog
                    onConfirm={() => confirmReject(rejectingRequest!)}
                    onCancel={cancelReject}
                    message="Are you sure you don't want to accept the contact?"
                />
            )}
        </>
    );
};

export default FriendsPage;