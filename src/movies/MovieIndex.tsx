import React from 'react';
import DisplayMovies from './DisplayMovies';
import CreateMovie from './CreateMovie';

type MovieIndexProps = {
    sessionToken: string
    // ,
    // fetchMovies: () => void
}



export default class MovieIndex extends React.Component<MovieIndexProps, {}> {



    render() {
        return (
            <div>
                <div className="auth-inner">

                    {/* <CreateMovie sessionToken={this.props.sessionToken} fetchMovies={this.props.fetchMovies}/> */}
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