import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Register extends Component {
    static displayName = Register.name;

    constructor(props) {
        super(props);
        this.state = { key: "", Email: "", pswrd: "", pswrdConfirm: "", fireRedirect: false };
        this.onKeyChange = this.onKeyChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPswrdChange = this.onPswrdChange.bind(this);
        this.onPswrdConfirmChange = this.onPswrdConfirmChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.Upd = this.Upd.bind(this);

    }

    onKeyChange(e) {
        var val = e.target.value;
        this.setState({ key: val });
    }

    onEmailChange(e) {
        var val = e.target.value;
        this.setState({ Email: val });
    }

    Upd() {
        var inp1 = document.getElementById('inp1').value;
        var inp2 = document.getElementById('inp2').value;
        var sp = document.getElementById('hidden');
        var submit = document.getElementById('inpt');
        if (inp1 !== inp2) {
            sp.removeAttribute("hidden");
            submit.setAttribute('disabled', 'disabled');
        }
        else if (inp1 === inp2) {
            sp.setAttribute('hidden', 'hidden');
            submit.removeAttribute('disabled');
        }

    }

    onPswrdChange(e) {
        this.Upd();
        var val = e.target.value;
        this.setState({ pswrd: val });
    }

    onPswrdConfirmChange(e) {
        this.Upd();
        var val = e.target.value;
        this.setState({ pswrdConfirm: val });
    }

    async onSubmit() {
        var flag = this.Upd();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        }
        this.setState({ fireRedirect: true });
        await fetch('api/Account', requestOptions)
            .then((response) => {
                if (response.formData === 200)
                    this.setState({ fireRedirect: true });
                else
                    this.setState({ Email: "", pswrd: "", rememberMe: false, fireRedirect: false });
            })
    }

    render() {
        const flag = this.state.fireRedirect;
        return (
            <div>
                <div class="d-flex justify-content-center ">
                    <div class="row pt-4">
                        <div class="col">
                            <h3 className="text-dark">Регистрация</h3>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center ">
                    <div class="row pt-4">
                        <div class="col">
                            <form onSubmit={this.onSubmit} >
                                <div >
                                    <label class="pl-5">Ключ:</label><br />
                                    <input type="text" value={this.state.key} onChange={this.onKeyChange} />
                                </div >
                                <div class="pt-4">
                                    <label class="pl-5">Email:</label><br />
                                    <input type="email" value={this.state.Email} onChange={this.onEmailChange} />
                                </div >
                                <div class="pt-4">
                                    <label class="pl-5">пароль:</label><br />
                                    <input id="inp1" type="password" value={this.state.pswrd} onChange={this.onPswrdChange} />
                                </div>
                                <div class="pt-4">
                                    <label class="pl-3">проверка пароля:</label><br />
                                    <input id="inp2" type="password" value={this.state.pswrdConfirm} onChange={this.onPswrdConfirmChange} />
                                </div>
                                <span id='hidden' hidden>пароли не совпадают</span>
                                <div class="col pt-4 pl-5 ">
                                    <input id="inpt" type="submit" value="отправить" disabled />
                                </div>
                            </form>
                            {flag && (
                                <Redirect to={'/'} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}
