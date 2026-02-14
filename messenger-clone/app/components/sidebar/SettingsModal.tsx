"use client";

import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Modal from "../Modal";
import toast from "react-hot-toast";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";
import axios from "axios";

interface SettingsModalProps {
    isOpen?: boolean;
    onClose: () => void;
    currentUser: User;
}

const FALLBACK_AVATAR = "/Images/placeholder.png";

const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    currentUser,
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image,
        },
    });

    const image = watch("image");
    const candidateImage = typeof image === "string" && image ? image : currentUser?.image;
    const nextAvatarSrc =
        typeof candidateImage === "string" && (candidateImage.startsWith("http") || candidateImage.startsWith("/"))
            ? candidateImage
            : FALLBACK_AVATAR;

    const [avatarSrc, setAvatarSrc] = useState(nextAvatarSrc);

    useEffect(() => {
        setAvatarSrc(nextAvatarSrc);
    }, [nextAvatarSrc]);

    const handleUpload = (result: { info?: { secure_url?: string } }) => {
        setValue("image", result?.info?.secure_url, {
            shouldValidate: true,
        });
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .post("/api/settings", data)
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => toast.error("Something went wrong!"))
            .finally(() => setIsLoading(false));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2
                            className="
                                text-base
                                font-semibold
                                leading-7
                                text-gray-900
                            "
                        >
                            Profile
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Edit your public information</p>

                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input
                                disabled={isLoading}
                                label="Name"
                                id="name"
                                errors={errors}
                                required
                                register={register}
                            />

                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo
                                </label>

                                <div className="mt-2 flex items-center gap-x-3">
                                    <Image
                                        width={48}
                                        height={48}
                                        className="rounded-full"
                                        src={avatarSrc}
                                        alt="Avatar"
                                        onError={() => setAvatarSrc(FALLBACK_AVATAR)}
                                    />

                                    <CldUploadButton
                                        options={{ maxFiles: 1 }}
                                        onSuccess={handleUpload}
                                        uploadPreset="g1usl1sb"
                                        disabled={isLoading}
                                        className="flex justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 cursor-pointer hover:opacity-80"
                                    >
                                        Change
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="
                            mt-6
                            flex
                            items-center
                            justify-end
                            gap-x-6
                        "
                    >
                        <Button disabled={isLoading} secondary onClick={onClose} type="button">
                            Cancel
                        </Button>

                        <Button disabled={isLoading} type="submit">
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default SettingsModal;
