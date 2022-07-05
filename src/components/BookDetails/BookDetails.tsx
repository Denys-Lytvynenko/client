import { useLazyQuery } from "@apollo/client";
import { ReactElement, useEffect } from "react";
import { Alert, Card, Col, ListGroup } from "react-bootstrap";

import { Queries } from "../../graphql/queries";
import { BookDetailsProps, BookWithAuthorData } from "./types";

import BlockSpinner from "../BlockSpinner/BlockSpinner";

const BookDetails = ({ bookId }: BookDetailsProps): ReactElement => {
    /**
     * Get particular book by book id
     */
    const [getBook, { loading, data }] = useLazyQuery<
        BookWithAuthorData,
        { id: string }
    >(Queries.getBookQuery, {
        onError(error) {
            console.error("Error on book details 😥: ", error);
        },
    });

    /**
     * If have book id do query
     */
    useEffect(() => {
        if (!!bookId) {
            getBook({ variables: { id: bookId } });
        }
    }, [getBook, bookId]);

    /**
     * Shows spinner on loading book information
     */
    if (loading) {
        return <BlockSpinner />;
    }

    return (
        <Col className="py-3">
            {data !== undefined ? (
                <Card className="rounded-3 overflow-hidden">
                    <i className="bi bi-journal-bookmark card-icon" />

                    <Card.Body>
                        <Card.Title as="h4">{data.book.name}</Card.Title>

                        <Card.Text>
                            <span className="card-text__title">
                                Жанр:&nbsp;
                            </span>
                            {data.book.genre}
                        </Card.Text>

                        <Card.Text>
                            <span className="card-text__title">
                                Ім'я автора:&nbsp;
                            </span>
                            {data.book.author.name}
                        </Card.Text>

                        <Card.Text>
                            <span className="card-text__title">
                                Вік автора:&nbsp;
                            </span>
                            {data.book.author.age}
                        </Card.Text>

                        <Card.Text className="card-text__title">
                            Всі книги автора:
                        </Card.Text>
                    </Card.Body>

                    <ListGroup className="list-group-flush">
                        {!!data.book.author.books &&
                            data.book.author.books.map(item => (
                                <ListGroup.Item key={item.id}>
                                    {item.name}
                                </ListGroup.Item>
                            ))}
                    </ListGroup>
                </Card>
            ) : (
                <Alert variant="info">
                    Для відображення деталей - оберіть книгу.
                </Alert>
            )}
        </Col>
    );
};

export default BookDetails;
