import { FC, ReactElement, useCallback, useState } from "react";

import AddAuthor from "../../components/AddAuthor/AddAuthor";
import AuthorsBooks from "../../components/AuthorsBooks/AuthorsBooks";
import AuthorsList from "../../components/AuthorsList/AuthorsList";

const AuthorsPage: FC = (): ReactElement => {
    /**
     * Handle author selection
     */
    const [selected, setSelected] = useState<string | undefined>(undefined);

    const handleSelectedAuthor = useCallback(
        (authorId?: string) => setSelected(authorId),
        [setSelected]
    );

    return (
        <>
            <AddAuthor />

            <AuthorsList onListItemClick={handleSelectedAuthor} />

            <AuthorsBooks selectedAuthorId={selected} />
        </>
    );
};

export default AuthorsPage;
