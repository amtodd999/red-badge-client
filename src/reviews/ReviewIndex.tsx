import React from 'react';
import ReviewCreate from './ReviewCreate';
import ReviewEdit from './ReviewEdit';
import ReviewDisplay from './ReviewDisplay';

type ReviewIndexProps = {
    sessionToken: string
}

type ReviewIndexState = {
    // reviews: review[],
    updateActive: boolean,
    reviewToUpdate: { [key: string]: string },
    filmToReview: { [key: string]: string },
    films: movie[],
    createActive: boolean
}

type movie = {
    id: number,
    FilmTitle: string,
    reviews: revFilm[]
}

type revFilm = {
    id: number,
    Review: string
}

export default class ReviewIndex extends React.Component<ReviewIndexProps, ReviewIndexState> {
    constructor(props: ReviewIndexProps) {
        super(props)
        this.state = {
            updateActive: false,
            reviewToUpdate: {},
            filmToReview: {},
            films: [],
            createActive: false
        }
        // this.fetchReviews = this.fetchReviews.bind(this)
        this.updateOff = this.updateOff.bind(this)
        this.fetchMoviesForReview = this.fetchMoviesForReview.bind(this)
    }

    // fetchReviews = async () => {
    //     fetch('http://localhost:3000/review/myReviews', {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             'Authorization': `Bearer ${this.props.sessionToken}`
    //         },
    //     }).then((res) => res.json())
    //         .then((reviewRes) => {
    //             this.setState({
    //                 reviews: reviewRes,
    //             })
    //             console.log(reviewRes)
    //             console.log(this.state.reviews)
    //         })
    // }

    fetchMoviesForReview = async () => {
        const myToken = localStorage.getItem('sessionToken');
        console.log(myToken);
        fetch('http://localhost:3000/film/myFilms', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${myToken}`
            },
        }).then((res) => res.json())
            .then((filmRes) => {
                this.setState({
                    films: filmRes,
                })
                // console.log(filmRes)
            })
    }

    grabFilmForReview = (filmReview: any) => {
        this.setState({ filmToReview: filmReview })
    }

    //this is like editUpdateWorkout in workout log WorkoutIndex
    editUpdateReviews = (editReview: any) => {
        this.setState({ reviewToUpdate: editReview })
    }

    updateOn = (): void => {
        this.setState({ updateActive: true })
    }

    updateOff = (): void => {
        this.setState({ updateActive: false })
    }

    createOn = (): void => {
        this.setState({ createActive: true })
    }

    componentDidMount(): void {
        this.fetchMoviesForReview()
    }

    render() {
        return (
            <div>
                <div className="auth-inner">
                    <ReviewCreate
                        sessionToken={this.props.sessionToken}
                        fetchMoviesForReview={this.fetchMoviesForReview}
                        filmToReview={this.state.filmToReview}
                        grabFilmForReview={this.grabFilmForReview}
                        films={this.state.films}
                        editUpdateReviews={this.editUpdateReviews}
                        updateOn={this.updateOn}
                        createOn={this.createOn}
                    />
                </div>
                <br />
                <div>
                    {/* <ReviewDisplay
                        sessionToken={this.props.sessionToken}
                        fetchReviews={this.fetchReviews}
                        fetchMoviesForReview={this.fetchMoviesForReview}
                        editUpdateReviews={this.editUpdateReviews}
                        updateOn={this.updateOn}
                    /> */}
                </div>
                {this.state.updateActive ?
                    <ReviewEdit
                        sessionToken={this.props.sessionToken}
                        reviewToUpdate={this.state.reviewToUpdate}
                        updateOff={this.updateOff}
                        fetchMoviesForReview={this.fetchMoviesForReview}
                    /> :
                    <></>
                }
                <div>
                </div>


            </div>
        )
    }
}
