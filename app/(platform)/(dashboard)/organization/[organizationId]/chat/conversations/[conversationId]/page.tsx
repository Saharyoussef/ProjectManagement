"use client"
import React, { useState } from "react";
import Header from "./_components/Header";
import ConversationContainer from "../_components/ConversationContainer";
import Body from "./_components/body";
import ChatInput from "./_components/ChatInput";

type Conversation = {
    id: string;
    imageUrl: string;
    username: string;
};

type Message = {
    id: string;
    sender: "me" | "receiver";
    content: string;
};

type Props = {
    conversation: Conversation;
};

const ConversationPage = ({ conversation }: Props) => {
    if (!conversation) {
        return <p></p>; // ou une autre indication de chargement
    }
        const [messages, setMessages] = useState<Message[]>([
            { id: "1", sender: "receiver", content: "Hello!" },
            { id: "2", sender: "receiver", content: "How are you?" }
        ]);
    
        const handleSendMessage = (message: string) => {
            const newMessage: Message = {
                id: (messages.length + 1).toString(),
                sender: "me",
                content: message,
            };
            setMessages([newMessage, ...messages]);
        };

    return (
        <ConversationContainer>
            <Header imageUrl={conversation.imageUrl} name={conversation.username} />
            <Body messages={messages} />
            <ChatInput onSendMessage={handleSendMessage} />
        </ConversationContainer>
    );
};

export default ConversationPage;
