import { navigate } from "hookrouter";
import React from "react";
import "./style.scss";

export class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      passwd:''
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

  async handleSubmit(event){

    if(this.state.username!=='' && this.state.passwd!==''){
      event.preventDefault();
      const encoded = window.btoa(this.state.username + ":" + this.state.passwd);
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
      console.log(response.data);

      navigate("/feed");
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
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Bejelentkezés</div>
          <div className="content">
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
    );
  }
}

export default Login;

