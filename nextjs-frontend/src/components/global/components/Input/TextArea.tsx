import React, {useEffect, useRef} from "react";
import {capitalise} from "@/lib/string";

interface TextAreaProps {
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    style: string
}

export const TextArea: React.FC<TextAreaProps> = ({name, value, onChange}: TextAreaProps) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        const focusInput = () => {
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto"; // Reset height
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height
            }
        };
        focusInput()
    }, [value]);

    const style = {
        minHeight: "38px",
        maxHeight: "200px", // Adjust as needed
        resize: "none",
        padding: "9px",
        boxSizing: "border-box",
        overflow: "hidden", // Prevent scrollbar flickering
    };

    return <textarea
            required
            name={name}
            rows={1}
            ref={textareaRef}
            placeholder={capitalise(name)}
            value={value}
            onChange={onChange}
            style={style}
        />
}