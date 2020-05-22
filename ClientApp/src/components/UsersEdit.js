import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class User extends Component {

    constructor(props) {
        super(props);
        this.state = { data: props.user };
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        this.props.onRemove(this.state.data);
    }
    render() {
        return (
            <tr>
                <td>{this.state.data.email}</td>
                <td>
                    <button onClick={this.onClick} type="submit" class="btn btn-lg  btn-outline-danger"></button>
                </td>
            </tr>
        )
    }
}

export class UserEdit extends Component {
    static displayName = UserEdit.name;

    constructor(props) {
        super(props);
        this.state = { users: [] };
        this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    async onDeleteSubmit(user) {
        const requestOptions = {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: user.Id
        }

        await fetch(`api/Users/${user.id}`, requestOptions)
            .then((response) => {
                window.location.href = "/users";
            })

    }

    async loadData() {
        const response = await fetch('api/Users');
        const data = await response.json();
        this.setState({ users: data });
    }

    componentWillMount() {
        this.loadData();
    }

    onClick(e) {
        window.location.href = "/users/edit";
    }

    render() {
        var remove = this.onDeleteSubmit;

        return (
            <div>
                <div class="d-flex flex-column align-items-center">
                    <h3>Пользователи</h3>
                    <br class="mb-3" />
                    <button type="button" onClick={this.onClick} class="btn btn-outline-dark btn-lg btn-block">
                        создать пользователя
                        </button>
                </div>
                <div class="mx-auto p-5">
                    <table class="table">
                        <tr>
                            <th>Email</th><th>удалить</th>
                        </tr>
                        {
                            this.state.users.map(function (user) {
                                return <User key={user.id} user={user} onRemove={remove} />
                            })
                        }

                    </table>
                </div>
            </div>
        );

    }
}