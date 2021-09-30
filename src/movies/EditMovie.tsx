import React from 'react';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import {MovieState} from './CreateMovie';

type EditMovieProps = {
    sessionToken: string,
    updateOff: () => void,
    filmToUpdate: { [key: string]: string},
    fetchMovies: () => void
}

interface EditMovieState extends MovieState  {
    isModalVisible: boolean
}

export default class EditMovie extends React.Component<EditMovieProps, EditMovieState> {
    constructor(props:EditMovieProps) {
        super(props)
        this.state = {
            isModalVisible: true,
            FilmTitle: this.props.filmToUpdate.Title || '',
            Overview: this.props.filmToUpdate.Overview || ''
        }
    }


    editMovies = async () => {
        const myToken = localStorage.getItem('sessionToken');
        const updateBody = {
            film: {
                FilmTitle: this.state.FilmTitle,
                Overview: this.state.Overview,
            }
        }
        await fetch(`http://localhost:3000/film/update/${this.props.filmToUpdate.id}`, {
            method: "PUT",
            body: JSON.stringify(updateBody),
            headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': `Bearer ${myToken}`
            }),
        }).then((res) => res.json())
            .then((editRes) => {
                this.setState({ FilmTitle: '', Overview: '' })
                this.props.updateOff()
                this.props.fetchMovies()
                console.log(editRes)
            })
    }

    modalToggle = () => {
        this.setState({isModalVisible: false})
        this.props.updateOff()
    }

    render() {
        return (
            <Modal isOpen={this.state.isModalVisible} toggle={this.modalToggle}>
                <ModalHeader toggle={this.modalToggle}>Edit Movie Entry</ModalHeader>
                <ModalBody>
                    {/* <form onSubmit={this.editMovies}> */}
                        <div className="form-group">
                            <label htmlFor="Movie">New Movie Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="UpdatedTitle"
                                placeholder="Update your movie title here"
                                onChange={(e) => this.setState({ FilmTitle: e.target.value })}
                                value={this.state.FilmTitle}
                            // required
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="Overview">New Overview</label>
                            <input
                                type="text"
                                className="form-control"
                                name="UpdatedOverview"
                                placeholder="Update your movie details here"
                                onChange={(e) => this.setState({ Overview: e.target.value })}
                                value={this.state.Overview}
                            />
                        </div>
                        {/* <button type="submit" className="btn btn-secondary btn-block">Submit</button> */}
                        <button type="submit" 
                        className="btn btn-secondary btn-block" 
                        onClick={e => this.editMovies()}>Submit</button>

                    {/* </form> */}
                </ModalBody>
            </Modal>
        )
    }

}