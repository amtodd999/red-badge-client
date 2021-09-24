import React from 'react';


type Props = {
    updateToken: (newToken: string) => void
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
                    this.props.updateToken(data.sessionToken);
                    console.log(data.sessionToken)
                })
                .catch((err) => alert(err));

        }
    };



    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>User Login</h3>

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
                    <button type="submit" className="btn btn-secondary btn-block">Submit</button>

                </form>
            </div>
        )
    }
}


// handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     const reqBody = {
    //         User: {
    //             email: this.state.email,
    //             password: this.state.password
    //         }
    //     }

    //     try {
    //         const res = await fetch('http://localhost:3000/User/login', {
    //             method: "POST",
    //             body: JSON.stringify(reqBody),
    //             headers: new Headers({
    //                 "Content-Type": "application/json"
    //             }),
    //         })
    //         console.log( res)
    //         const json = await res.json();
    //         console.log(json)
    //         if (json.errors) {
    //             let errMsg = json.errors[0].message 
    //             this.setState({ errorText: errMsg.charAt(0).toUpperCase() + errMsg.slice(1) + '.'})
    //             throw new Error(json.errors[0].message)
    //         } else {
    //             console.log(json.message);
    //             return (
    //                 res.json()
    //                 // data() => {
    //                 //     this.props.updateToken(data.sessionToken)
    //                 // }
    //                 );

    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
