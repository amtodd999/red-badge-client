import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'


type EditFilmProps = {
    sessionToken: string
}

type EditFilmState = {
    id: number,
    FilmTitle: string,
    Overview: string
}



export default class EditMovie extends React.Component<EditFilmProps, EditFilmState>{
    constructor(props: EditFilmProps) {
        super(props)
        this.state = {
            id: 0,
            FilmTitle: '',
            Overview: ''
        }
        this.render = this.render.bind(this)
    }


    editMovies = async (e: React.FormEvent<HTMLFormElement>, id: number, FilmTitle: string, Overview: string) => {
        e.preventDefault()
        const updateBody = {
            film: {
                    FilmTitle: this.state.FilmTitle,
                    Overview: this.state.Overview,
            }

        }
        await fetch(`http://localhost:3000/film/update/${id}`, {
            method: "PUT",
            body: JSON.stringify(updateBody),
            headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': `Bearer ${this.props.sessionToken}`
            }),
        }).then((res) => res.json())
            .then((editRes) => {
                this.setState({
                    FilmTitle: '',
                    Overview: ''
                })
                console.log(editRes)
            })
    }

    

    render() {
        return (
            <div>

            </div>
        )
    }

}