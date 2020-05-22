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

export class UserManager extends Component {
    static displayName = UserManager.name;

    constructor(props) {
        super(props);
        this.state = { users: [], fireRedirect:false};
        this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
        this.loadData = this.loadData.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    async onSubmit(e) {
        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Key: this.refs.key.value, Email: this.refs.email.value, Password: this.refs.password.value })
        }

        await fetch(`api/Users`, requestOptions)
            .then((response) => {
                if (response.statusText === 100)
                    this.setState({ fireRedirect: true });
                else
                    window.location.href = "/users";
            })
    }


    render() {
        var remove = this.onDeleteSubmit;

        return (
            <div>
                <div class="container">
                    <div class="row d-flex justify-content-center ">
                        <div class="col-md-6 col-md-offset-1">
                            {
                                this.state.fireRedirect && (<h3 class="text-center">Нельзя использовать этот ключ</h3>)
                            }
                            <h3 class="text-center">создать пользователя</h3>
                            <form onSubmit={this.onSubmit}>
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <input ref="key" type="text" class="form-control" placeholder="Введите ключ" />
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <input ref="email" type="email" class="form-control" placeholder="Ваш E-mail" />
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <input ref="password" type="password" class="form-control" placeholder="Ваш пароль"  />
                                    </div>
                                </div>
                                <div class="text-center col-lg-12">
                                    <input type="submit" class="btn btn-outline-dark btn-lg btn-block" value="Submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div class="d-flex flex-column align-items-center">
                    <h3>Пользователи</h3>
                    <br />
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