import { navigate } from "hookrouter";
import React from "react";

export class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userName: '',
      passWD:''
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePW = this.handleChangePW.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event){
    this.setState({userName: event.target.value});
  }

  handleChangePW(event){
    this.setState({passWD: event.target.value});
  }

  handleSubmit(event){
    alert('Sikeres regisztráció ' + this.state.userName + ' ' + this.state.passWD);
    event.preventDefault();
  }

  changeToRegister(){
    navigate("/register");
  }

  render(){
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Bejelentkezés</div>
          <div className="content">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Felhasználónév</label>
                <input type="text" userName={this.state.userName} onChange={this.handleChangeName} name="username" placeholder="Felhasználónév"></input>
              </div>
              <div className="form-group">
                <label htmlFor="password">Jelszó</label>
                <input type="password" passWD={this.state.passWD} onChange={this.handleChangePW} name="password" placeholder="Jelszó"></input>
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

