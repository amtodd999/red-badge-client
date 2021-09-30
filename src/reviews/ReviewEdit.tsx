import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { ReviewCreateState } from './ReviewCreate';

type ReviewEditProps = {
    sessionToken: string,
    updateOff: () => void,
    reviewToUpdate: { [key: string]: string },
    fetchMoviesForReview: () => void
}

interface ReviewEditState extends ReviewCreateState {
    isModalVisible: boolean
}

export default class ReviewEdit extends React.Component<ReviewEditProps, ReviewEditState> {
    constructor(props: ReviewEditProps) {
        super(props)
        this.state = {
            isModalVisible: true,
            Review: '',
            SelectFilm: ''
        }

    }

    editReview = async () => {
        const updateBody = {
            review: {
                Review: this.state.Review
            }
        }
        await fetch(`http://localhost:3000/review/update/${this.props.reviewToUpdate.id}`, {
            method: "PUT",
            body: JSON.stringify(updateBody),
            headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': `Bearer ${this.props.sessionToken}`,
            }),
        })
            .then(res => res.json())
            .then((editRes) => {
                this.setState({ Review: '' })
                this.props.updateOff()
                this.props.fetchMoviesForReview()
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