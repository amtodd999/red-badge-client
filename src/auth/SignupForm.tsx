import React from 'react';
import { Wrapper } from './AuthStyling';
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
        this.setState({ isAdmin: !this.state.isAdmin })

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

        fetch('http://localhost:3000/User/register', {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: new Headers({
                "Content-Type": "application/json"
            }),
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.updateToken(data.sessionToken);
        })
            .catch((err) => alert(err));


    }
    render() {
        return (
            <Wrapper>
                <div>
                    <h5>Register a new User</h5>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email" 
                                placeholder="Enter email"
                                className="form-control"
                                onChange={(e) => this.setState({ email: e.target.value })} name="email" value={this.state.email} required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password" 
                                placeholder="Enter password"
                                className="form-control"
                                onChange={(e) => this.setState({ password: e.target.value })} name="password" value={this.state.password} required
                            />
                        </div>
                        <div>

                        </div>

                        <div>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={this.state.isAdmin}
                                    onChange={e => this.handleClick(e)}
                                />
                                <label htmlFor="admincheck">Admin User</label>
                            </div>
                        </div>

                        <button type="submit">Register</button>

                    </form>
                    {/* <Login updateToken={this.props.updateToken} /> */}
                </div>
            </Wrapper>
        )
    }
}

