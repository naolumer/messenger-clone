import { NextApiRequest, NextApiResponse } from "next";
import {getServerSession} from "next-auth"

import { pusherServer } from "@/app/libs/pusher";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler (
    request: NextApiRequest,
    response: NextApiResponse
) {
    if (request.method !== "POST") {
        return response.status(405).end();
    }

    const session = await getServerSession(request, response, authOptions);

    if (!session?.user?.email) {
        return response.status(401).end();
    }

    const parsedBody =
        typeof request.body === "string"
            ? Object.fromEntries(new URLSearchParams(request.body))
            : request.body || {};

    const socketId = parsedBody.socket_id;
    const channel = parsedBody.channel_name;

    if (!socketId || !channel) {
        return response.status(400).send("Invalid request");
    }

    const data = {
        user_id: session.user.email    
    };

    const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

    return response.send(authResponse);
}
