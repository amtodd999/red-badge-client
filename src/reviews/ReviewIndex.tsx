import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';


// import Search from '../navigation/Search'
import ReviewCreate from '../reviews/ReviewCreate';
import ReviewEdit from '../reviews/ReviewEdit';
import ReviewDisplay from '../reviews/ReviewDisplay';

type ReviewIndexProps = {
    sessionToken: string,
    filmToReview: filmType
}

type ReviewIndexState = {
    films: film[],
    reviews: review[],
    updateActive: boolean,
    reviewToUpdate: reviewType | null,
    filmId: number
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

export default class ReviewIndex extends React.Component<ReviewIndexProps, ReviewIndexState> {
    constructor(props: ReviewIndexProps) {
        super(props)
        this.state = {
            films: [],
            reviews: [],
            updateActive: false,
            reviewToUpdate: null,
            filmId: 0
        }
    }

    fetchReviews = async () => {
        fetch('http://localhost:3000/review/myReviews', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${this.props.sessionToken}`
            },
        }).then((res) => res.json())
            .then((reviewRes) => {
                this.setState({
                    reviews: reviewRes,
                })
                console.log(reviewRes)
            })
    }
    //this is like editUpdateWorkout in workout log WorkoutIndex
    selectReviewToEdit = (reviews: review): void => {
        this.setState({ reviewToUpdate: reviews })
    }

    updateOn = (): void => {
        this.setState({ updateActive: true })
    }

    updateOff = (): void => {
        this.setState({ updateActive: false })
    }

    componentDidMount(): void {
        this.fetchReviews()
    }

    reviewWrapper(): JSX.Element[] {
        return this.state.reviews.map((review: ReviewIndexProps, index: number) => {
            return (
                <tbody>
                    <tr key={index}>
                        <td>{review.id}</td>
                        <td>{review.Review}</td>
                        <td>
                            <Button color="secondary" onClick={() => {
                                this.selectReviewToEdit(review.id)
                                this.updateOn()
                            }}>
                                Update</Button>
                            <Button color="secondary" size="sm" onClick={e => this.deleteReview(e, review.id)}>Delete</Button>
                        </td>
                    </tr>
                </tbody>
            )
        })
    }

    deleteReview = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault()
        await fetch(`http://localhost:3000/review/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${this.props.sessionToken}`
            },
        }).then((res) => res.json())
            .then((revRes) => {
                this.fetchReviews();
                console.log(revRes)
            })
    }


    render() {
        return (
            <div></div>
                
        )
    }
}
