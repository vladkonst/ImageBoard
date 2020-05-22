import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Board extends Component {

    constructor(props) {
        super(props);
        this.state = { data: props.board };
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        this.props.onRemove(this.state.data);
    }
    render() {
        return (
            <tr>
                <td>{this.state.data.name}</td>
                <td>
                    <button onClick={this.onClick} type="submit" class="btn btn-lg  btn-outline-danger"></button>
                </td>
            </tr>
        )
    }
}


export class BoardManager extends Component {
    static displayName = BoardManager.name;

    constructor(props) {
        super(props);
        this.state = { boards: [], categories: [] };
        this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
        this.loadData = this.loadData.bind(this);
        this.loadCategories = this.loadCategories.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onDeleteSubmit(board) {
        const requestOptions = {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: board.Id
        }

        await fetch(`api/Board/${board.id}`, requestOptions)
            .then((response) => {
                window.location.href = "/boards";
            })

    }

    async loadData() {
        const response = await fetch('api/Board');
        const data = await response.json();
        this.setState({ boards: data });
    }

    async loadCategories() {
        const response = await fetch('api/Home');
        const data = await response.json();
        this.setState({ categories: data });
    }

    componentWillMount() {
        this.loadData();
        this.loadCategories();
    }

    async onSubmit(e) {
        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Name: this.refs.name.value, Category: this.refs.category.value,
                Description: this.refs.description.value, ShortName: this.refs.shortName.value
            })
        }

        await fetch('api/Board', requestOptions)
            .then((response) => {
                window.location.href = "/boards-manager";
            });
    }


    render() {
        var remove = this.onDeleteSubmit;

        return (
            <div>
                <div class="container">
                    <div class="row d-flex justify-content-center ">
                        <div class="col-md-6 col-md-offset-1">
                            <h3 class="text-center">создать борду</h3>
                            <form onSubmit={this.onSubmit}>
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <div class="col-lg-12 pt-4">
                                            <input ref="name" type="text" class="form-control" placeholder="Введите имя" />
                                        </div>
                                        <div class="col-lg-12 pt-4">
                                            <input ref="shortName" type="text" class="form-control" placeholder="Введите сокращенное имя" />
                                        </div>
                                        <div class="col-lg-12 pt-4">
                                            <textarea ref="description" class="form-control" placeholder="Введите описание" ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">выберите категорию</label>
                                            <select ref="category" class="form-control" id="exampleFormControlSelect1">
                                                {
                                                    this.state.categories.map(function (category) {
                                                        return <option>{category.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-center col-lg-12">
                                    <input type="submit" class="btn btn-outline-dark btn-lg btn-block" value="Создать" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <br />
   
                <div class="d-flex flex-column align-items-center">
                    <h3>Борды</h3>
                </div>
                <div class="mx-auto p-5">
                    <table class="table">
                        <tr>
                            <th>Название</th><th>удалить</th>
                        </tr>
                        {
                            this.state.boards.map(function (board) {
                                return <Board board={board} onRemove={remove} />
                            })
                        }
                    </table>
                </div>
            </div>

        );

    }
}