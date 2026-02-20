import prisma from "@/app/libs/prismadb"
import getCurrentUser from "./getCurrentUser"

const getConversations = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return [];
    }

    try {
        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: 'desc'
            },
            where: {
                userIds: {
                    has : currentUser.id
                }
            },
            include : {
                users:true,
                messages: {
                    include: {
                        sender : true,
                        seen : true
                    }
                }
            }
        });

        const uniqueConversations = conversations.filter((conversation, index, allConversations) => {
            if (conversation.isGroup) {
                return true;
            }

            const otherUserId = conversation.userIds.find((id) => id !== currentUser.id);

            if (!otherUserId) {
                return true;
            }

            return index === allConversations.findIndex((item) => {
                if (item.isGroup) {
                    return false;
                }

                const itemOtherUserId = item.userIds.find((id) => id !== currentUser.id);
                return itemOtherUserId === otherUserId;
            });
        });

        return uniqueConversations

    } catch (error:any) {
        return [];
    }
}

export default getConversations
