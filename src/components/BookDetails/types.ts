export interface BookType {
    /**
     * Name of the book
     */
    name: string;
    /**
     * Genre of the book
     */
    genre: string;
    /**
     * Individual id of the book
     */
    id: string;
}

export interface BookDetailsProps {
    /**
     * Selected books id
     */
    bookId?: string | null;
}

export interface BookWithAuthorType extends BookType {
    author: {
        /**
         * Authors name
         */
        name: string;
        /**
         * Authors age
         */
        age: number;
        /**
         * Authors individual id number
         */
        id: string;
        /**
         * Authors book list
         */
        books: BookType[] | null;
    };
}

export interface BookWithAuthorData {
    book: BookWithAuthorType;
}
