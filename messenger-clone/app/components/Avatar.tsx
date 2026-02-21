"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
    user?: User;
}

const FALLBACK_AVATAR = "/Images/placeholder.png";

const Avatar: React.FC<AvatarProps> = ({ user }) => {
    const [imgSrc, setImgSrc] = useState(user?.image || FALLBACK_AVATAR);
    const {members} = useActiveList();
    const isActive = members.indexOf(user?.email!) !== -1;

    useEffect(() => {
        setImgSrc(user?.image || FALLBACK_AVATAR);
    }, [user?.image]);

    return (
        <div className="relative">
            <div
                className="
                    relative
                    inline-block
                    rounded-full
                    overflow-hidden
                    h-9 w-9
                    md:h-11 md:w-11
                "
            >
                <Image src={imgSrc} alt="Avatar" fill onError={() => setImgSrc(FALLBACK_AVATAR)} />
            </div>
            {isActive && (
                <span
                className="
                    absolute
                    block
                    rounded-full
                    bg-green-500
                    ring-2
                    ring-white
                    top-0
                    right-0
                    h-2
                    w-2
                    md:h-3
                    md:w-3
                "
            ></span>
            )}
            
        </div>
    );
};

export default Avatar;
