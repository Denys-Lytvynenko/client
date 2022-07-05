export interface AuthorsBooksProps {
    /**
     * Individual id number of selected author
     */
    selectedAuthorId?: string;
}

export interface AuthorsBooksQueryType {
    author: {
        /**
         * Authors name
         */
        name: string;
        /**
         * Authors books
         */
        books: {
            /**
             * Book name
             */
            name: string;
            /**
             * Book individual id
             */
            id: string;
        }[];
    };
}
