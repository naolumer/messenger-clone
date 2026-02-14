"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto, HiPaperAirplane } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";
import toast from "react-hot-toast";

const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "messenger";

type CloudinaryUploadResult = {
    info?: {
        secure_url?: string;
    } | string;
};

const getSecureUrl = (result: CloudinaryUploadResult) => {
    if (result?.info && typeof result.info === "object" && "secure_url" in result.info) {
        return result.info.secure_url;
    }

    return undefined;
};

const Form = () => {
    const { conversationId } = useConversation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            message: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue("message", "", { shouldValidate: true });
        axios.post("/api/messages", {
            ...data,
            conversationId,
        });
    };

    const handleUpload = (result: CloudinaryUploadResult) => {
        const secureUrl = getSecureUrl(result);

        if (!secureUrl) {
            toast.error("Image upload did not return a valid URL");
            return;
        }

        axios.post("/api/messages", {
            image: secureUrl,
            conversationId,
        });
    };

    return (
        <div className="py-4 px-4 bg-white border-t border-gray-300 flex items-center gap-2 lg:gap-4 w-full">
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onSuccess={handleUpload}
                onError={() => toast.error("Cloudinary upload failed. Check your upload preset configuration.")}
                uploadPreset={UPLOAD_PRESET}
            >
                <HiPhoto size={30} className="text-sky-500" />
            </CldUploadButton>
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
                <MessageInput id="message" register={register} errors={errors} required placeholder="Write a message" />
                <button type="submit" className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition">
                    <HiPaperAirplane size={18} className="text-white" />
                </button>
            </form>
        </div>
    );
};

export default Form;

