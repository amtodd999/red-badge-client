import React from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

type Props = {
    updateToken: (newToken: string) => void
}

interface AuthState {
    email: string
    password: string
    isAdmin: boolean
}

export default class Signup extends React.Component<Props, AuthState>{
    constructor(props: Props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            isAdmin: false
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const target = e.target
        const value = target.value
        const name = target.name
        this.setState({} )
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        fetch('http://localhost:3000/user/register', {
            method: 'POST',
            body: JSON.stringify({
                user:{
                    email: this.state.email, 
                    passwordhash: this.state.password, 
                    isAdmin: this.state.isAdmin,
                },}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.updateToken(data.sessionToken)
        })

    }
    render() {
        return(
            <div>
                <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input onChange={(e)=> this.state.email(e.target.value)}  name="email" value={email} required/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(e)=> this.state.password(e.target.value)} name="password" value={password} required/>
                </FormGroup>
                <Button type="submit">Sign Up</Button>
            </Form>
            </div>
        )
    }
}



// const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);
// interface SignUpProps {
//     token: string,
//     name?: any;
//     value?: any;
// }
// interface SignUpState {
//     email: string,
//     password: string,
//     errors: {
//         email: string,
//         password: string
//     }
// }

// export class Signup extends React.Component<SignUpProps, SignUpState>{
// constructor(props: SignUpProps) {
//     super(props);
//     const initialState = {
//         email: "",
//         password: "",
//         errors: {
//             email: "",
//             password: ""
//         }
//     }
//     this.state = initialState;
// }

// handleChange = (event: any) => {
//     event.preventDefault();
//     const {name, value} = event.target;
//     let errors = this.state.errors;
//     switch (name) {
//         case 'email':
//             errors.email = Regex.test(value)? '': 'Email is not valid';
//             break;
//         case 'password':
//             errors.password = value.length < 8 ? 'Password must be 8 characters': '';
//             break;
//         default:
//             break;
//     }
//     this.setState(Object.assign(this.state, {errors,[name]: value}));
//     console.log(name);
//     console.log(this.state.errors);
// }
// handleSubmit = (event: any) => {
//     event.preventDefault();
//         console.log(user, password);
//         fetch('http://localhost:3000/user/register', {
//             method: 'POST',
//             body: JSON.stringify({user:{email, passwordhash: password}}),
//             headers: new Headers({
//                 'Content-Type': 'application/json'
//             })
//         }).then(
//             (response) => response.json()
//         ).then((data) => {
//             props.updateToken(data.sessionToken)
//         })
// }

//     render() {
//         const {errors} = this.state
//         return(
//             <div className='wrapper'>
//                 <div className="form-wrapper">
//                     <h2>Signup</h2>
//                     <form onSubmit={this.handleSubmit} noValidate>
//                         <div className="email">
//                             <label htmlFor="email">Email</label>
//                             <input type='text' name='email' onChange={this.handleChange}/>
//                             {errors.email.length > 0 && <span style={{color:"red"}}>
//                                 {errors.email}</span>}
//                         </div>
//                         <div className='password'>
//                             <label htmlFor='password'>Password</label>
//                             <input type='password' name='password' onChange={this.handleChange}/>
//                         </div>
//                         <div className='submit'>
//                             <button>Create Account</button>
//                         </div>
//                     </form>
//                 </div>

//             </div>
//         )
//     }
// }