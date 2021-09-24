import React from 'react';
import { Table, Button } from 'reactstrap';
import CreateMovie from './CreateMovie';

type DisplayFilmProps = {
    sessionToken: string
    clearToken: () => void
}

type DisplayFilmState = {
    filmData: Film[]
}

type Film = { FilmTitle: string, Overview: string }

export default class DisplayMovies extends React.Component<DisplayFilmProps, DisplayFilmState> {
    constructor(props: DisplayFilmProps) {
        super(props)
        this.state = {
            filmData: []
        }
        this.render = this.render.bind(this)
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
                    filmData: filmRes,
                })
                console.log(filmRes)
            })
    }



    componentDidMount(): void {
        this.fetchMovies()
    }


    movieWrapper = (): JSX.Element[] => {
        return this.state.filmData.map((film: Film, index: number) => {
            return (
                <Table hover>
                    <tbody>
                        <tr key={index}>
                            <td>{film.FilmTitle}</td>
                            <td>{film.Overview}</td>
                        </tr>

                    </tbody>
                </Table>

            )
        })
    }


    render() {
        // this.fetchMovies = this.fetchMovies.bind(this)
        return (
            <div>
                <CreateMovie sessionToken={this.props.sessionToken} clearToken={this.props.clearToken} />
                <Table hover>
                <thead>
                        <tr>
                            <th>Title</th>
                            <th>Overview</th>
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
