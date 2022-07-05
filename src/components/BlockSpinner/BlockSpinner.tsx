import { FC, ReactElement } from "react";
import { Col, Spinner } from "react-bootstrap";

const BlockSpinner: FC = (): ReactElement => (
    <Col className="py-3 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="secondary" />
    </Col>
);

export default BlockSpinner;
