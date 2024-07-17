"use client"
import React, { useState, useEffect } from "react";
import { usePathname } from 'next/navigation'; // Assurez-vous que cette importation est correcte pour votre environnement
import DMConversationItem from "./_components/DMConversationItem";
import ConversationPage from "./[conversationId]/page";
import ItemList from "../_components/item-list";

type Props = React.PropsWithChildren<{}>;

type Conversation = {
    id: string;
    imageUrl: string;
    username: string;
};

const staticConversations: Conversation[] = [
    {
        id: "1",
        imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=faces&fit=crop&w=150&h=150&q=80",
        username: "John Doe"
    },
    {
        id: "2",
        imageUrl: "https://images.unsplash.com/photo-1595433707802-e1662c2a67c3?crop=faces&fit=crop&w=150&h=150&q=80",
        username: "Jane Smith"
    },
    {
        id: "3",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=faces&fit=crop&w=150&h=150&q=80",
        username: "Alice Johnson"
    },
    {
        id: "4",
        imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=faces&fit=crop&w=150&h=150&q=80",
        username: "Bob Brown"
    },
    // Ajoutez d'autres conversations statiques ici avec des URL d'avatars professionnelles différentes
];

const ConversationLayout = ({ children }: Props) => {
    const pathname = usePathname();
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [organizationId, setOrganizationId] = useState<string | null>(null);

    useEffect(() => {
        // Extraction de l'ID de l'organisation à partir du pathname
        const orgIdMatch = pathname.match(/\/organization\/([^\/]*)\/chat\/conversations/);

        if (orgIdMatch && orgIdMatch[1]) {
            setOrganizationId(orgIdMatch[1]);
        }
    }, [pathname]);

    const handleSelectConversation = (conversation: Conversation) => {
        setSelectedConversation(conversation);
    };

    if (!organizationId) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <ItemList title="Conversations">
                {staticConversations.length > 0 ? (
                    staticConversations.map((conversation) => (
                        <DMConversationItem
                            key={conversation.id}
                            id={conversation.id}
                            imageUrl={conversation.imageUrl}
                            username={conversation.username}
                            organization={{ id: organizationId, slug: "", imageUrl: "", name: "" }}
                            onClick={() => handleSelectConversation(conversation)}
                        />
                    ))
                ) : (
                    <p className="w-full h-full flex items-center justify-center">
                        No Conversations Found
                    </p>
                )}
            </ItemList>
            {selectedConversation && (
                <ConversationPage conversation={selectedConversation} />
            )}
            {children}
        </>
    );
};

export default ConversationLayout;