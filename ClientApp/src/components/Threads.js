import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Post extends Component {
    static displayName = Post.name;

    constructor(props) {
        super(props);
        this.state = {
            i: 0, posts: props.posts, thread: props.thread, isAutharised: false, userName: null
        };
        //this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getUserName = this.getUserName.bind(this);
        this.isAutharised = this.isAutharised.bind(this);
    }

    async getUserName() {
        const response = await fetch('api/navbar/getUser');
        const data = await response.json();
        this.setState({ userName: data });
    }

    async isAutharised() {
        const response = await fetch('api/navbar/');
        const data = await response.json();
        this.setState({ isAutharised: data });
    }

    componentWillMount() {
        this.isAutharised();
        this.getUserName();

    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    tick() {
        if (this.state.i < 4)
            var name = this.isAutharised() ? this.getUserName() : "anonymous";
        this.setState({ userName: name });
        this.setState({
            i: this.state.i + 1, posts: this.props.posts
        });
    }

    async onSubmit(e) {
        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Message: this.refs.message.value, User: this.state.userName, ThreadId: this.state.thread.id
            })
        }
        await fetch('api/Post', requestOptions);
    }

    render() {
        var thread = this.state.thread;
        var posts = this.state.posts.filter(function (post) {
            return post.threadId == thread.id
        });
        return (
            <div>
                <div class="d-flex justify-content-center">
                    <h3 class="text-center">{thread.name}</h3>
                </div>

                {
                    posts.map(function (post) {
                        return (
                            <div class="d-flex justify-content-center pt-5">
                                <div class="col-lg-6" style={{ height: 200, backgroundColor: "whitesmoke", borderWidth: 1, borderColor: "white", borderStyle: "solid" }}>
                                    <div class="row">
                                        <div class="col-md-3 "><b>id:{post.id}</b></div>
                                        <div class="col-md-3 text-center"><b>author:{post.user}</b></div>
                                    </div>
                                    <div class="row" style={{ height: 70 }}>
                                    </div>
                                    <div class="d-flex justify-content-center">{post.message}</div>
                                </div>
                            </div>
                        )
                    })
                }
                <div class="container">
                    <div class="row d-flex justify-content-center ">
                        <div class="col-md-6 col-md-offset-1">
                            <h3 class="text-center">отправить сообщение</h3>
                            <form onSubmit={this.onSubmit}>
                                <div class="form-group">
                                    <div class="col-lg-12 pt-4">
                                        <textarea ref="message" class="form-control" placeholder="Введите сообщение" ></textarea>
                                    </div>
                                </div>
                                <div class="text-center col-lg-12">
                                    <input type="submit" class="btn btn-outline-dark btn-lg btn-block" value="Отправить" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )


    }
}


export class Board extends Component {
    static displayName = Board.name;

    constructor(props) {
        super(props);
        this.state = {
            board: {}, posts: [], threads: [], Name: "", isAutharised: false
        };
        this.loadData = this.loadData.bind(this);
        this.loadThreads = this.loadThreads.bind(this);
        this.isAutharised = this.isAutharised.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.loadPosts = this.loadPosts.bind(this);
    }

    async loadData() {
        const response = await fetch(`api/Board/${this.props.match.params.name}`);
        const data = await response.json();
        this.setState({ board: data });
    }


    async loadThreads() {
        const response = await fetch(`api/Thread/`);
        const data = await response.json();
        this.setState({ threads: data });
    }

    async loadPosts() {
        var board = this.state.board;
        const response = await fetch('api/Post/');
        const data = await response.json();
        this.setState({ posts: data });
    }

    componentDidMount() { }

    componentWillMount() {
        this.loadData();
        this.loadThreads();
        this.isAutharised();
        this.loadPosts();
    }

    async isAutharised() {
        const response = await fetch('api/navbar/');
        const data = await response.json();
        this.setState({ isAutharised: data });
    }

    async onSubmit(e) {
        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Name: this.state.Name, BoardName: this.state.board.Name
            })
        }
        await fetch('api/Thread', requestOptions);

    }

    onNameChange(e) {
        var val = e.target.value;
        this.setState({ Name: val });
    }

    render() {
        var threads = this.state.threads;
        var board = this.state.board;
        var isAutharised = this.state.isAutharised;
        var posts = this.state.posts;
        return (
            <div>
                {
                    isAutharised && (
                        <div class="container">
                            <div class="row d-flex justify-content-center ">
                                <div class="col-md-6 col-md-offset-1">
                                    <h3 class="text-center">создать тред</h3>
                                    <form onSubmit={this.onSubmit}>
                                        <div class="form-group">
                                            <div class="col-lg-12 pt-4">
                                                <input class="form-control" onChange={this.onNameChange} placeholder="введите название" type="text" />
                                            </div>
                                        </div>
                                        <div class="text-center col-lg-12">
                                            <input type="submit" class="btn btn-outline-dark btn-lg btn-block" value="Создать" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div style={{ height: 50 }}>
                </div>
                <div>
                    {
                        threads.map(function (thread) {
                            return <Post posts={posts} thread={thread} />
                        })
                    }
                </div>
            </div>
        )

    }

}