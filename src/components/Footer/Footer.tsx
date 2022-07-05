import { FC, ReactElement } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { navItems } from "../../services/routes/navItems";

const Footer: FC = (): ReactElement => (
    <footer className="border-top">
        <Container className="d-flex align-items-center flex-wrap justify-content-between py-1 ">
            <p className="col-md-4 mb-0 text-muted">© 2022 Library</p>
            <Navbar variant="light">
                <Nav as="ul">
                    {navItems.map(item => (
                        <Nav.Item key={item.name} as="li">
                            <Nav.Link as={NavLink} to={item.to}>
                                {item.name}
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>
            </Navbar>
        </Container>
    </footer>
);

export default Footer;
