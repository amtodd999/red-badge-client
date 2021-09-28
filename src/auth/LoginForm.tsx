import React from 'react';
import { Wrapper } from './AuthStyling';



type Props = {
    updateToken: (newToken: string) => void,
    updateAdmin: (newAdmin: string) => void
}

interface AuthState {
    email: string
    password: string
    errorText: string
}

export default class Login extends React.Component<Props, AuthState>{
    constructor(props: Props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errorText: ''
        }
    }

    handleSubmit = (e: any) => {
        if (this.state.email !== "" && this.state.password !== "") {
            e.preventDefault()
            const reqBody = {
                User: {
                    email: this.state.email,
                    password: this.state.password
                }
            }
            fetch('http://localhost:3000/User/login', {
                method: "POST",
                body: JSON.stringify(reqBody),
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
            }).then(
                (response) => {
                    if (response.status !== 200) {
                        throw new Error('Unable to login');
                    } else return response.json();

                }).then((data) => {
                    const admin = "" + (data.User.isAdmin)
                    console.log(admin)
                    console.log(typeof admin)
                    this.props.updateToken(data.sessionToken);
                    this.props.updateAdmin(admin)
                    console.log(data.sessionToken)
                    console.log(data)
                })
                .catch((err) => alert(err));

        }
    };



    render() {
        return (
            <Wrapper>
                <div>
                <h5>User Login</h5>
                    <form onSubmit={this.handleSubmit}>
                        <div >
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email" 
                                className="form-control" placeholder="Enter email"
                                onChange={(e) => this.setState({ email: e.target.value })} name="email" value={this.state.email} required
                            />
                        </div>

                        <div>
                            <label>Password</label>
                            <input
                                type="password" className="form-control" placeholder="Enter password"
                                onChange={(e) => this.setState({ password: e.target.value })} name="password" value={this.state.password} required
                            />
                        </div>
                        <button type="submit">Submit</button>

                    </form>
                </div>

            </Wrapper>

            // <div>
            //     <form onSubmit={this.handleSubmit}>
            //         <h3 style={{ color: "red" }}>User Login</h3>

            //         <div className="form-group">
            //             <label htmlFor="email">Email address</label>
            //             <input
            //                 type="email" className="form-control" placeholder="Enter email"
            //                 onChange={(e) => this.setState({ email: e.target.value })} name="email" value={this.state.email} required
            //             />
            //         </div>

            //         <div className="form-group">
            //             <label>Password</label>
            //             <input
            //                 type="password" className="form-control" placeholder="Enter password"
            //                 onChange={(e) => this.setState({ password: e.target.value })} name="password" value={this.state.password} required
            //             />
            //         </div>
            //         <Button variant="outlined" onClick={this.handleSubmit}>Submit</Button>

            //     </form>
            // </div>


        )
    }
}
