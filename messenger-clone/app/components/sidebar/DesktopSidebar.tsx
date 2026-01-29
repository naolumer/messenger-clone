'use client'
import useRoutes from "@/app/hooks/useRoute"
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";

interface DesktopSidebarProps {
    currentUser: User
}
const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
    currentUser
}) => {
    const routes = useRoutes();
    const [isOPen, setIsOpen] = useState(false);
    return (
        <div className="
            hidden
            lg:fixed
            lg:inset-y-0
            lg:left-0
            lg:z-40
            lg:w-20
            xl:px-6
            lg:overflow-y-auto
            lg:bg-white
            lg:border-r-[1px]
            lg:border-gray-300
            lg:pb-4
            lg:flex
            lg:flex-col
            justify-between
            "
            >
            <nav
                className="
                    mt-4
                    flex-col
                    justify-between">
                        
                <ul role="list"
                className="flex flex-col items-center space-y-1">
                {routes.map((item)=> (
                    <DesktopItem 
                        key= {item.label}
                        href = {item.href}
                        label={item.label}
                        icon = {item.icon}
                        active = {item.active}
                        onClick ={item.onClick}
                    />
                ))}    
            </ul>
            </nav>

            <nav className="mt-4 flex flex-col items-center justify-between">
                <div className="cursor-pointer hover:opacity-75 transition ">
                    <Avatar user = {currentUserUser}/>
                </div>

            </nav>
        </div>
    )
}

export default DesktopSidebar