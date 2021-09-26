import React from 'react';

type ReviewCreateProps = {
    sessionToken: string,
    //need the movies to tie to reviews
    films: film[],
    // filmToReview: film,
    fetchReviews: () => void
    reviewWrapper: () => JSX.Element[]
}

type ReviewCreateState = {
    // filmId: number,
    Review: string
}

type film = {
    id: number,
    FilmTitle: string,
    Overview: string
}

export default class ReviewCreate extends React.Component<ReviewCreateProps, ReviewCreateState>{
    constructor(props: ReviewCreateProps) {
        super(props)
        this.state = {
            // filmId: this.props.filmToReview.id,
            // filmId: 0,
            Review: ''
        }
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        const reqBody = {
            review: {
                Review: this.state.Review
            }
        }
        console.log(reqBody)
        fetch('http://localhost:3000/review/add', {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': `Bearer ${this.props.sessionToken}`,
            }),
        })
            .then(res => res.json())
            .then(rData => {
                console.log(rData)
                this.setState({ Review: '' })
            })
        this.props.fetchReviews()
        this.props.reviewWrapper()
    }
    render() {
        return (
            <div>
<form onSubmit={this.handleSubmit}>
    <h3>Review a Movie</h3>

    <div className="form-group">
        <label htmlFor="movieReview">Review</label>
        <input
        name="MovieReview"
        onChange={(e) => this.setState({Review: e.target.value})}
        value={this.state.Review}
        />        
    </div>
    <br />
    <button type="submit" className="btn btn-secondary btn-block">Submit</button>
</form>
            </div>
        )
    }
}