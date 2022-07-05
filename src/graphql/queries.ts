import { gql } from "@apollo/client";

export namespace Queries {
    export const getBooksQuery = gql`
        query books {
            books {
                ...booksFragment
            }
        }
    `;

    export const getAuthorsQuery = gql`
        query authors {
            authors {
                name
                id
            }
        }
    `;

    export const getBookQuery = gql`
        query book($id: ID!) {
            book(id: $id) {
                id
                name
                genre
                author {
                    id
                    name
                    age
                    books {
                        name
                        id
                    }
                }
            }
        }
    `;

    export const getAuthorsBookQuery = gql`
        query author($id: ID!) {
            author(id: $id) {
                id
                name
                books {
                    name
                    id
                }
            }
        }
    `;
}
