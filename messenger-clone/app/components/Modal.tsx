import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";

interface ModalProps  {
    isOpen?: boolean;
    onClose: ()=> void;
    children: React.ReactNode
}


const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children
})=> {
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <TransitionChild 
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>

                </TransitionChild>

                <div className="
                    flex
                    min-h-full
                    items-center
                    justify-center
                    p-4 text-center sm:p-0">
                    
                    <TransitionChild 
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:sale-95"
                        enterTo = "opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                        
                        <DialogPanel 
                            className="
                                relative
                                transform
                                overflow-hidden
                                rounded-lg
                                bg-white
                                px-4
                                pb-4
                                text-left
                                shadow-xl
                                transition-all
                                w-full
                                sm:my-8
                                sm:w-full
                                sm:max-w-lg
                                sm:p-6">

                        </DialogPanel>
                        
                    </TransitionChild>

                </div>
            </Dialog>
        </Transition>
    )
}