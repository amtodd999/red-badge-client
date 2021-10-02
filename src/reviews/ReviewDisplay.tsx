import React from 'react';
import { ReviewTableStyle } from './ReviewTableStyle';

type ReviewDisplayProps = {
    sessionToken: string,
    reviews: reviewObj[],
    fetchReviews: () => void,
    updateOn: () => void,
    editUpdateReviews: (editReview: any) => void
}
type ReviewDisplayState = {
    movieTitleUpdate: string,
    reviewUpdate: string
}

type reviewObj = {
    id: number,
    MovieTitle: string,
    Review: string,
    // Flagged: boolean,
}

export default class ReviewDisplay extends React.Component<ReviewDisplayProps, ReviewDisplayState>{
    constructor(props: ReviewDisplayProps) {
        super(props)
        this.state = {
            movieTitleUpdate: '',
            reviewUpdate: ''
        }
    }
    deleteReview = async (deleteReview: reviewObj) => {
        const myToken = localStorage.getItem('sessionToken');
        await fetch(`http://localhost:3000/review/delete/${deleteReview.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${myToken}`
            },
        }).then((res) => res.json())
            .then((revRes) => {
                this.props.fetchReviews();
                console.log(revRes)
            })
    }

    reviewWrapper(): JSX.Element[] {
        return this.props.reviews.map((review: reviewObj, index: number) => {
            // const title = review.find(film => film.FilmTitle)
            return (
                <tbody>
                    <tr key={index}>
                        <td>{review.MovieTitle}</td>
                        <td>{review.Review}</td>
                        <td>
                            <button
                                onClick={e => {
                                    this.props.editUpdateReviews(review)
                                    this.props.updateOn()
                                }}>
                                Update
                            </button>
                        </td>
                        <td>
                            <button
                                onClick={e => this.deleteReview(review)}>
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
                <h3 id="movieTitles">Reviews</h3>
                <ReviewTableStyle>
                    <table>
                        <thead>
                            <tr>
                                <th>Movie</th>
                                <th>Review </th>
                            </tr>
                        </thead>
                        {this.reviewWrapper()}
                    </table>
                </ReviewTableStyle>
                {/* <button onClick={this.fetchRatings}></button> */}
            </div>
        )
    }
}