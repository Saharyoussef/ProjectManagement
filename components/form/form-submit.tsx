"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

interface FormSubmitProps {
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary";
}

export const FormSubmit = ({
    children,
    disabled,
    className,
    variant,
}: FormSubmitProps) => {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending || disabled}
            className={cn(
                "relative overflow-hidden rounded-lg h-10 group hover:animate-pulse hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400",
                className
            )}
        >
            <span className="relative text-white font-bold px-4 py-2">
                {children}
            </span>
        </button>
    );
};
