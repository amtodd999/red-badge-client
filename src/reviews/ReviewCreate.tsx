import React from 'react';
import APIURL from '../helpers/environment';
import {ReviewFormStyle} from './ReviewFormStyle';

type ReviewCreateProps = {
    sessionToken: string,
    fetchReviews: () => void
}

export interface ReviewCreateState  {
    MovieTitle: string,
    Review: string
}

export default class ReviewCreate extends React.Component<ReviewCreateProps, ReviewCreateState>{
    constructor(props: ReviewCreateProps) {
        super(props)
        this.state = {
            MovieTitle: '',
            Review: ''
        }
        this.handleSubmitReview = this.handleSubmitReview.bind(this)
    }

    handleSubmitReview = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        const myToken = localStorage.getItem('sessionToken');
        const reqBody = {
            review: {
                MovieTitle: this.state.MovieTitle,
                Review: this.state.Review
            }
        }
        fetch(`${APIURL}/review/add`, {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': `Bearer ${myToken}`,
            }),
        })
            .then(res => res.json())
            .then(rData => {
                console.log(rData)
                this.setState({ MovieTitle: '', Review: '' })
                this.props.fetchReviews()
            })
        
    }
    render() {
        return (
            <div>
                <ReviewFormStyle>
                <form onSubmit={this.handleSubmitReview}>
                    <h3>Review a Movie</h3>
                    <div>
                    <label htmlFor="reviewedMovie">Movie Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="MovieTitle"
                            placeholder="Enter your movie title here"
                            onChange={(e) => this.setState({ MovieTitle: e.target.value })}
                            value={this.state.MovieTitle}
                            required
                        />
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
                
                    <button type="submit">
                        Submit
                    </button>
                </form>
                </ReviewFormStyle>
            </div>
        )
    }
}