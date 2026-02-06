"use client"
import { Conversation, User } from "@prisma/client";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Fragment, useMemo } from "react";
import { format } from "date-fns";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";

interface ProfileDrawerProps {
    isOpen: boolean;
    onClose: ()=>void;
    data: Conversation & {
        users: User[]
    }
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
    isOpen,
    onClose,
    data
})=>{
    const otherUser = useOtherUser(data);
    const joinedDate = useMemo(()=>{
        return format(new Date(otherUser.createdAt), 'PP')
    
    },[otherUser.createdAt]);

    const title = useMemo(()=>{
        return data.name || otherUser.name;
    },[data.name, otherUser.name]);

    const statusText = useMemo(()=> {
        if (data.isGroup) {
            return `${data.users.length} members`
        }

        return 'Active'
    },[data])

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <TransitionChild 
                    as={Fragment} 
                    enter="ease-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-500"
                    leaveFrom= "opacity-100"
                    leaveTo="opacity-0">
                        
                    <div className="fixed inset-0 bg-black bg-opacity-40">
                         
                    </div>

                </TransitionChild>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                       <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <TransitionChild 
                            as = {Fragment}
                            enter = "transform transition ease-in-out duration-500"
                            enterFrom ='translate-x-full'
                            enterTo = "translate-x-0" 
                            leave="transform transition ease-in-out duration-500"
                            leaveTo="translate-x-full">
                            
                            <DialogPanel 
                                className="pointer-events-auto w-screen max-w-md">

                            </DialogPanel>
                            
                        </TransitionChild>
                       </div> 
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ProfileDrawer