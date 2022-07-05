export interface ListItemProps {
    /**
     * List item name
     */
    itemName: string;
    /**
     * List item icon code
     */
    iconCode: string;
    /**
     * Handle close button click function
     */
    onCloseButtonClick: () => void;
    /**
     * Handle on list item click function
     */
    onListItemClick?: () => void;
}
