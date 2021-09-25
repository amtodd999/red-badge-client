import React from 'react';
import { Table, Button } from 'reactstrap';

type DisplayFilmProps = {
    sessionToken: string,
    films: film[],
    fetchMovies: () => void,
    updateOn: () => void,
    filmToUpdate: (films: film) => void
}

type DisplayFilmState = {}

type film = { id: number, FilmTitle: string, Overview: string }

export default class DisplayMovies extends React.Component<DisplayFilmProps, DisplayFilmState> {
    constructor(props: DisplayFilmProps) {
        super(props)

    }

    deleteMovies = async (film: film) => {
        //e.preventDefault()
        await fetch(`http://localhost:3000/film/delete/${film.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${this.props.sessionToken}`
            },
        }).then((res) => res.json())
            .then((filmRes) => {
                this.props.fetchMovies();
                console.log(filmRes)
            })
    }

    // getSingleMovie = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    //     e.preventDefault()
    //     await fetch(`http://localhost:3000/film/${id}`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             'Authorization': `Bearer ${this.props.sessionToken}`
    //         },
    //     }).then((res) => res.json())
    // }

    movieWrapper = (): JSX.Element[] => {
        return this.props.films.map((film: film, index: number) => {
            return (
                <tbody>
                    <tr key={index}>
                        <td>{film.FilmTitle}</td>
                        <td>{film.Overview}</td>
                        <td>
                            <Button
                                color="secondary"
                                size="sm"
                                onClick={e => this.deleteMovies(film.id)}>
                            Delete
                            </Button>
                            <Button
                                color="secondary"
                                size="sm"
                                onClick={e => this.getSingleMovie(e, film.id)}>
                            Update
                            </Button>
                        </td>
                    </tr>

                </tbody>


            )
        })
    }




    render() {
        // this.fetchMovies = this.fetchMovies.bind(this)
        return (
            <div>


                <Table dark bordered>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Overview</th>
                            <th>Movie Edits</th>
                        </tr>
                    </thead>
                    {this.movieWrapper()}
                </Table>
                {/* <button onClick={this.fetchRatings}></button> */}
            </div>
        )
    }
}




     // try {
        //     const res = await 
        //     Promise.all([
        //         fetch('http://localhost:3000/movie/', {
        //             method: "GET",
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 'Authorization': `Bearer ${this.props.sessionToken}`
        //             },
        //         }),

        //         fetch('http://localhost:3000/review/myReviews', {
        //             method: "GET",
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 'Authorization': `Bearer ${this.props.sessionToken}`
        //             },
        //         }),

        //         fetch('http://localhost:3000/rating/myRatings', {
        //             method: "GET",
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 'Authorization': `Bearer ${this.props.sessionToken}`
        //             },
        //         })
        //     ]);
        //     const data = await Promise.all(res.map(r => res.json()))
        //     console.log(data.flat());
        // } catch {
        //     throw Error("you suck")
        // }

            //https://stackoverflow.com/questions/46241827/fetch-api-requesting-multiple-get-requests
    // fetchReviews = () => {

    //     fetch('http://localhost:3000/review/myReviews', {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             'Authorization': `Bearer ${this.props.sessionToken}`
    //         },
    //     }).then((res) => res.json())
    //         .then((reviewData) => this.setState({
    //             reviewData: reviewData,
    //         }))
    // }

    // fetchRatings = () => {

    //     fetch('http://localhost:3000/rating/myRatings', {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             'Authorization': `Bearer ${this.props.sessionToken}`
    //         },
    //     }).then((res) => res.json())
    //         .then((ratingData) => this.setState({
    //             ratingData: ratingData,
    //         }))
    // }

    //     fetchAsyncData = async () => {
    //         const response = await Promise.all([this.fetchMovies(), this.fetchRatings(), this.fetchReviews()]);
    //         console.log(response)
    //     }
