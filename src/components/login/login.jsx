import { navigate } from "hookrouter";
import React from "react";
import "./style.scss";
import Post from "../dashboard/post";
import { createEncoded, getEncoded } from "./../dashboard/fetch";
import { Friends, FriendsRequest } from "./../dashboard/people";
import Feed from "./../dashboard/feed";

export class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      passwd:'',
      loggedin: false,
      notifications: false,
      people: false,
      posts: [],
      friends: [],
      requests: [],
      people:[],
      commentSSE : new EventSource("http://localhost:8080/comment/subscribe?username="+props.username)
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePW = this.handleChangePW.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event){
    this.setState({username: event.target.value});
  }

  handleChangePW(event){
    this.setState({passwd: event.target.value});
  }

  changeToRegister(){
    navigate("/register");
  }

  navigateNotifications(){
    this.setState({notifications: true});
    this.setState({people: false})
  }

  navigatePeople(){
    this.setState({notifications: false});
    this.setState({people: true})
  }

  async handleSubmit(event){

    if(this.state.username!=='' && this.state.passwd!==''){
      event.preventDefault();
      createEncoded(this.state.username, this.state.passwd);
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
      const posts = await response.json();


      if(response.status===200){
        //navigate("/feed");
        console.log(posts[0]);
        this.setState({posts : posts});
        this.setState({loggedin : true});

        this.setState({friends: FriendsRequest()});

        alert("Sikeres bejelentkezés\n" + this.state.loggedin);
      }
      else{
        alert("Sikertelen bejelentkezés");
        navigate("/login");
      }
  }
    else if(this.state.username === ''){
      alert("Felhasználónév megadása kötelező!");
    }
    else if(this.state.passwd === ''){
      alert("Jelszó megadása kötelező!");
    }

    event.preventDefault();
  }

  render(){
    if(!this.state.loggedin){
      return (   
        <div className="base-container" ref={this.props.containerRef}>
          <div className="whiteBox">
            <div className="content">
              <div className="header">
                  <h1>Bejelentkezés</h1>
                  <p>Welcome to the future of social media.<br/>
                  Sign in and start expanding!</p>
                  </div>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Felhasználónév</label>
                  <input type="text" username={this.state.username} onChange={this.handleChangeName} name="username" placeholder="Felhasználónév"></input>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Jelszó</label>
                  <input type="password" passwd={this.state.passwd} onChange={this.handleChangePW} name="password" placeholder="Jelszó"></input>
                </div>
                <div className="footer">
                  <input type="submit" value="Bejelentkezés"/>
                </div>
                <div className="switch">
                <button onClick={this.changeToRegister}>Még nincs fiókja?</button>
              </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
    else if(this.state.people){
      return(
      <div className="container">
        <label>People</label>
        <div className="friends">
          {this.state.friends.map(friend => (
            <Friends
              name={friend.user.firstName + " " + friend.user.lastName}
            />
          ))}
        </div>
        <div className="searchpeople">
            <div className="searchheader">
              <input name="searchfield" placeholder="Név keresése"></input>
              <button type="button" onClick={}>Keresés</button>
            </div>
            <div className="results">

            </div>
        </div>
        <div className="pending">

        </div>
      </div>
      )
    }
    else if(this.state.notifications){

    }
    else{
      return(
        <Feed 
          posts = {this.state.posts}
          username={this.state.username}
          pasword={this.state.passwd}
        />
      )
    }
  }
}

export default Login;

