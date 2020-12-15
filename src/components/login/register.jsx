import React from "react";

export class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userName: '',
      passWD:'',
      passWDagain:''
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePW = this.handleChangePW.bind(this);
    this.handleChangePWAgain = this.handleChangePWAgain.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event){
    this.setState({userName: event.target.value});
  }

  handleChangePW(event){
    this.setState({passWD: event.target.value});
  }

  handleChangePWAgain(event){
    this.setState({passWDagain: event.target.value});
  }

  handleSubmit(event){
    if(this.state.passWD == this.state.passWDagain){
      alert('Sikeres regisztráció ' + this.state.userName + ' ' + this.state.passWD);

      fetch('http://localhost/8080/register', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.userName,
        password: this.state.passWD,
        birthsday: "2000-05-18",
        firstName: "Fname",
        lastName: "LName",
        interests: "none",
        place: "randomvaros",
        sex: "M"
      })
    })
      alert("done");
    }

    else{
      alert('A két jelszó nem egyezik');
    }
    event.preventDefault();
  }

  register(event){
    fetch('https://lux-rest.herokuapp.com/register', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.userName,
        password: this.state.passWD,
        birthsday: "2000-05-18",
        firstName: "Fname",
        lastName: "LName",
        interests: "none",
        place: "randomvaros",
        sex: "M"
      })
    }).then((Response)=>Response.json())
      .then((Result) => {
        if(Result.Status == 'OK')
          alert("success");
        else
          alert("failed");
      })
      alert("done");
  }

  render(){
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Regisztráció</div>
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
              <div className="form-group">
                <label htmlFor="password">Jelszó</label>
                <input type="password" passWDagain={this.state.passWDagain} onChange={this.handleChangePWAgain} name="passwordagain" placeholder="Jelszó ismét"></input>
              </div>
              <div className="footer">
                <input type="submit" value="Regisztráció"/>
              </div>
            </form>
          </div>          
      </div>
    );
  }
}
