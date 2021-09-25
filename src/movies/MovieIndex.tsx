import React from 'react';
import DisplayMovies from './DisplayMovies';
import CreateMovie from './CreateMovie';
import EditMovie from './EditMovie';
import ReviewIndex from '../reviews/ReviewIndex';

type MovieIndexProps = {
    sessionToken: string
}

type MovieIndexState = {
    films: film[],
    reviews: review[],
    updateActive: boolean,
    filmToUpdate: film | null,
    reviewToUpdate: review | null,
    selectedFilm: film | null,
    selectedReview: review | null,
    filmToReview: film | null
}

type film = {
    id: number,
    FilmTitle: string,
    Overview: string
}

type review = {
    id: number,
    Review: string,
    Flagged: boolean
}

export default class MovieIndex extends React.Component<MovieIndexProps, {}> {
    constructor(props: MovieIndexProps) {
        super(props)
        this.state = {
            films: [],
            reviews: [],
            updateActive: false,
            filmToUpdate: null,
            reviewToUpdate: null,
            selectedFilm: null,
            selectedReview: null,
            filmToReview: null
        }
        //need to bind to call this function in the return
        this.fetchMovies = this.fetchMovies.bind(this)
        this.updateOff = this.updateOff(this)
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
                console.log(filmRes)
            })
    }

    selectFilmToEdit = (films: film): void => {
        this.setState({ filmToUpdate: films })
    }

    updateOn = (): void => {
        this.setState({ updateActive: true })
    }

    updateOff = (): void => {
        this.setState({ updateActive: false })
    }

    pickSelectedFilm = (f: film) => this.setState({ selectedFilm: f })
    pickSelectedReview = (r: review) => this.setState({ selectedReview: f })
    pickFilmToReview = (f: film) => this.setState({ filmToReview: f })


    componentDidMount(): void {
        this.fetchMovies()
    }

    render() {

        return (
            <div>
                <div className="auth-inner">

                    {/* <CreateMovie sessionToken={this.props.sessionToken} fetchMovies={this.props.fetchMovies}/> */}
                    <CreateMovie
                        sessionToken={this.props.sessionToken}
                        fetchMovies={this.fetchMovies}
                    />
                </div>
                <br />
                <div>

                    <DisplayMovies
                        sessionToken={this.props.sessionToken}
                        selectFilmToEdit={this.selectFilmToEdit}
                        updateOn={this.updateOn}
                        updateOff={this.updateOff}
                        pickSelectedFilm={this.pickSelectedFilm}
                        fetchMovies={this.fetchMovies}
                    />
                </div>
                {/* check to see if we are updating and if the film was grabbed */}
                {this.state.updateActive && this.state.filmToUpdate ?
                    <EditMovie
                        sessionToken={this.sessionToken}
                        filmToUpdate={this.state.filmToUpdate}
                        updateOff={this.updateOff}
                        fetchMovies={this.fetchMovies}

                    /> :
                    <></>
                }
                <div>
                {this.state.pickSelectedFilm && 
                    <ReviewIndex 
                    sessionToken={this.props.sessionToken}
                    filmToReview={this.state.selectedFilm}
                    />}
                </div>
</div>
        )
    }
}