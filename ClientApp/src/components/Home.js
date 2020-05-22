import React, { Component } from 'react';

export class Category extends Component {

    constructor(props) {
        super(props);
        this.state = { data: props.category, };
    }

    render() {
        var fontColor = {
            color: 'blue',
            fontSize: "125%"
        }
        var boards = this.props.boards.filter(b => b.categoryId === this.state.data.id)
        return (
            <div class="col-md-4 text-center pt-4  col-md-offset-9">
                <ul class="list-unstyled" >
                    <li ><h4 className='text-dark'>{this.state.data.name}</h4></li>
                    {
                        boards.map(function (board) {
                            return <li><a style={fontColor} href={`/boards/${board.shortName}`}>{board.name}</a></li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { boards: [], categories: [] };
        this.componentWillMount.bind(this);
        this.loadBoards = this.loadBoards.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    async loadData() {
        const response = await fetch('api/Home');
        const data = await response.json();
        this.setState({ categories: data });
    }

    async loadBoards() {
        const response = await fetch(`api/Board/`);
        const data = await response.json();
        this.setState({ boards: data });
    }

    componentWillMount() {
        this.loadData();
        this.loadBoards();
    }

    render() {
        var boards = this.state.boards;
        var height = {
            height: 50,
        }
        return (

            <div class="container">
                <div style={{ height: 50 }}>
                    </div>
                <div class="d-flex justify-content-center ">
                    <h1 className = "text-dark">welcome</h1>
                </div>
                <div style={height}>
                </div>
                <div style={{ height: 300, backgroundColor: "whitesmoke"}} class= "row" >
                    {
                        this.state.categories.map(function (category) {
                            return <Category category={category} boards={boards} />
                        })
                    }
                </div>
            </div>
        );
    }
}
