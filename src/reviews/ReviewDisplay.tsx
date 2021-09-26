import React from 'react';
import { Table, Button } from 'reactstrap';

type ReviewDisplayProps = {
    sessionToken: string,
    films: film[],
    reviews: review[],
    // filmToReview: film,
    fetchReviews: () => void,
    updateOn: () => void,
    selectReviewToEdit: () => void,
    reviewWrapper: () => JSX.Element[]

}

type ReviewDisplayState = {
    reviewId: number
}

type film = {
    id: number,
    FilmTitle: string,
    Overview: string
}

type review = {
    id: number,
    Review: string,
    Flagged: boolean
}

export default class ReviewDisplay extends React.Component<ReviewDisplayProps, ReviewDisplayState>{
    constructor(props: ReviewDisplayProps) {
        super(props)
        this.state = {
            // reviewId: this.props.filmToReview.id
            reviewId: 0
        }
    }

    render() {
        return (
            <div>
                <Table dark bordered>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Review</th>
                        </tr>
                    </thead>
                    {this.props.reviewWrapper()}
                </Table>
                {/* <button onClick={this.fetchRatings}></button> */}
            </div>
        )
    }
}
