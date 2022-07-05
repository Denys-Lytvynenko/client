import { useMutation, useQuery } from "@apollo/client";
import { ChangeEvent, FC, FormEvent, ReactElement, useState } from "react";
import { Col, Form } from "react-bootstrap";

import { Mutations } from "../../graphql/mutations";
import { Queries } from "../../graphql/queries";
import { useTextInput } from "../../hooks/useTextInput";
import { AuthorType } from "./types";

import FormInput from "../FormInput/FormInput";
import SubmitButton from "../SubmitButton/SubmitButton";

const AddBook: FC = (): ReactElement => {
    /**
     * Handle form state
     */
    const [bookName, handleBookNameChange, resetBookName] = useTextInput();
    const [genre, handleGenreChange, resetGenre] = useTextInput();

    const [authorId, setAuthorId] = useState<string>("");
    const handleAuthorChange = (event: ChangeEvent<HTMLSelectElement>) =>
        setAuthorId(event.target.value);

    /**
     * Query all authors
     */
    const { loading: loadingAuthors, data } = useQuery<{
        authors: AuthorType[];
    }>(Queries.getAuthorsQuery, {
        onError(error) {
            console.error("Error on get authors query 😥 ", error);
        },
    });

    /**
     * Add book mutation
     */
    const [addBook, { loading }] = useMutation(Mutations.addBookMutation);

    /**
     * Handle form submit
     */
    const SubmitForm = (event: FormEvent) => {
        event.preventDefault();

        addBook({
            variables: { name: bookName, genre, authorId },
            refetchQueries: [{ query: Queries.getBooksQuery }],
            onCompleted() {
                resetBookName();
                resetGenre();
                setAuthorId("");
            },
            onError(error) {
                console.error("Error on add book mutation 😥", error);
            },
        });
    };

    return (
        <Col className="py-3">
            <Form onSubmit={SubmitForm}>
                <FormInput
                    label="Назва книги:"
                    placeholder="Назва книги"
                    value={bookName}
                    onChange={handleBookNameChange}
                />

                <FormInput
                    label="Жанр:"
                    placeholder="Жанр"
                    value={genre}
                    onChange={handleGenreChange}
                />
                <Form.Group className="mb-3">
                    <Form.Label>Оберіть автора:</Form.Label>
                    <Form.Select
                        value={authorId}
                        onChange={handleAuthorChange}
                        required
                    >
                        <option>Оберіть автора</option>
                        {loadingAuthors ? (
                            <option disabled>Завантаження авторів... </option>
                        ) : (
                            data?.authors.map(author => (
                                <option key={author.id} value={author.id}>
                                    {author.name}
                                </option>
                            ))
                        )}
                    </Form.Select>
                </Form.Group>
                <SubmitButton loading={loading}>Додати книгу</SubmitButton>
            </Form>
        </Col>
    );
};

export default AddBook;
