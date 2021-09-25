import React from 'react';
import { Table, Button } from 'reactstrap';

type DisplayFilmProps = {
    sessionToken: string
}

type DisplayFilmState = {
    filmData: Film[]
}

type Film = { id: number, FilmTitle: string, Overview: string }

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
//get a big error when I delete movies
    deleteMovies = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault()
        await fetch(`http://localhost:3000/film/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${this.props.sessionToken}`
            },
        }).then((res) => res.json())
            .then((filmRes) => {
                this.fetchMovies();
                console.log(filmRes)
            })
    }



    componentDidMount(): void {
        this.fetchMovies()
    }



    movieWrapper = (): JSX.Element[] => {
        return this.state.filmData.map((film: Film, index: number) => {
            return (
                
                    <tbody>
                        <tr key={index}>
                            <td>{film.FilmTitle}</td>
                            <td>{film.Overview}</td>
                            <td>
                                <Button color="secondary" size="sm" onClick={e => this.deleteMovies(e, film.id)}>Delete</Button>
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
