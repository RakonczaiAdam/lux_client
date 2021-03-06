import { navigate } from "hookrouter";
import React from 'react';
import './../dashboard/post.css';
import './../dashboard/comment.css';
import { getEncoded } from './../dashboard/fetch';
import {loadPosts} from './../login/login';

export class People extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username : props.username,
            password : props.password,
            friends : [],
            pendings : [],
            searchContent : '',
            searchedUser : [],
        }
        this.searchHandler = this.searchHandler.bind(this)
        this.sendFrinedRequest = this.sendFrinedRequest.bind(this)
        this.sendFriendResponse = this.sendFriendResponse.bind(this)
        this.buttonToPeople = this.buttonToPeople.bind(this)
        this.buttonToFeed = this.buttonToFeed.bind(this)

        this.setState({pendings: props.pendings})
        this.setState({friends: props.friends})
    }

    changeHandler = (e) =>{
        this.setState({searchContent : e.target.value})
    }


    async sendFrinedRequest(e){
        const encoded = getEncoded();
        const newFriendReq = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + encoded,
                'Access-Control-Allow-Origin': '*',
            },
            credentials: 'same-origin'
        }

        const request = new Request("http://localhost:8080/friendship/request?receiver_username="+this.state.searchedUser.username, newFriendReq)

        const response = await fetch(request)
        if(response.status === 200){
            alert("Friend request sent")
        }
    }

    async sendFriendResponse(e){
        const encoded = getEncoded();
        const newFriendResp = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + encoded,
                'Access-Control-Allow-Origin': '*',
            },
            credentials: 'same-origin'
        }

        const request = new Request("http://localhost:8080/friendship/response?sender_username="+e.target.name+"&response_status=A", newFriendResp)

        const response = await fetch(request)
        if(response.status === 200){
            alert("Friend accepted")
        }
    }

    async searchHandler(e){
        const encoded = getEncoded();
        const newSearch = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Basic ' + encoded,
                'Access-Control-Allow-Origin': '*', 
            },
            credentials: 'same-origin'
        }

        const request = new Request("http://localhost:8080/friendship/search?name="+this.state.searchContent, newSearch)

        const response = await fetch(request)
        if(response.status === 200){
            const user = await response.json()
            this.setState({searchedUser : user})
        }
    }

    buttonToFeed(){
        navigate("/login");
    }
  
    buttonToPeople(){
        navigate("/people");
    }

    render(){
        if(this.state.searchedUser === null){
            return(
                <div>
                    <div>
                        <h3>
                            Pendings
                        </h3>
                        <div className="buttons">
                          <button onClick={this.buttonToPeople}>People</button>
                          <button onClick={this.buttonToFeed}>Feed</button>           
                        </div>
                        {this.state.pendings.map(pendingf =>(
                            <div key={pendingf.id}>
                                {pendingf.firstName+" "+pendingf.lastName}
                                <button name={pendingf.username} onClick={this.sendFriendResponse}>accept</button>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h3>
                            Search user
                        </h3>
                        <textarea
                            name="seachContent"
                            value={this.state.searchContent}
                            onChange={this.changeHandler}/>
                        <button onClick={this.searchHandler}>Search</button>
                    </div>

                    <div>
                        <h3>
                            Friends
                        </h3>
                        {this.state.friends.map(friend =>(
                            <div key={friend.id}>
                                <p>{friend.firstName+" "+friend.lastName}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    <div>
                        <h3>
                            Pending requests
                        </h3>
                        <div className="buttons">
                          <button onClick={this.buttonToPeople}>People</button>
                          <button onClick={this.buttonToFeed}>Feed</button>           
                        </div>
                        {this.state.pendings.map(pendingf =>(
                            <div key={pendingf.id}>
                                {pendingf.firstName+" "+pendingf.lastName}
                                <button name={pendingf.username} onClick={this.sendFriendResponse}>accept</button>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h3>
                            Search user
                        </h3>
                        <textarea
                            name="seachContent"
                            value={this.state.searchContent}
                            onChange={this.changeHandler}/>
                        <button onClick={this.searchHandler}>Search</button>
                        <div>
                            {this.state.searchedUser.username} <button type="button" onClick={this.sendFrinedRequest}>request</button>
                        </div>
                    </div>

                    <div>
                        <h3>
                            Friends
                        </h3>
                        {this.state.friends.map(friend =>(
                            <div key={friend.id}>
                                <p>{friend.firstName+" "+friend.lastName}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    }
}

export default People;