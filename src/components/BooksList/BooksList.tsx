import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { FC, ReactElement } from "react";
import { Alert, Col, ListGroup } from "react-bootstrap";

import { Mutations } from "../../graphql/mutations";
import { Queries } from "../../graphql/queries";
import { BookType } from "../BookDetails/types";
import { BooksListProps } from "./types";

import BlockSpinner from "../BlockSpinner/BlockSpinner";
import ListItem from "../ListItem/ListItem";

const BooksList: FC<BooksListProps> = ({ onBookClick }): ReactElement => {
    /**
     * Get add book list query
     */
    const { loading, data } = useQuery<{ books: BookType[] }>(
        Queries.getBooksQuery,
        {
            fetchPolicy: "network-only",
            onError(error: ApolloError) {
                console.log("error", error);
            },
        }
    );

    /**
     * Delete particular book by id
     */
    const [deleteBook] = useMutation(Mutations.deleteBookMutation);

    /**
     * Show block preloader on book list loading
     */
    if (loading) return <BlockSpinner />;

    return (
        <Col className="py-3  border-start border-end">
            <ListGroup variant="flush" className="block-list">
                {data?.books.length ? (
                    data.books.map((book: BookType) => (
                        <ListItem
                            key={book.id}
                            itemName={book.name}
                            iconCode="bi bi-book"
                            onListItemClick={() => onBookClick(book.id)}
                            onCloseButtonClick={() =>
                                deleteBook({
                                    variables: { id: book.id },
                                    refetchQueries: [
                                        { query: Queries.getBooksQuery },
                                    ],
                                })
                            }
                        />
                    ))
                ) : (
                    <Alert variant="info">Список книг порожній.</Alert>
                )}
            </ListGroup>
        </Col>
    );
};

export default BooksList;
