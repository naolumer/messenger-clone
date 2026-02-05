import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"

interface Iparams {
    conversationId?: string
};

export aysnc function POST (
    request : Request, {params} : {params:Iparams}
) {
    try {
        const currentUser = await getCurrentUser();
        const {conversationId} = params;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', {status: 401})
        }
        const conversation = await prisma.conversation.findUnique({
            where:{
                id: conversationId
            },
            include :
            {
                messages:{
                    include:{
                        seen: true
                    }
                },
                users: true
            }
        });

        if (!conversation) {
            return new NextResponse('Invalid Id', {status: 400})
        }
        // find the last message
        const lastMessage = conversation.messages[conversation.messages.length-1];

        if (!lastMessage){
            return NextResponse.json(conversation);
        }

        // update seen of last message
        const updatedMessage = await prisma.message.update({
            where : {
                id: lastMessage.id
            }, 
            include: {
                sender: true,
                seen: true
            },
            data:{
                seen: {
                    connect: {
                        id : currentUser.id
                    }
                }
            }
        })



    } catch (error:any) {
        console.log(error, 'ERROR_MESSAGE_SEEN');
        return new NextResponse("Internal Error", {status:500})
    }
}