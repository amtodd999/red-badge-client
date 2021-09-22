import React from 'react';

type MovieProps = {
    updateToken: (newToken: string) => void
}

type MovieState = {
    TmdbId: number,
    MovieTitle: string,
    Overview: string,
    // ReleaseDt: Date,
    OrigLang: string,
    Subgenre: string,
    errorText: string
}


export default class Movie extends React.Component<MovieProps, MovieState>{
    constructor(props: MovieProps) {
        super(props)
        this.state = {
            TmdbId: 0,
            MovieTitle: '',
            Overview: '',
            // ReleaseDt: '',
            OrigLang: '',
            Subgenre: '',
            errorText: ''
        }
    }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const reqBody = {
            movie: {
                TmdbId: this.state.TmdbId,
                MovieTitle: this.state.MovieTitle,
                Overview: this.state.Overview,
                // ReleaseDt: this.state.ReleaseDt,
                OrigLang: this.state.OrigLang,
                Subgenre: this.state.Subgenre,
            }
        }
        console.log(reqBody)
        try {
            const res = await fetch('http://localhost:3000/movie/create', {
                method: "POST",
                body: JSON.stringify(reqBody),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${this.props.updateToken}`
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
                            onChange={(e) => this.setState({ MovieTitle: e.target.value })} name="movieTitle" value={this.state.MovieTitle} required
                        />
                    </div>

                    <button type="submit" className="btn btn-secondary btn-block">Submit</button>

                </form>
            </div>
        )
    }
}

