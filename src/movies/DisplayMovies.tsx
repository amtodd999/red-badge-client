import React from 'react';
import { Table, Button } from 'reactstrap';

type DisplayFilmProps = {
    sessionToken: string,
    films: filmObj[],
    fetchMovies: () => void,
    updateOn: () => void,
    editUpdateFilms: (editFilm: any)=> void
}

type DisplayFilmState = {
    titleUpdate: string,
    overviewUpdate: string
}


type filmObj = { id: number, FilmTitle: string, Overview: string }

export default class DisplayMovies extends React.Component<DisplayFilmProps, DisplayFilmState> {
    constructor(props: DisplayFilmProps) {
        super(props)
        this.state = {
            titleUpdate: '',
            overviewUpdate: ''
        }
    }



    deleteMovies = async (deleteFilm: filmObj) => {
        //e.preventDefault()
        await fetch(`http://localhost:3000/film/delete/${deleteFilm.id}`, {
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


    movieWrapper = (): JSX.Element[] => {
        return this.props.films.map((film: filmObj, index: number) => {
            console.log("LOOK" + film)
            return (
                <tbody>
                    <tr key={index}>
                        <td>{film.FilmTitle}</td>
                        <td>{film.Overview}</td>
                        <td>
                            <Button
                                color="secondary"
                                size="sm"
                                onClick={e => {
                                    this.props.editUpdateFilms(film)
                                    this.props.updateOn()
                                }}>
                                Update
                            </Button>
                            <Button
                                color="secondary"
                                size="sm"
                                onClick={e => this.deleteMovies(film)}>
                                Delete
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
