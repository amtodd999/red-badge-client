import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'


type editFilmProps = {
sessionToken: string,
hideEdit: boolean
}

type editFilmState = {
    isModalVisible: boolean,
    filmData: Film[]
}

export class EditMovie extends React.Component<editFilmProps, editFilmState>{
    constructor(props: editFilmProps) {
        super(props)
        this.state = {
            isModalVisible: true
        }
    }


    editMovies = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault()
        await fetch(`http://localhost:3000/film/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${this.props.sessionToken}`
            },
        }).then((res) => res.json())
            .then((filmRes) => {
                this.setState({
                    filmData: filmRes,
                })
                console.log(filmRes)
            })
    }

    render(){
        return(
            <div>

            </div>
        )
    }

}