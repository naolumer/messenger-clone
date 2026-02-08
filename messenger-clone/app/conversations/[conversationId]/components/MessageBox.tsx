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
    isFirst?: boolean
}

const MessageBox: React.FC<MessageBoxProps> = ({
    data,
    isLast,
    isFirst
})=>{
    const session = useSession();

    const isOwn = session?.data?.user?.email === data ?.sender?.email;
    
    const seenList = (data.seen || []).filter((user)=> user.email !== data?.sender?.email)
    .map((user)=> user.name)
    .join(',');

    const container = clsx(
        "group flex w-full gap-2 px-4 py-1.5",
        isFirst && "mt-3",
        isOwn && "justify-end"
    );

    const avatar = clsx(
        "shrink-0",
        isOwn && "order-2"
    );

    const body = clsx(
        "flex max-w-[78%] flex-col gap-1 sm:max-w-[60%]",
        isOwn && "items-end"
    );

    const message = clsx(
        "text-[15px] w-fit max-w-full overflow-hidden break-words shadow-sm",
        isOwn ? "bg-[#0084FF] text-white" : "bg-[#F0F0F0] text-gray-900",
        data.image ? "rounded-2xl p-0" : "rounded-2xl px-4 py-2.5"
    );

    return (
        <div className={container}>
            {!isOwn && (
                <div className={avatar}>
                    <Avatar user = {data.sender} />
                </div>
            )}
            <div className={body}>
                {!isOwn && (
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="text-sm text-gray-500">
                            {data.sender.name}
                        </div>
                        <div className="opacity-70 transition-opacity group-hover:opacity-100">
                            {format(new Date(data.createdAt),'p' )}
                        </div>
                    </div>
                )}
                {isOwn && (
                    <div className="text-xs text-gray-400 opacity-70 transition-opacity group-hover:opacity-100">
                        {format(new Date(data.createdAt),'p' )}
                    </div>
                )}
                <div className="relative">
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
                    {isLast && isOwn && seenList.length > 0 && (
                        <div className="text-xs font-light text-gray-500">
                            {`Seen by ${seenList}`}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MessageBox
