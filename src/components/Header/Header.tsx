import { FC, ReactElement } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

import { navItems } from "../../services/routes/navItems";

const Header: FC = (): ReactElement => (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top">
        <Container>
            <Navbar.Brand as={Link} to="/">
                <img
                    src="/favicon-120.png"
                    alt=""
                    width="30"
                    height="30"
                    className="d-inline-block align-text-top me-1"
                />
                Library
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    {navItems.map(item => (
                        <Nav.Item key={item.name} as="li">
                            <Nav.Link as={NavLink} to={item.to}>
                                {item.name}
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);

export default Header;
