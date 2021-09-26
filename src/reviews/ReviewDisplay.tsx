import React from 'react';
import { Table, Button } from 'reactstrap';

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
    // Flagged: boolean,
    filmId: number
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
            return (
                <tbody>
                    <tr key={index}>
                        <td>{review.id}</td>
                        <td>{review.Review}</td>
                        <td>{review.filmId}</td>
                        <td>
                            <Button
                                color="secondary"
                                size="sm"
                                onClick={e => {
                                    this.props.editUpdateReviews(review)
                                    this.props.updateOn()
                                }}>
                                Update
                            </Button>
                            <Button
                                color="secondary"
                                size="sm"
                                onClick={e => this.deleteReview(review)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                </tbody>
            )
        })
    }
    render() {
        return (
            <div>
                <Table dark bordered>
                    <thead>
                        <tr>
                            <th>Review ID</th>
                            <th>Review</th>
                            <th>Film ID</th>
                        </tr>
                    </thead>
                    {this.reviewWrapper()}
                </Table>
                {/* <button onClick={this.fetchRatings}></button> */}
            </div>
        )
    }
}



