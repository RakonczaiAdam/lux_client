import React, {Component} from "react";
import Post from './Post'

class Feed extends Component{
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
    }

    changeHandler = (e) =>{
        if(e.target.name === "newPost"){
            this.setState({newPost : e.target.value})
        }
    }

    async postHandler(e){
        const encoded = window.btoa(this.state.username + ":" + this.state.password);
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
        const savedPost = await response.json()
        if(response.status === 200){
            savedPost.likes = []
            savedPost.comments = []
            this.setState({posts : [savedPost].concat(this.state.posts)})
        }else{
            alert("Error")
        }
    }

    render(){
        const {posts, newPost} = this.state
        return(
            <div>
                <div>
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