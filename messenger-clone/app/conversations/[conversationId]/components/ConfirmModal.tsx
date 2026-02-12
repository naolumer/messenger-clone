"use client"

import useConversation from "@/app/hooks/useConversation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useCallback } from "react";

interface ConfirmModalProps {
    isOpen?: boolean;
    onClose: ()=> void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose
})=> {
    const router = useRouter();
    const {conversationId}  = useConversation();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = useCallback(()=>{
        setIsLoading(true);

        axios.delete(`/api/conversations/${conversartionId}`).then(()=>{
            onClose();
            router.push('/conversations');
            router.refresh();
        }).catch(()=> toast.error("Something went wrong"))
        .finally(()=> setIsloading(false))
    },[conversationId, router, onClose])
    return (
        <div>
            modal
        </div>
    )
    
}

export default ConfirmModal