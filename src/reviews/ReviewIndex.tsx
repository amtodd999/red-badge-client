import React from 'react';
import ReviewCreate from './ReviewCreate';
import ReviewEdit from './ReviewEdit';
import ReviewDisplay from './ReviewDisplay';
type ReviewIndexProps = {
    sessionToken: string
}
type ReviewIndexState = {
    reviews: review[],
    updateActive: boolean,
    reviewToUpdate: {[key: string]: string},
    selectedReview: review | null
}
type review = {
    id: number,
    MovieTitle: string,
    Review: string
}

export default class ReviewIndex extends React.Component<ReviewIndexProps, ReviewIndexState> {
    constructor(props: ReviewIndexProps) {
        super(props)
        this.state = {
            reviews: [],
            updateActive: false,
            reviewToUpdate: {},
            selectedReview: null
        }
        this.fetchReviews = this.fetchReviews.bind(this)
        this.updateOff = this.updateOff.bind(this)
    }
    fetchReviews = async () => {
        const myToken = localStorage.getItem('sessionToken');
        fetch('http://localhost:3000/review/myReviews', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${myToken}`
            },
        }).then((res) => res.json())
            .then((reviewRes) => {
                this.setState({
                    reviews: reviewRes,
                })
                console.log(reviewRes)
                console.log(this.state.reviews)
            })
    }
    //this is like editUpdateWorkout in workout log WorkoutIndex
    editUpdateReviews = (editReview: any) => {
        this.setState({ reviewToUpdate: editReview })
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
    render() {
        return (
            <div>
                <div className="auth-inner">
                    <ReviewCreate
                        sessionToken={this.props.sessionToken}
                        fetchReviews={this.fetchReviews}
                    />
                </div>
                <br />
                <div>
                    <ReviewDisplay
                        reviews={this.state.reviews}
                        sessionToken={this.props.sessionToken}
                        fetchReviews={this.fetchReviews}
                        editUpdateReviews={this.editUpdateReviews}
                        updateOn={this.updateOn}
                    />
                </div>
                {this.state.updateActive ?
                    <ReviewEdit
                        sessionToken={this.props.sessionToken}
                        reviewToUpdate={this.state.reviewToUpdate}
                        updateOff={this.updateOff}
                        fetchReviews={this.fetchReviews}
                    /> :
                    <></>
                }
                <div>
                </div>
            </div>
        )
    }
}