"use client";

import { DialogTitle } from "@headlessui/react";
import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";

interface ConfirmModalProps {
    isOpen?: boolean;
    onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
}) => {
    const router = useRouter();
    const { conversationId } = useConversation();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = useCallback(() => {
        if (!conversationId) {
            toast.error("Conversation not found");
            return;
        }

        setIsLoading(true);

        axios
            .delete(`/api/conversations/${conversationId}`)
            .then(() => {
                onClose();
                router.push("/conversations");
                router.refresh();
            })
            .catch(() => toast.error("Something went wrong"))
            .finally(() => setIsLoading(false));
    }, [conversationId, onClose, router]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="sm:flex sm:items-start">
                <div
                    className="
                        mx-auto
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-rose-100
                        ring-4
                        ring-rose-50
                        sm:mx-0
                        sm:h-11
                        sm:w-11
                    "
                >
                    <FiAlertTriangle className="h-6 w-6 text-rose-600" />
                </div>

                <div className="mt-4 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                        as="h3"
                        className="text-base font-semibold tracking-tight text-gray-900"
                    >
                        Delete conversation
                    </DialogTitle>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        This will permanently remove the conversation for you. This action cannot be undone.
                    </p>
                </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button disabled={isLoading} secondary onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={isLoading} danger onClick={onDelete}>
                    Delete conversation
                </Button>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
