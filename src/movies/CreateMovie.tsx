import React from 'react';

type MovieProps = {
    sessionToken: string
}

type MovieState = {
    FilmTitle: string,
    Overview: string,
    errorText: string
}


export default class CreateMovie extends React.Component<MovieProps, MovieState>{
    constructor(props: MovieProps) {
        super(props)
        this.state = {
            FilmTitle: '',
            Overview: '',
            errorText: ''
        }
    }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const reqBody = {
            film: {
                FilmTitle: this.state.FilmTitle,
                Overview: this.state.Overview,
            }
        }
        console.log(reqBody)
        try {
            const res = await fetch('http://localhost:3000/film/add', {
                method: "POST",
                body: JSON.stringify(reqBody),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${this.props.sessionToken}`
                },
            })
            console.log(res)
            const json = await res.json();
            console.log(json)
            if (json.errors) {
                let errMsg = json.errors[0].message
                this.setState({ errorText: errMsg.charAt(0).toUpperCase() + errMsg.slice(1) + '.' })
                throw new Error(json.errors[0].message)
            } else {
                console.log(json.Message);
            }
            this.setState({ FilmTitle: '' })
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Create a New Movie</h3>

                    <div className="form-group">
                        <label htmlFor="movieTitle">Movie Title</label>
                        <input
                            type="text" className="form-control" placeholder="Enter movie title"
                            onChange={(e) => this.setState({ FilmTitle: e.target.value })} name="FilmTitle" value={this.state.FilmTitle} required
                        />
                        <label htmlFor="movieOverview">Movie Overview</label>
                        <input
                            type="text" className="form-control" placeholder="Brief overview of movie plot"
                            onChange={(e) => this.setState({ Overview: e.target.value })} name="FilmOverview" value={this.state.Overview} required
                        />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-secondary btn-block">Submit</button>

                </form>
            </div>
        )
    }
}

