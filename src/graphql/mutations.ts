import { gql } from "@apollo/client";

export namespace Mutations {
    export const addBookMutation = gql`
        mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
            addBook(name: $name, genre: $genre, authorId: $authorId) {
                id
            }
        }
    `;

    export const deleteBookMutation = gql`
        mutation deleteBook($id: ID!) {
            deleteBook(id: $id) {
                id
            }
        }
    `;

    export const addAuthorMutation = gql`
        mutation addAuthor($name: String!, $age: Int!) {
            addAuthor(name: $name, age: $age) {
                id
            }
        }
    `;

    export const deleteAuthorMutation = gql`
        mutation deleteAuthor($id: ID!) {
            deleteAuthor(id: $id) {
                id
            }
        }
    `;
}
