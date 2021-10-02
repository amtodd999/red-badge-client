import React from 'react';
import APIURL from '../helpers/environment';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { ReviewCreateState } from './ReviewCreate';

type ReviewEditProps = {
    sessionToken: string,
    updateOff: () => void,
    reviewToUpdate: { [key: string]: string },
    fetchReviews: () => void
}

interface ReviewEditState extends ReviewCreateState {
    isModalVisible: boolean
}

export default class ReviewEdit extends React.Component<ReviewEditProps, ReviewEditState> {
    constructor(props: ReviewEditProps) {
        super(props)
        this.state = {
            isModalVisible: true,
            MovieTitle: this.props.reviewToUpdate.MovieTitle || '',
            Review: this.props.reviewToUpdate.Review || ''
        }

    }

    editReview = async () => {
        const myToken = localStorage.getItem('sessionToken');
        const updateBody = {
            review: {
                MovieTitle: this.state.MovieTitle,
                Review: this.state.Review
            }
        }
        await fetch(`${APIURL}/review/update/${this.props.reviewToUpdate.id}`, {
            method: "PUT",
            body: JSON.stringify(updateBody),
            headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': `Bearer ${myToken}`,
            }),
        })
            .then(res => res.json())
            .then((editRes) => {
                this.setState({ MovieTitle: '', Review: '' })
                this.props.updateOff()
                this.props.fetchReviews()
                console.log(editRes)
            })
    }

    modalToggle = () => {
        this.setState({ isModalVisible: false })
        this.props.updateOff()
    }

    render() {
        return (
            <Modal isOpen={this.state.isModalVisible} toggle={this.modalToggle}>
                <ModalHeader toggle={this.modalToggle}>Edit Review</ModalHeader>
                <ModalBody>
                <div className="form-group">
                        <label htmlFor="Review">Updated Movie Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="UpdatedMovieTitle"
                            placeholder="Update the movie title for your review"
                            onChange={(e) => this.setState({ MovieTitle: e.target.value })}
                            value={this.state.MovieTitle}
                        // required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Review">Updated Review</label>
                        <input
                            type="text"
                            className="form-control"
                            name="UpdatedReview"
                            placeholder="Update your review here"
                            onChange={(e) => this.setState({ Review: e.target.value })}
                            value={this.state.Review}
                        // required
                        />
                    </div>
                    <button type="submit"
                        className="btn btn-secondary btn-block"
                        onClick={e => this.editReview()}>Submit</button>
                </ModalBody>
            </Modal>
        )
    }
}