import React from 'react'
import { Switch, Link } from 'react-router-dom'
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
    NavbarBrand,
} from 'reactstrap';
import {Admin} from './Admin';

type MenuProps = {
    sessionToken: string,
    clearToken: () => void
}

type MenuTypes = {
    isDisplayed: boolean
}

export default class Menu extends React.Component<MenuProps, MenuTypes> {
    constructor(props: MenuProps) {
        super(props)
        this.state = {
            isDisplayed: false
        }
    }

    toggle = () => this.setState({ isDisplayed: !this.state.isDisplayed })

    render() {
        return (
            <div>
                <Navbar light expand="md">
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isDisplayed} navbar>
                        <Nav className='mr-auto' navbar>
                            <NavItem>
                                <NavLink>
                                    <Link to='/' className='text-muted'>
                                        Home
                                    </Link>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>
                                    <Link to='/movies' className='text-muted'>
                                        Movies
                                    </Link>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>
                                    <Link to='/reviews' className='text-muted'>
                                        Reviews
                                    </Link>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    <Button color="secondary" size="sm" onClick={this.props.clearToken}>Logout</Button>
                </Navbar>
            </div>
        )
    }
}