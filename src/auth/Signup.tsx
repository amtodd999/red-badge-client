import React, {Component} from "react";
import { FormGroup, Label, Form, Button, Input } from "reactstrap";

type SignupProps = {
    token: any;
    updateEmail: string | any;
    updatePassword: string | any;
    updateRole: string | any;
    
};

type SignUpFormState = {
    email: string;
    password: string;
};

export default class Signup extends Component<SignupProps, SignUpFormState> {
    constructor(props: SignupProps) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        fetch(`http://localhost:3000/User/register`, {
            method: "POST",
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.password,
            }),
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                this.props.token(data.sessionToken);
                console.log(data);
                this.props.updateUsername(data.user.email);
                this.props.updatePassword(data.user.password);
                this.props.updateRole(data.isAdmin);
            });
    };

    render() {
        return (
            <div>
                <h3>Signup</h3>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="username">
                            <h4>Username</h4>
                        </Label>
                        <Input
                            onChange={(e) => this.setState({ email: e.target.value })}
                            style={{ maxWidth: "250px" }}
                            name="username"
                            type="text"
                            value={this.state.email}
                            required
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}"
                            title="Must have at least one number, uppercase, and a lowercase letter. Min 4 chars."
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">
                            <h4>Password</h4>
                        </Label>
                        <Input.Password
                            onChange={(e) => this.setState({ password: e.target.value })}
                            style={{ maxWidth: "250px" }}
                            name="password"
                            type="password"
                            value={this.state.password}
                            required
                            pattern="(?=.*[a-z]).{5,}"
                            title="Password must be at least 5 characters"
                        />
                    </FormGroup>

                    <Button
                        htmlType="submit"
                        type="primary"
                        style={{ marginTop: "10px" }}
                    >
                        Sign Up
                    </Button>
                </Form>
            </div>
        );
    }
}