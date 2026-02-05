"use client";

import { FullMessageType } from "@/app/types";
import { useSession } from "next-auth/react";
import clsx from "clsx"
import Avatar from "@/app/components/Avatar";
import { format } from "date-fns";
import Image from "next/image";

interface MessageBoxProps {
    data: FullMessageType;
    isLast?:boolean
}

const MessageBox: React.FC<MessageBoxProps> = ({
    data,
    isLast
})=>{
    const session = useSession();

    const isOwn = session?.data?.user?.email === data ?.sender?.email;
    
    const seenList = (data.seen || []).filter((user)=> user.email !== data?.sender?.email)
    .map((user)=> user.name)
    .join(',');

    const container = clsx(
        "flex w-full gap-3 px-4 py-2",
        isOwn && "justify-end"
    );

    const avatar = clsx (
        isOwn && "order-2"
    );

    const body = clsx (
        "flex max-w-[75%] flex-col gap-1.5 sm:max-w-[60%]",
        isOwn && "items-end"
    );

    const message = clsx(
        "text-sm w-fit overflow-hidden break-words shadow-sm ring-1 ring-black/5",
        isOwn ? "bg-sky-500 text-white" : "bg-white text-gray-800",
        data.image ? "rounded-2xl p-0" : "rounded-2xl px-4 py-2"
    );

    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user = {data.sender} />
            </div>
            <div className={body}>
                <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-500">
                        {data.sender.name}
                    </div>
                    <div className="text-xs text-gray-400">
                        {format(new Date(data.createdAt),'p' )}
                    </div>
                </div>
                <div className={message}>
                    {data.image ? (
                        <Image
                            alt = "Image"
                            height = "288"
                            width = "288"
                            src = {data.image}
                            className = "h-auto w-full object-cover transition hover:scale-[1.02]" />
                    ): (
                        <div className="leading-relaxed">{data.body}</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MessageBox
