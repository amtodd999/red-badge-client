import React from 'react';
import DisplayMovies from './DisplayMovies';
import CreateMovie from './CreateMovie';

type LandingProps = {
    sessionToken: string
}



export default class Landing extends React.Component<LandingProps, {}> {



    render() {
        return (
            <div>
                <div className="auth-inner">

                    <CreateMovie sessionToken={this.props.sessionToken} />
                </div>
                <br />
                <div>

                    <DisplayMovies sessionToken={this.props.sessionToken} />
                </div>

            </div>
        )
    }
}