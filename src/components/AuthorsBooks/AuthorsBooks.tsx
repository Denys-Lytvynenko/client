import { useLazyQuery, useMutation } from "@apollo/client";
import { FC, ReactElement, useEffect } from "react";
import { Alert, Col, ListGroup } from "react-bootstrap";

import { Mutations } from "../../graphql/mutations";
import { Queries } from "../../graphql/queries";
import { AuthorsBooksProps, AuthorsBooksQueryType } from "./types";

import BlockSpinner from "../BlockSpinner/BlockSpinner";
import ListItem from "../ListItem/ListItem";

const AuthorsBooks: FC<AuthorsBooksProps> = ({
    selectedAuthorId,
}): ReactElement => {
    /**
     * Get all authors books query
     */
    const [getAuthorsBooks, { loading, data }] = useLazyQuery<
        AuthorsBooksQueryType,
        { id: string }
    >(Queries.getAuthorsBookQuery, {
        fetchPolicy: "network-only",
        onError(error) {
            console.error("Error on get all authors book 😥", error);
        },
    });

    /**
     * Delete particular book mutation
     */
    const [deleteBook] = useMutation(Mutations.deleteBookMutation, {
        onError(error) {
            console.error("Error on delete particular book 😥", error);
        },
    });

    useEffect(() => {
        if (!!selectedAuthorId) {
            getAuthorsBooks({ variables: { id: selectedAuthorId } });
        }
    }, [selectedAuthorId, getAuthorsBooks]);

    /**
     * Show preloader on loading data
     */
    if (loading) return <BlockSpinner />;

    /**
     * Author doesn't have book yet
     */
    if (selectedAuthorId && !data?.author?.books?.length)
        return (
            <Col className="py-3">
                <Alert>Автор поки не має книг</Alert>
            </Col>
        );

    return (
        <Col className="py-3">
            <ListGroup variant="flush" className="block-list">
                {data?.author.books.length ? (
                    data.author.books.map(book => (
                        <ListItem
                            key={book.id}
                            itemName={book.name}
                            iconCode="bi bi-book"
                            onCloseButtonClick={() =>
                                deleteBook({
                                    variables: { id: book.id },
                                    refetchQueries: [
                                        {
                                            query: Queries.getAuthorsBookQuery,
                                            variables: { id: selectedAuthorId },
                                        },
                                        {
                                            query: Queries.getBooksQuery,
                                        },
                                    ],
                                })
                            }
                        />
                    ))
                ) : (
                    <Alert variant="info">Виберіть автора.</Alert>
                )}
            </ListGroup>
        </Col>
    );
};

export default AuthorsBooks;
