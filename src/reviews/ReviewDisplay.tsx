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
    reviewUpdate: string
}

type reviewObj = {
    id: number,
    Review: string,
    filmId: number,
    film: filmObj
}

type filmObj = {
    FilmTitle: string
}

export default class ReviewDisplay extends React.Component<ReviewDisplayProps, ReviewDisplayState>{
    constructor(props: ReviewDisplayProps) {
        super(props)
        this.state = {
            reviewUpdate: ''
        }
    }

    deleteReview = async (deleteReview: reviewObj) => {
        await fetch(`http://localhost:3000/review/delete/${deleteReview.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${this.props.sessionToken}`
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
                        <td>{review.film.FilmTitle}</td>
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
                                <th>Film</th>
                                <th>Review </th>
                                <th>Update Review</th>
                                <th>Delete Review</th>
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



