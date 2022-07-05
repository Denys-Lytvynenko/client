import { useMutation, useQuery } from "@apollo/client";
import { FC, ReactElement } from "react";
import { Alert, Col, ListGroup } from "react-bootstrap";

import { Mutations } from "../../graphql/mutations";
import { Queries } from "../../graphql/queries";
import { type AuthorType } from "../AddBook/types";
import { type AuthorsListProps } from "./types";

import BlockSpinner from "../BlockSpinner/BlockSpinner";
import ListItem from "../ListItem/ListItem";

const AuthorsList: FC<AuthorsListProps> = ({
    onListItemClick,
}): ReactElement => {
    /**
     * Get all authors query
     */
    const { loading, data } = useQuery<{ authors: AuthorType[] }>(
        Queries.getAuthorsQuery,
        {
            fetchPolicy: "network-only",
            onError(error) {
                console.error("Error on loading authors 😥", error);
            },
        }
    );

    /**
     * Delete particular author by id mutation.
     */
    const [deleteAuthor] = useMutation(Mutations.deleteAuthorMutation, {
        onError(error) {
            console.error("Error on delete authors 😥", error);
        },
    });

    /**
     * Show block preloader on loading all authors query
     */
    if (loading) return <BlockSpinner />;

    return (
        <Col className="py-3 border-start border-end">
            <ListGroup variant="flush" className="block-list">
                {data?.authors.length ? (
                    data.authors.map(author => (
                        <ListItem
                            key={author.id}
                            itemName={author.name}
                            iconCode="bi bi-person-fill"
                            onListItemClick={() => onListItemClick(author.id)}
                            onCloseButtonClick={() =>
                                deleteAuthor({
                                    variables: { id: author.id },
                                    refetchQueries: [
                                        {
                                            query: Queries.getAuthorsBookQuery,
                                            variables: { id: author.id },
                                        },
                                        { query: Queries.getAuthorsQuery },
                                    ],
                                })
                            }
                        />
                    ))
                ) : (
                    <Alert variant="info">Список авторів порожній.</Alert>
                )}
            </ListGroup>
        </Col>
    );
};

export default AuthorsList;
