import { FC, ReactElement } from "react";
import { Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout: FC = (): ReactElement => (
    <div className="d-flex flex-column content">
        <Header />

        <Container className="flex-column flex-grow-1 main">
            <Row className="page__content">
                <Outlet />
            </Row>
        </Container>

        <Footer />
    </div>
);

export default Layout;
