import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

type ReviewEditProps = {
    sessionToken: string,
    filmToReview: film,
    reviewToUpdate: review,
    fetchReviews: () => void,
    updateOff: () => void
}

type ReviewEditState = {
    Review: string,
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

export default class ReviewEdit extends React.Component<ReviewEditProps, ReviewEditState> {
    constructor(props: ReviewEditProps) {
        super(props)
        this.state = {
            Review: '',
            reviewId: this.props.reviewToUpdate.id
        }

    }

    // editReview(e: React.FormEvent<HTMLFormElement>): void => { 
    //     e.preventDefault()
    //     fetch(`http://localhost:3000/review/update/${this.props.reviewToUpdate.id}`, {
    //         method: "PUT",
    //         body: JSON.stringify({ Review: this.state.Review }),
    //         headers: new Headers({
    //             "Content-Type": "application/json",
    //             'Authorization': `Bearer ${this.props.sessionToken}`
    //         }),
    //     })
    //     .then(res => res.json())

    // }

    editReview = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        fetch(`http://localhost:3000/review/update/${this.props.reviewToUpdate.id}`, {
            method: "PUT",
            body: JSON.stringify({ Review: this.state.Review }),
            headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': `Bearer ${this.props.sessionToken}`,
            }),
        })
            .then(res => res.json())
        this.props.fetchReviews()
        this.props.updateOff()
        // .then(rData => {
        //     console.log(rData)
        //     this.setState({ FilmTitle: '', Overview: '' })
        // })
    }


    render() {
        return (
            <Modal>
                <ModalHeader>Edit Review</ModalHeader>
                <ModalBody>
                    <form onSubmit={this.editReview}>
                        <h3>testing Other Header</h3>

                        <div className="form-group">
                            <label htmlFor="Review">Movie Review</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Review"
                                placeholder="Update your review here"
                                onChange={(e) => this.setState({ Review: e.target.value })}
                                value={this.state.Review}
                            // required
                            />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-secondary btn-block">Submit</button>

                    </form>
                </ModalBody>
            </Modal>
        )
    }
}