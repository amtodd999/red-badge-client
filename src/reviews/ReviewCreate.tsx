import React from 'react';
import {ReviewFormStyle} from './ReviewFormStyle';

type ReviewCreateProps = {
    sessionToken: string,
    fetchReviews: () => void
}

export interface ReviewCreateState  {
    Review: string
}

export default class ReviewCreate extends React.Component<ReviewCreateProps, ReviewCreateState>{
    constructor(props: ReviewCreateProps) {
        super(props)
        this.state = {
            Review: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
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
    }
    render() {
        return (
            <div>
                <ReviewFormStyle>
                <form onSubmit={this.handleSubmit}>
                    <h3>Review a Movie</h3>
                    <div>
                        <label htmlFor="movieReview">Review</label>
                        <input
                            type="text"
                            className="form-control"
                            name="MovieReview"
                            placeholder="Enter your review here"
                            onChange={(e) => this.setState({ Review: e.target.value })}
                            value={this.state.Review}
                            required
                        />
                    </div>
                    <br />
                    <button type="submit">
                        Submit
                    </button>
                </form>
                </ReviewFormStyle>
            </div>
        )
    }
}