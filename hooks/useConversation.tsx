import {useParams} from "next/navigation";
import {useMemo} from "react";

export const useConversation=()=>{
    const params=useParams();

    const conversationId=useMemo(()=>params?.conversationId || ("" as string),
[params?.conversationId]
    //if it doen't exist we just assign an empty string
);
    const isActive=useMemo(()=>!!conversationId,[conversationId]);
    //keeps track on the fact if we are on an active conversation or not
    //we put!! in order to convert any type into boolean
    return {
        isActive,
        conversationId,
    };
};

//we want when we are in a conversation page we want to get that conversation id and know if it's active