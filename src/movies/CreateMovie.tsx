import React from 'react';
import APIURL from '../helpers/environment';
import {MovieFormStyle} from './MovieFormStyle';

type MovieProps = {
    sessionToken: string,
    fetchMovies: () => void
}

export interface MovieState  {
    FilmTitle: string,
    Overview: string
}

export default class CreateMovie extends React.Component<MovieProps, MovieState>{
    constructor(props: MovieProps) {
        super(props)
        this.state = {
            FilmTitle: '',
            Overview: ''
        }
        //https://www.freecodecamp.org/news/this-is-why-we-need-to-bind-event-handlers-in-class-components-in-react-f7ea1a6f93eb/
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        const myToken = localStorage.getItem('sessionToken');
        const reqBody = {
            film: {
                FilmTitle: this.state.FilmTitle,
                Overview: this.state.Overview,
            }
        }
        console.log(reqBody)
        fetch(`${APIURL}/film/add`, {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': `Bearer ${myToken}`,
            }),
        })
            .then(res => res.json())
            .then(mData => {
                console.log(mData)
                this.setState({ FilmTitle: '', Overview: '' })
                this.props.fetchMovies()
            })
    }

    render() {
        return (
            <div>
            <MovieFormStyle>
                <form onSubmit={this.handleSubmit}>
                    <h3>Create a New Movie</h3>
                    <div >
                        <label htmlFor="movieTitle">Movie Title</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter movie title"
                            onChange={(e) => this.setState({ FilmTitle: e.target.value })}
                            name="FilmTitle"
                            value={this.state.FilmTitle}
                            required
                        />
                        
                        <label htmlFor="movieOverview">Movie Overview</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Brief overview of movie plot"
                            onChange={(e) => this.setState({ Overview: e.target.value })}
                            name="FilmOverview"
                            value={this.state.Overview}
                            required
                        />
                    </div>
                    
                    <button type="submit">
                        Submit
                    </button>

                </form>
            </MovieFormStyle>
            </div>
        )
    }
}