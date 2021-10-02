import { url } from 'inspector';
import { AutoComplete } from 'material-ui';
import {HomeStyle} from './HomeStyling';
import React from 'react';
import IzutuLogo from '../assets/izutuLogowhite.svg'

type HomeProps = {
    sessionToken: string;
}

export default class Home extends React.Component<HomeProps, {}>{


    render() {
        return (
            <HomeStyle>
            <div>
                <img id="izutuLogo" src={IzutuLogo} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                <div style={{ textAlign: 'center' }}>
                    <h5 id="poemLine1">Violets are blue,</h5>
                    <h5 id="poemLine2">your blood is red.</h5>
                    <h5 id="poemLine3">The window was open</h5>
                    <h5 id="poemLine4">I'm under your bed.</h5>


                </div>

            </div>
            </HomeStyle>
        )
    }
}

