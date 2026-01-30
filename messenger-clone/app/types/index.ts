import {Message, Conversation, User} from "@prisma/client"

export type FullMessageType = Message & {
    sender : User,
    seen : User[]
};

export type FullConversationType = Conversation & {
    users: User[],
    messages: FullMessageType[],
}