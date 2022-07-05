import { useMutation } from "@apollo/client";
import { ChangeEvent, FC, FormEvent, ReactElement, useState } from "react";
import { Col, Form } from "react-bootstrap";

import { Mutations } from "../../graphql/mutations";
import { Queries } from "../../graphql/queries";

import FormInput from "../FormInput/FormInput";
import SubmitButton from "../SubmitButton/SubmitButton";

const AddAuthor: FC = (): ReactElement => {
    /**
     * Handle form state
     */
    const [authorName, setAuthorName] = useState<string>("");
    const [age, setAge] = useState<string>("");

    const handleAuthorNameChange = (event: ChangeEvent<HTMLInputElement>) =>
        setAuthorName(event.target.value);
    const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) =>
        setAge(event.target.value);

    /**
     * Add author mutation
     */
    const [addAuthor, { loading }] = useMutation(Mutations.addAuthorMutation, {
        onError(error) {
            console.error("Error on add author mutation 😥 ", error);
        },
    });

    /**
     * Submit form function
     */
    const SubmitForm = (event: FormEvent) => {
        event.preventDefault();

        addAuthor({
            variables: { name: authorName, age: +age },
            refetchQueries: [{ query: Queries.getAuthorsQuery }],
            onCompleted() {
                setAuthorName("");
                setAge("");
            },
            onError(error) {
                console.error("Error occurs on add author 😥", error);
            },
        });
    };

    return (
        <Col className="py-3">
            <Form onSubmit={SubmitForm}>
                <FormInput
                    label="Ім'я автора:"
                    placeholder="Ім'я автора"
                    value={authorName}
                    onChange={handleAuthorNameChange}
                />

                <FormInput
                    label="Вік автора:"
                    placeholder="Вік автора"
                    value={age}
                    onChange={handleAgeChange}
                />

                <SubmitButton loading={loading}>Додати автора</SubmitButton>
            </Form>
        </Col>
    );
};

export default AddAuthor;
