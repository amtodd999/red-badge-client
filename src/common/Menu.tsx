import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
// import logo from '../logo.svg'

type MenuProps = {
//added this in but don't know why I need it
}
type MenuState = {
    collapsed: boolean
}

export class Menu extends React.Component<MenuProps, MenuState> {
    constructor(props:MenuProps) {
        super(props);

        this.state = {
            collapsed: true
        }
        // this.render = this.render.bind(this)
    }

    // toggleMenu = () => {
    //     this.setState({ collapsed: false })
    // }

    render() {
        return (
            <div>
                <Navbar color="faded" light>
                    <NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand>
                    {/* <NavbarToggler onClick={() => this.setState({ collapsed: !this.state.collapsed })} className="mr-2" /> */}
                    <NavbarToggler color="white" className="mr-2 color-navtoggle" />
                    {/* <Collapse isOpen={!collapsed} navbar> */}
                    <Collapse  navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink href="/components/">Components</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}