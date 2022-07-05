import { FC, MouseEvent, ReactElement } from "react";
import { CloseButton, ListGroup } from "react-bootstrap";

import { ListItemProps } from "./types";

const ListItem: FC<ListItemProps> = ({
    itemName,
    onListItemClick,
    onCloseButtonClick,
    iconCode,
}): ReactElement => {
    const onClickHandler = () => {
        if (!onListItemClick) return;
        onListItemClick();
    };

    return (
        <ListGroup.Item
            onClick={onClickHandler}
            className="d-flex justify-content-between book-item reading-list__item"
        >
            <div>
                <i className={`me-2 ${iconCode}`} />
                {itemName}
            </div>

            <CloseButton
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                    event.stopPropagation();

                    onCloseButtonClick();
                }}
            />
        </ListGroup.Item>
    );
};

export default ListItem;
