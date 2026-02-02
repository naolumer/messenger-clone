"use client"

import { UseFormRegister } from "react-hook-form";
import { FieldValues, FieldErrors } from "react-hook-form";

interface MessageInputProps {
    placeholder?: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors
}

const MessageInput: React.FC<MessageInputProps> = ({
    placeholder,
    id,
    type,
    required,
    register,
    errors
}) => {
    return (
        <div className="relative w-full">
            <input type="text" id={id} autoComplete={id}
            {...register(id,{required})} 
            placeholder={placeholder}
            className="
                border
                border-gray-200
                text-black
                font-light
                py-2
                px-4
                bg-neutral-100
                w-full
                rounded-full
                focus: outline-none"/>
        </div>
    )
}

export default MessageInput