import React, {Component} from "react";
import Post from './../dashboard/post';
import { getEncoded } from "./fetch";

class Feed extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            posts : props.posts,
            username : props.username,
            password : props.password,
            newPost : '',
            commentSSE : new EventSource("http://localhost:8080/comment/subscribe?username="+props.username)
        }
        this.postHandler = this.postHandler.bind(this)
        this.loadPosts = this.loadPosts.bind(this)
        this.setState({posts: this.loadPosts})
    }

    changeHandler = (e) =>{
        if(e.target.name === "newPost"){
            this.setState({newPost : e.target.value})
        }
    }

    async loadPosts(){
        const encoded = getEncoded();
        const newLogin = {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Authorization': 'Basic ' + encoded,
            'Access-Control-Allow-Origin': '*',
            },
            credentials: 'same-origin'
        }

        const request = new Request("http://localhost:8080/post/get", newLogin);

        const response = await fetch(request);

        var postinput;

        if(response.status===200){
            postinput = await response.json();
            this.setState({posts: postinput});
        }
        return postinput
    }

    async postHandler(e){
        const encoded = getEncoded();
        const newPost = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + encoded,
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                content : this.state.newPost
            }),
            credentials: 'same-origin'
        }

        const request = new Request("http://localhost:8080/post/save", newPost)

        const response = await fetch(request)
        
        if(response.status === 200){
            const savedPost = await response.json()
            savedPost.likes = []
            savedPost.comments = []
            this.setState({posts : [savedPost].concat(this.state.posts)})
        }else{
            alert("Error")
        }
        this.loadPosts();
    }

    render(){
        const {posts, newPost} = this.state;
        return(
            <div>
                <div className="newpost">
                    <textarea
                        name="newPost"
                        value={newPost}
                        onChange={this.changeHandler}/>
                    <button type="button" onClick={this.postHandler}>Post</button>         
                </div>
                {posts.map(post =>(
                    <Post
                        name={post.user.firstName+" "+post.user.lastName}
                        date={post.date}
                        content={post.content}
                        likes={post.likes}
                        comments={post.comments}
                        key={post.id}
                        id={post.id}
                        username={this.state.username}
                        password={this.state.password}
                        commentSSE={this.state.commentSSE}
                    />
                ))}
            </div>
        )
    }
}

export default Feed