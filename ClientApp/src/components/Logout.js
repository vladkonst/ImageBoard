import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Logout extends Component {
    static displayName = Logout.name;

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const requestOptions = {
            method: 'POST'
        }
        fetch('api/Login/Logout', requestOptions).then((response) => {
            window.location.href = "/";
        })
    }

    render() {
        return <div></div>
    }
}