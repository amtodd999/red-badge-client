import React from 'react';
import { MovieTableStyle } from './MovieTableStyle';

type DisplayFilmProps = {
    sessionToken: string,
    films: filmObj[],
    fetchMovies: () => void,
    updateOn: () => void,
    editUpdateFilms: (editFilm: any) => void
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
        const myToken = localStorage.getItem('sessionToken');
        await fetch(`http://localhost:3000/film/delete/${deleteFilm.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${myToken}`
            },
        }).then((res) => res.json())
            .then((filmRes) => {
                this.props.fetchMovies();
                console.log(filmRes)
            })
    }


    movieWrapper = (): JSX.Element[] => {
        return this.props.films.map((film: filmObj, index: number) => {
            return (

                <tbody>
                    <tr key={index}>
                        <td>{film.FilmTitle}</td>
                        <td>{film.Overview}</td>
                        <td>
                            <button
                                onClick={e => {
                                    this.props.editUpdateFilms(film)
                                    this.props.updateOn()
                                }}>
                                Update
                            </button>
                        </td>
                        <td>
                        <button
                                onClick={e => this.deleteMovies(film)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            )
        })
    }
    render() {
        return (
            <div>
                <h3 id="movieTitles" >Movies</h3>
                <MovieTableStyle>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Overview</th>
                                <th>Update Movie</th>
                                <th>Delete Movie</th>
                            </tr>
                        </thead>
                        {this.movieWrapper()}
                        <br />
                    </table>
                    {/* <button onClick={this.fetchRatings}></button> */}
                </MovieTableStyle>
            </div>
        )
    }
}

