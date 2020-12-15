
import "./App.scss";
import React, {Component} from "react";
import {Login, Register} from "./components/login";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isLoginActive: false,
    }
  }

  changeState(){
    const {isLoginActive} = this.state;
    if(isLoginActive){}
  }

  render (){
  const {isLoginActive} = this.state;
  const currentActive = isLoginActive ? "Login" : "Register";
    return(
      <div className="app">
        <div className="login">
          <div className="container">
            {isLoginActive && <Login containerRef={(ref) => this.current = ref}/>}
            {!isLoginActive && <Register containerRef={(ref) => this.current = ref}/>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
