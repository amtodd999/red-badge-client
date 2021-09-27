import React from 'react';
import { Table, Button } from 'reactstrap';

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
        fetch('http://localhost:3000/User/allusers', {
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
        await fetch(`http://localhost:3000/User/admindelete/${deleteUser.id}`, {
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
                            <Button
                                color="secondary"
                                size="sm"
                                onClick={e => {
                                    if (window.confirm('Are you sure you wish to delete this user?'))
                                        this.deleteUsers(user)
                                }}>
                                Delete
                            </Button>
                        </td>
                    </tr>

                </tbody>
            )
        })
    }

    render() {
        return (
            <div>
                <h1 className="admin-table">Manage Users</h1>
                <div>
                    <Table dark bordered>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Email</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        {this.userWrapper()}
                    </Table>
                </div>
            </div>
        )
    }

}