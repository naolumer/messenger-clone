"use client"
import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types"
import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import clsx from 'clsx'
import GroupChatModal from "../[conversationId]/components/GroupChatModal";
import { User } from "@prisma/client";
import { pusherClient } from "@/app/libs/pusher";
import find from "lodash/find";
import { useSession } from "next-auth/react";


interface ConversationListProps {
    initialItems : FullConversationType[];
    users: User[]
}

const ConversationList: React.FC<ConversationListProps> = ({
    initialItems,
    users
}) => {
    const [items, setItems] = useState(initialItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const {conversationId, isOpen} = useConversation();
    const { data: session } = useSession();
    const pusherkey = useMemo(()=> {
        return session?.user?.email;
    },[session?.user?.email]);

    useEffect(()=> {
        if (!pusherkey) {
            return;
        }

        pusherClient.subscribe(pusherkey);

        const newHandler = (conversation: FullConversationType)=> {
            setItems((current)=> {
                if (find(current, {id:conversation.id})) {
                    return current;
                }
                return [conversation, ...current]
            })
        };

        const updateHandler = (conversation: FullConversationType) => {
            setItems((current) =>
                current.map((currentConversation) => {
                    if (currentConversation.id === conversation.id) {
                        return {
                            ...currentConversation,
                            messages: conversation.messages,
                        };
                    }

                    return currentConversation;
                })
            );
        };

        const removeHandler  = (conversation: FullConversationType)=> {
            setItems((current)=> {
                return [...current.filter((convo)=> convo.id !== conversation.id)]
            })
        };
         
        pusherClient.bind("conversation:new", newHandler);
        pusherClient.bind("conversation:update", updateHandler);
        pusherClient.bind("conversation:remove", removeHandler);
        

        return ()=> {
            pusherClient.unsubscribe(pusherkey);
            pusherClient.unbind('conversation:new', newHandler);
            pusherClient.unbind("conversation:update", updateHandler);
            pusherClient.unbind('conversation:remove', removeHandler);
        }
    },[pusherkey])

    return (
        <>
        <GroupChatModal 
            users = {users}
            isOpen={isModalOpen}
            onClose= {()=>setIsModalOpen(false)}/>
        <aside className={clsx(`
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:w-80
        lg:block
        overflow-y-auto
        border-r
        border-gray-200
        `,
        isOpen ? 'hidden' : 'block w-full left-0')}>
        
        <div className="px-5">
            <div className="flex justify-between mb-4 pt-4">
                <div className="text-2xl font-bold text-neutral-800">
                    Messages
                </div>
                <div 
                onClick={()=> setIsModalOpen(true)}
                className="rounded-full
                p-2
                bg-gray-100
                text-gray-600
                cursor-pointer
                hover:opacity-75
                transition">
                
                <MdOutlineGroupAdd size={20}/>
                </div>

            </div>
            <div className="space-y-2">
                {items.map((item)=>(
                    <ConversationBox 
                        key={item.id}
                        data = {item}
                        selected= {conversationId === item.id}/>
                ))}
            </div>

        </div>
        </aside>
        </>
        
    )
}

export default ConversationList
