import React from 'react';
import logo from '../logo.svg'

type HeaderProps = {
    brand: string,
}

export class Header extends React.Component<HeaderProps, {}> {
    render() {
        const { brand } = this.props
        return(
            <nav>
                <h1> {brand} </h1>
                {/* <img src={logo} alt="my logo"/> */}

            </nav>
        )
    }
}