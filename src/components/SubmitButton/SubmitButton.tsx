import { FC, ReactElement } from "react";
import { Button, Spinner } from "react-bootstrap";

import { SubmitButtonProps } from "./types";

const SubmitButton: FC<SubmitButtonProps> = ({
    children,
    loading,
    className,
}): ReactElement => (
    <Button type="submit" className={className}>
        {loading && (
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
            />
        )}
        {children}
    </Button>
);

export default SubmitButton;
