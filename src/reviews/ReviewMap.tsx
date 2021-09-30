import React from 'react';

type ReviewMapProps = {
    bleh: movie[]
}

type movie = {
    id: number,
    FilmTitle: string,
    reviews: singleReview[]
}

type singleReview = {
    id: number,
    Review: string
}
export default class ReviewMap extends React.Component<ReviewMapProps, {}>{
    constructor(props: ReviewMapProps) {
        super(props)
        this.state = {}
    }

// filmReview = this.props.bleh
fthis = (): void => {
    return (console.log(this.props.bleh[0].reviews),
    alert("test")
    )
    
}


    render(){
        return(
            <div>
               <td> {this.fthis()}</td>
                {/* <td>{film.reviews.map(review => review)}</td> */}
            </div>

        )
    }
}