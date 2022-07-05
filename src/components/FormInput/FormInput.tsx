import { memo, ReactElement } from "react";
import { Form } from "react-bootstrap";

import { FormInputProps } from "./types";

const FormInput = memo(
    ({
        label,
        placeholder,
        value,
        onChange,
        className,
        disabled,
    }: FormInputProps): ReactElement => (
        <Form.Group className={`mb-3 ${className}`}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
            />
        </Form.Group>
    )
);

export default FormInput;
