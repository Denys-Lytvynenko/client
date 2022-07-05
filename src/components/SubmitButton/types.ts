import { ReactNode } from "react";

export interface SubmitButtonProps {
    /**
     * Submit button text
     */
    children: ReactNode;
    /**
     * Show spinner on data loading
     */
    loading?: boolean;
    /**
     * CSS class name
     */
    className?: string;
}
