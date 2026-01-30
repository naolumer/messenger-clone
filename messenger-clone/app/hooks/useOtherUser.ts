import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";

const useOtherUser = (conversation:FullConversationType | {
    users : User[]
}) =>{
    const session =  useSession();
    const useOtherUser = useMemo(()=> {
        
        const currentUserEmail = session?.data?.user?.email;
        const otherUser = conversation.users.filter((user)=> user.email !== currentUserEmail);

        return otherUser;
    }, [session?.data?.user?.email, conversation.users]);

    return useOtherUser[0];
}

export default useOtherUser;