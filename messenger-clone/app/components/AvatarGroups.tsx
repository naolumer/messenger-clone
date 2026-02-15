"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarGroupProps {
    users: User[];
}

const FALLBACK_AVATAR = "/Images/placeholder.png";

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users = [] }) => {
    const members = users.slice(0, 3);
    const positionMap = ["top-0 left-1/2 -translate-x-1/2", "bottom-0 left-0", "bottom-0 right-0"];

    return (
        <div className="relative h-11 w-11">
            {members.map((user, index) => (
                <div
                    key={user.id}
                    className={`absolute h-6 w-6 overflow-hidden rounded-full ring-2 ring-white ${positionMap[index]}`}
                >
                    <Image alt={user.name || "Avatar"} fill src={user.image || FALLBACK_AVATAR} className="object-cover" />
                </div>
            ))}
        </div>
    );
};

export default AvatarGroup;
