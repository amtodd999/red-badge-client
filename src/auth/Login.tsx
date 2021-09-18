import React, {FormEventHandler, Component} from 'react';

type LoginFormProps = {
    handleSubmit(email: string, password: string, isAdmin: boolean): void
}

type LoginFormState = {
    email: string,
    password: string,
    isAdmin: boolean
}

export class LoginForm extends Component<>{
    state= {
        email: "",
        password: "",
        isAdmin: false
    }

    submitLogin = (e:FormEvent) => {
        e.preventDefault()
        this.props.handleSubmit(this.state.email, this.state.password, this.state.isAdmin)
    }

    render(){
        return(
            <div></div>
        )
    }
}