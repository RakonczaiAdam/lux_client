import React, {Component} from 'react'
import './../css/people.css'

class People extends Component{
    constructor(props){
        super(props)
        this.state = {
            username : props.username,
            password : props.password,
            friends : props.friends,
            pendings : props.pendings,
            searchContent : '',
            searchedUser : null
        }
        this.searchHandler = this.searchHandler.bind(this)
        this.sendFrinedRequest = this.sendFrinedRequest.bind(this)
        this.sendFriendResponse = this.sendFriendResponse.bind(this)
    }

    changeHandler = (e) =>{
        this.setState({searchContent : e.target.value})
    }


    async sendFrinedRequest(e){
        const encoded = window.btoa(this.state.username + ":" + this.state.password);
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
        const encoded = window.btoa(this.state.username + ":" + this.state.password);
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
        const encoded = window.btoa(this.state.username + ":" + this.state.password);
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

    render(){
        const {friends, pendings, searchContent, searchedUser} = this.state
        if(searchedUser === null){
            return(
                <div className="peopleContent">
                    <div className="header">
                        <h1>People</h1>
                    </div>
                    <div className="pendings">
                        <h3>
                            Pendings
                        </h3> 
                        {pendings.map(pending =>(
                            <div className="acceptButton" key={pending.id}>
                                <p>{pending.firstName+" "+pending.lastName}</p>
                                <button name={pending.username} onClick={this.sendFriendResponse}>accept</button>
                            </div>
                        ))}
                    </div>
                    <div className="searchUser">
                        <h3>
                            Search user
                        </h3>
                        <textarea
                            name="seachContent"
                            value={searchContent}
                            onChange={this.changeHandler}/>
                        <button className="searchButton" onClick={this.searchHandler}>Search</button>
                    </div>
                    <div className="friends">
                        <h3>
                            Friends
                        </h3>
                        {friends.map(friend =>(
                            <div className="friendsList" key={friend.id}>
                                <p>{friend.firstName+" "+friend.lastName}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }else{
            return(
                <div className="peopleContent">
                    <div className="pendings">
                        <h3>
                            Pendings
                        </h3> 
                        {pendings.map(pending =>(
                            <div className="acceptButton" key={pending.id}>
                                {pending.firstName+" "+pending.lastName}
                                <button name={pending.username} onClick={this.sendFriendResponse}>accept</button>
                            </div>
                        ))}
                    </div>
                    <div className="searchUser">
                        <h3>
                            Search user
                        </h3>
                        <textarea
                            name="seachContent"
                            value={searchContent}
                            onChange={this.changeHandler}/>
                        <button className="searchButton" onClick={this.searchHandler}>Search</button>
                        <div>
                            {searchedUser.username} <button type="button" onClick={this.sendFrinedRequest}>request</button>
                        </div>
                    </div>
                    <div className="friends">
                        <h3>
                            Friends
                        </h3>
                        {friends.map(friend =>(
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

export default People