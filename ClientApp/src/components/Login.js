import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = { Email: "", pswrd: "", rememberMe: false, fireRedirect: false, isAutharised: false };
        this.onRememberMeChange = this.onRememberMeChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPswrdChange = this.onPswrdChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.componentWillMount.bind(this);
    }

    componentWillMount() {
        this.IsAutharised();
    }

    onEmailChange(e) {
        var val = e.target.value;
        this.setState({ Email: val });
    }

    onPswrdChange(e) {
        var val = e.target.value;
        this.setState({ pswrd: val });
    }

    onRememberMeChange(e) {
        var val = e.target.value;
        if (val === 'on')
            this.setState({ rememberMe: true });
    }

    async onSubmit() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        }
        await fetch('api/Login', requestOptions)
            .then((response) => {
                if (response.statusText === 100)
                    this.setState({ fireRedirect: true });
                else
                    this.setState({ Email: "", pswrd: "", rememberMe: false, fireRedirect: false });
            })
    }

    async IsAutharised() {
        const response = await fetch('api/navbar');
        const data = await response.json();
        this.setState({ isAutharised: data });

    }

    render() {
        const flag = this.state.fireRedirect;
        return (
            <div class="container">
                {

                    !this.state.isAutharised && (
                        <div>
                            <div class="d-flex justify-content-center ">
                                <div class="row pt-4">
                                    <div class="col">
                                        <h3 className="text-dark">Вход</h3>
                                        {this.state.isAutharised == 1 && (
                                            <h2 className="text-dark">неправильные данные</h2>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center ">
                                <div class="row pt-4">
                                    <div class="col">
                                        <form onSubmit={this.onSubmit} >
                                            <div>
                                                <label className="text-dark">Email:</label><br />
                                                <input type="email" value={this.state.Email} onChange={this.onEmailChange} />
                                            </div>
                                            <div class="pt-4">
                                                <label className="text-dark">пароль:</label><br />
                                                <input id="inp1" type="password" value={this.state.pswrd} onChange={this.onPswrdChange} />
                                            </div>
                                            <div class="pt-4 pl-4">
                                                <label className="text-dark">Запомнить меня:</label><br />
                                                <input type="checkbox" onChange={this.onRememberMeChange} />
                                            </div>
                                            <div class="pt-4 pl-4">
                                                <input id="inpt" type="submit" value="Войти" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {flag && (
                                    <Redirect to={'/'} />
                                )}
                            </div>
                        </div>

                    )

                }
                {
                    this.state.isAutharised && (
                        <Redirect to={'/'} />
                    )
                }
            </div>
        )
    }

}