import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

import ReviewCreate from '../reviews/ReviewCreate';
import ReviewEdit from '../reviews/ReviewEdit';
import ReviewDisplay from '../reviews/ReviewDisplay';

type ReviewIndexProps = {
    sessionToken: string
    // ,
    // filmToReview: film 
}

type ReviewIndexState = {
    films: film[],
    reviews: review[],
    updateActive: boolean,
    reviewToUpdate: review | null,
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
        return this.state.reviews.map((review: review, index: number) => {
            return (
                <tbody>
                    <tr key={index}>
                        <td>{review.id}</td>
                        <td>{review.Review}</td>
                        <td>
                            <Button color="secondary" onClick={() => {
                                this.selectReviewToEdit(review)
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
            <div>
                <div className="auth-inner">
                    <ReviewCreate sessionToken={this.props.sessionToken}
                    films={this.state.films} 
                    // filmToReview={this.props.filmToReview} 
                    fetchReviews={this.fetchReviews}
                    reviewWrapper={this.reviewWrapper}
                    />
                </div>
            </div>
            
            //         <Col md="9">
            //             {this.props.gameToReview &&
            //                 <NoteDisplay games={this.state.games} notes={this.state.notes} token={this.props.token} gameToReview={this.props.gameToReview} fetchNotes={this.fetchNotes} updateOn={this.updateOn} editUpdateNote={this.editUpdateNote} noteMapper={this.noteMapper}
            //                 />}
            //         </Col>
            //         {this.props.gameToReview && this.state.updateActive && this.state.noteToUpdate ? <NoteEdit noteToUpdate={this.state.noteToUpdate} updateOff={this.updateOff} token={this.props.token} fetchNotes={this.fetchNotes} gameToReview={this.props.gameToReview} /> : <></>}
            //     </Row>
            // </Container>
        )
    }
}
