import React from 'react';
import APIURL from '../helpers/environment';
import styled from 'styled-components';
import {AdminTableStyle, AdminHeaderStyle} from './AdminTableStyle';

type AdminProps = {
    sessionToken: string
}

type AdminState = {
    users: user[]
}

type user = {
    id: number,
    email: string,
    isAdmin: boolean
}

export default class Admin extends React.Component<AdminProps, AdminState>{
    constructor(props: AdminProps) {
        super(props)
        this.state = { users: [] }
        this.fetchUsers = this.fetchUsers.bind(this)
    }

    fetchUsers = async () => {
        fetch(`${APIURL}/User/allusers`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.sessionToken}`
            }),
        }).then((res) => res.json())
            .then((userRes) => {
                this.setState({
                    users: userRes
                })
                console.log(userRes)
            })
    }

    componentDidMount(): void {
        this.fetchUsers()
    }

    deleteUsers = async (deleteUser: user) => {
        await fetch(`${APIURL}/User/admindelete/${deleteUser.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${this.props.sessionToken}`
            },
        }).then((res) => res.json())
            .then((json) => {
                this.fetchUsers();
            })
    }

    userWrapper = (): JSX.Element[] => {
        return this.state.users.map((user: user, index: number) => {
            return (
                <tbody>
                    <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>
                            <button
                                onClick={e => {
                                    if (window.confirm('Are you sure you wish to delete this user?'))
                                        this.deleteUsers(user)
                                }}>
                                Delete
                            </button>
                        </td>
                    </tr>

                </tbody>
            )
        })
    }

    render() {
        return (
            <div>
                <AdminHeaderStyle >Manage Users</AdminHeaderStyle>
                <div>
                    <AdminTableStyle>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Email</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        {this.userWrapper()}
                    </AdminTableStyle>
                </div>
            </div>
        )
    }
}

