import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.IsAutharised = this.IsAutharised.bind(this);
        this.state = {
            collapsed: true, isAutharised: false
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    componentDidMount() {
        this.IsAutharised();
    }

    async IsAutharised() {
        const response = await fetch('api/navbar');
        const data = await response.json();
        this.setState({ isAutharised: data });
    }

    render() {
        const flag = this.state.isAutharised;
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm navbar-custom  border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} className="text-dark" to="/">imageboard</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                                </NavItem>
                                {!flag && (
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/register">registration</NavLink>
                                    </NavItem>)}
                                {!flag && (
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/login">login</NavLink>
                                    </NavItem>)}
                                {flag && (
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/logout">logout</NavLink>
                                    </NavItem>
                                )}
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
