import { navigate } from "hookrouter";
import React from "react";
import "./style.scss";
import { createEncoded, getEncoded } from "./../dashboard/fetch";
import Feed from "./../dashboard/feed";

var loginPreCheck = false;
var posts = [];

export class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      passwd:'',
      loggedin: loginPreCheck,
      notifications: false,
      people: false,
      posts: posts,
      friends: [],
      requests: [],
      people:[],
      commentSSE : new EventSource("http://localhost:8080/comment/subscribe?username="+props.username)
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePW = this.handleChangePW.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buttonToPeople = this.buttonToPeople.bind(this);
    this.buttonToFeed = this.buttonToFeed.bind(this);
  }

  handleChangeName(event){
    this.setState({username: event.target.value});
  }

  handleChangePW(event){
    this.setState({passwd: event.target.value});
  }

  async handleSubmit(event){

    if(this.state.username!=='' && this.state.passwd!=='' && !this.state.loggedin){
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

      if(response.status===200){
        const postinput = await response.json();

        console.log(postinput[0]);
        this.setState({posts : postinput});
        this.setState({loggedin : true});
        loginPreCheck = true;
        posts=this.state.posts;

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

  buttonToFeed(){
    navigate("/login");
  }

  buttonToPeople(){
    navigate("/people");
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
        posts=postinput;
    }
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
              </form>
              <div className="switch">
                <button onClick={this.changeToRegister}>Még nincs fiókja?</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else{
      return(
      <div className="feedparent">
        <div className="buttons">
          <button onClick={this.buttonToPeople}>People</button>
          <button onClick={this.buttonToFeed}>Feed</button>           
        </div>
        <div>
          <Feed 
          posts = {this.state.posts}
          username={this.state.username}
          pasword={this.state.passwd}
          />
        </div> 
      </div>)
    }
  }
}

export async function loadPosts(){
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
      posts=postinput;
  }
}

export default Login;

