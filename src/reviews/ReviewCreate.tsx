import React from 'react';
import ReviewMap from './ReviewMap';
import { ReviewTableStyle } from './ReviewTableStyle';


type ReviewCreateProps = {
    sessionToken: string,
    fetchMoviesForReview: () => void,
    grabFilmForReview: (filmReview: any) => void,
    editUpdateReviews: (editReview: any) => void,
    updateOn: () => void,
    filmToReview: { [key: string]: string },
    films: movie[],
    createOn: () => void
}

export interface ReviewCreateState {
    Review: string,
    SelectFilm: string
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
export default class ReviewCreate extends React.Component<ReviewCreateProps, ReviewCreateState>{
    constructor(props: ReviewCreateProps) {
        super(props)
        this.state = {
            Review: '',
            SelectFilm: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    deleteReview = async (deleteReview: singleReview) => {
        const myToken = localStorage.getItem('sessionToken');
        await fetch(`http://localhost:3000/review/delete/${deleteReview.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${myToken}`
            },
        }).then((res) => res.json())
            .then((revRes) => {
                this.props.fetchMoviesForReview();
                console.log(revRes)
            })
    }

    

    reviewWrapper(): JSX.Element[] {
        
        return this.props.films.map((film: movie, index: number) => {
            
            return (
                <tbody>
                    <tr key={index}>
                        <td>{film.FilmTitle}</td>
                    <ReviewMap bleh={this.props.films}/>
                        
                        <td>
                            <button
                                onClick={e => {
                                    this.props.grabFilmForReview(film)
                                    this.props.createOn()
                                }}>
                                Review
                            </button>
                        </td>
                        <td>
                            <button
                                onClick={e => {
                                    //need to figure out how to get inside second array
                                    // this.props.editUpdateReviews(film.reviews[0].id)
                                    this.props.updateOn()
                                }}>
                                Update
                            </button>
                        </td>
                        <td>
                            <button
                            // onClick={e => this.deleteReview(film.reviews[0].id)}>
                            > Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            )
        })
    }



    handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        const myToken = localStorage.getItem('sessionToken');
        const reqBody = {
            review: {
                MovieId: this.state.SelectFilm,
                Review: this.state.Review
            }
        }
        console.log(reqBody)
        fetch('http://localhost:3000/review/add', {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': `Bearer ${myToken}`,
            }),
        })
            .then(res => res.json())
            .then(rData => {
                console.log(rData)
                this.setState({ Review: '' })
            })
        // this.props.fetchMoviesForReview()
    }


    render() {
        return (
            <div>
<h3 id="movieTitles">Reviews</h3>
                <ReviewTableStyle>
                    <table>
                        <thead>
                            <tr>
                                <th>Film</th>
                                <th>Review </th>
                                <th>Submit a Review</th>
                                <th>Update Review</th>
                                <th>Delete Review</th>
                            </tr>
                        </thead>
                        {this.reviewWrapper()}
                    </table>
                </ReviewTableStyle>
            </div>

        )
    }
}



{/* <div>
                <ReviewFormStyle>
                    <form onSubmit={this.handleSubmit}>
                        <h3>Review a Movie</h3>
                        <div>
                            <label htmlFor="movieReview">Review</label>
                            <input
                                type="text"
                                className="form-control"
                                name="MovieReview"
                                placeholder="Enter your review here"
                                onChange={(e) => this.setState({ Review: e.target.value })}
                                value={this.state.Review}
                                required
                            />
                        </div>
                        <br />
                        <button type="submit">
                            Submit
                        </button>
                    </form>
                </ReviewFormStyle>
            </div> */}


                // createReviewWrapper(): JSX.Element[] {
    //     return this.props.films.map((film: movie, index: number) => {
    //         return (

    //             <option value={this.state.SelectFilm}>
    //                 {film.FilmTitle}
    //             </option>

    //         )
    //     })
    // }

    // handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    //     e.preventDefault()
    //     this.setState({SelectFilm:e.target.value})
    //     console.log(this.state.SelectFilm)
    // }