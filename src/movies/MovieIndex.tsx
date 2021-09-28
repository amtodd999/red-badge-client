import React from 'react';
import DisplayMovies from './DisplayMovies';
import CreateMovie from './CreateMovie';
import EditMovie from './EditMovie';

type MovieIndexProps = {
    sessionToken: string
}

type MovieIndexState = {
    films: film[],
    updateActive: boolean,
    filmToUpdate: {[key: string]: string} ,
    selectedFilm: film | null
}

type film = {
    id: number,
    FilmTitle: string,
    Overview: string
}

export default class MovieIndex extends React.Component<MovieIndexProps, MovieIndexState> {
    constructor(props: MovieIndexProps) {
        super(props)
        this.state = {
            films: [],
            updateActive: false,
            filmToUpdate: {},
            selectedFilm: null
        }
        //need to bind to call this function in the return
        this.fetchMovies = this.fetchMovies.bind(this)
        this.updateOff = this.updateOff.bind(this)
    }

    fetchMovies = async () => {
        fetch('http://localhost:3000/film/myFilms', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${this.props.sessionToken}`
            },
        }).then((res) => res.json())
            .then((filmRes) => {
                this.setState({
                    films: filmRes,
                })
            })
    }

    editUpdateFilms = (editFilm: any) => {
        this.setState({filmToUpdate: editFilm})
    }

    updateOn = (): void => {
        this.setState({ updateActive: true })
    }

    updateOff = (): void => {
        this.setState({ updateActive: false })
    }

    componentDidMount(): void {
        this.fetchMovies()
    }

    render() {
        return (
            <div>
                <div>

                    {/* <CreateMovie sessionToken={this.props.sessionToken} fetchMovies={this.props.fetchMovies}/> */}
                    <CreateMovie
                        sessionToken={this.props.sessionToken}
                        fetchMovies={this.fetchMovies}
                    />
                </div>
               
                <div>

                    <DisplayMovies
                        films={this.state.films}
                        sessionToken={this.props.sessionToken}
                        editUpdateFilms={this.editUpdateFilms}
                        updateOn={this.updateOn}
                        fetchMovies={this.fetchMovies}
                    />
                </div>
                {/* check to see if we are updating and if the film was grabbed */}
                {this.state.updateActive  ?
                    <EditMovie
                        sessionToken={this.props.sessionToken}
                        filmToUpdate={this.state.filmToUpdate}
                        updateOff={this.updateOff}
                        fetchMovies={this.fetchMovies}

                    /> :
                    <></>
                }
                {/* <div>
                 
                    <ReviewIndex 
                    sessionToken={this.props.sessionToken}
                    // filmToReview={this.state.selectedFilm}
                    />
                </div> */}
</div>
        )
    }
}