import React from 'react';
import { Col, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Button } from 'reactstrap';

import Login from './LoginForm';

type Props = {
    updateToken: (newToken: string) => void
}

interface AuthState {
    email: string
    password: string
    isAdmin: boolean
    errorText: string
}

export default class Signup extends React.Component<Props, AuthState>{
    constructor(props: Props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            isAdmin: false,
            errorText: ''
        }
    }

    handleClick = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({ isAdmin: !this.state.isAdmin})

    }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const reqBody = {
            User: {
                email: this.state.email,
                password: this.state.password,
                isAdmin: this.state.isAdmin,
            }
        }
        console.log(reqBody)
        try {
            const res = await fetch('http://localhost:3000/User/register', {
                method: "POST",
                body: JSON.stringify(reqBody),
                headers: {
                    "Content-Type": "application/json"
                },
            })
            console.log( res)
            const json = await res.json();
            console.log(json)
            if (json.errors) {
                let errMsg = json.errors[0].message 
                this.setState({ errorText: errMsg.charAt(0).toUpperCase() + errMsg.slice(1) + '.'})
                throw new Error(json.errors[0].message)
            } else {
                console.log(json.Message);

            }
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <h3>Register a new User</h3>

                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input 
                        type="email" className="form-control" placeholder="Enter email"  
                        onChange={(e) => this.setState({ email: e.target.value })} name="email" value={this.state.email} required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" className="form-control" placeholder="Enter password" 
                        onChange={(e) => this.setState({ password: e.target.value })} name="password" value={this.state.password} required
                    />
                </div>
                <div>

                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input 
                        type="checkbox" className="custom-control-input" id="customCheck1" 
                        checked={this.state.isAdmin}
                        onChange={e => this.handleClick(e)} 
                        
                        />
                        <label className="custom-control-label" htmlFor="customCheck1">Admin User</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-secondary btn-block">Register</button>
                
            </form>
            {/* <Login updateToken={this.props.updateToken} /> */}
            </div>
        )
    }
}

