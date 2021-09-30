import { url } from 'inspector';
import { AutoComplete } from 'material-ui';
import React from 'react';
import IzutuLogo from '../assets/izutuLogowhite.svg'

type HomeProps = {
    sessionToken: string;
}

export default class Home extends React.Component<HomeProps, {}>{



    render() {
        return (
            <div>
                <img src={IzutuLogo} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ color: '#A9A9A9', fontFamily: "font-family: 'Roboto Mono', monospace"}}>
                        What's your favorite scary movie?
                    </h3>
                    <h3>

                    </h3>

                </div>

            </div>

        )
    }
}

