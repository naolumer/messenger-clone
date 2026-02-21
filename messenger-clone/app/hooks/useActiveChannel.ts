import { useEffect } from "react";
import { Members } from "pusher-js";

import useActiveList from "./useActiveList";
import { pusherClient } from "../libs/pusher";

const useActiveChannel = () => {
    const { set, add, remove } = useActiveList();

    useEffect(() => {
        const channel = pusherClient.subscribe("presence-messenger");

        const handleSubscriptionSucceeded = (members: Members) => {
            const initialMembers: string[] = [];

            members.each((member: { id: string }) => {
                if (member.id) {
                    initialMembers.push(member.id);
                }
            });

            set(initialMembers);
        };

        const handleMemberAdded = (member: { id: string }) => {
            add(member.id);
        };

        const handleMemberRemoved = (member: { id: string }) => {
            remove(member.id);
        };

        channel.bind("pusher:subscription_succeeded", handleSubscriptionSucceeded);
        channel.bind("pusher:member_added", handleMemberAdded);
        channel.bind("pusher:member_removed", handleMemberRemoved);

        return () => {
            channel.unbind("pusher:subscription_succeeded", handleSubscriptionSucceeded);
            channel.unbind("pusher:member_added", handleMemberAdded);
            channel.unbind("pusher:member_removed", handleMemberRemoved);
            pusherClient.unsubscribe("presence-messenger");
            set([]);
        };
    }, [set, add, remove]);
};

export default useActiveChannel;
