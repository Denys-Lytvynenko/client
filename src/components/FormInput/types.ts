import { ChangeEvent } from "react";

export interface FormInputProps {
    /**
     * Label of form input
     */
    label: string;
    /**
     * Placeholder of form input
     */
    placeholder: string;
    /**
     * Value of form input
     */
    value: string;
    /**
     * On change form input handler
     */
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    /**
     * CSS class name
     */
    className?: string;
    /**
     * Is input disabled or not
     */
    disabled?: boolean;
}
