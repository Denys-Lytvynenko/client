import { FC, ReactElement, useCallback, useState } from "react";

import AddBook from "../../components/AddBook/AddBook";
import BookDetails from "../../components/BookDetails/BookDetails";
import BooksList from "../../components/BooksList/BooksList";

const ReadingList: FC = (): ReactElement => {
    /**
     * Handle book selection
     */
    const [selected, setSelected] = useState<string | null | undefined>(null);

    const handleSelectedBook = useCallback(
        (bookId?: string) => setSelected(bookId),
        [setSelected]
    );

    return (
        <>
            <AddBook />

            <BooksList onBookClick={handleSelectedBook} />

            <BookDetails bookId={selected} />
        </>
    );
};

export default ReadingList;
