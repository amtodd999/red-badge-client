import React from 'react';
import { Wrapper } from './AuthStyling';
import Signup from './SignupForm';
import Login from './LoginForm';


type AuthProps = {
    updateToken: (newToken: string) => void,
    updateAdmin: (newAdmin: string) => void
}

type AuthState = {
    showLogin: boolean
}

export default class Auth extends React.Component<AuthProps, AuthState>{
    constructor(props: AuthProps) {
        super(props);
        this.state = {
            showLogin: false
        }
        this.render = this.render.bind(this)
    }

    render() {
        return (

            <Wrapper>
                <h2 style={{ color: '#F0FFFF', fontFamily: "font-family: 'Roboto Mono', monospace"}}>
                        Do you love scary movies? 
                    </h2>
                    <h2 style={{ color: '#F0FFFF', fontFamily: "font-family: 'Roboto Mono', monospace", textDecoration: 'underline'}}>
                    Store & review your favorites on Izutu
                    </h2>
                    
                    {
                        this.state.showLogin
                            ? <Signup updateToken={this.props.updateToken} />
                            :
                            <Login
                                updateToken={this.props.updateToken}
                                updateAdmin={this.props.updateAdmin}
                            />
                    }
                    <br />
                    {/* <form className="login" style={{ backgroundColor: '#f1f1f1' }}> */}

                        {this.state.showLogin
                            ? <h5>Already have an account? Go to login page</h5>
                            : <h5>Don't have a login? Create an account</h5>
                        }

                        <button onClick={() => this.setState({ showLogin: !this.state.showLogin })}>
                            {this.state.showLogin ? "Login" : "Sign Up"}
                        </button>
                    {/* </form> */}
                
            </Wrapper>
        )
    }

}
