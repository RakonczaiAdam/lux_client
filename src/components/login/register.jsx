import React from "react";
import Hookrouter from "hookrouter";
import { navigate } from "hookrouter";

export class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      passwd:'',
      passedagain:'.',
      lastname:'',
      firstname:'',
      birthdate:'',
      gender:'choose',
      status: 'default'
    };

    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleChangePW = this.handleChangePW.bind(this);
    this.handleChangePWAgain = this.handleChangePWAgain.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeGender = this.handleChangeGender.bind(this);
  }

  handleChangeUserName(event){
    this.setState({username: event.target.value});
  }

  handleChangePW(event){
    this.setState({passwd: event.target.value});
  }

  handleChangePWAgain(event){
    this.setState({passwdagain: event.target.value});
  }

  handleChangeLastName(event){
    this.setState({lastname: event.target.value});
  }

  handleChangeFirstName(event){
    this.setState({firstname: event.target.value});
  }

  handleChangeBirthDate(event){
    this.setState({birthdate: event.target.value});
  }

  handleChangeGender(event){
    this.setState({gender: event.target.value});
  }

  async handleSubmit(event){
    
    if(this.state.username !== '' && this.state.passwd === this.state.passwdagain && this.state.gender !== 'choose' && this.state.firstname !== '' && this.state.lastname !== ''){
      event.preventDefault()
      const newUser = {
        method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.passwd,
            birthsday: "2000-05-18",
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            interests: "nothing",
            place: this.state.place,
            sex: this.state.gender
          })
      }

      //https://lux-rest.herokuapp.com/register
      //http://localhost:8080/register
      const request = new Request('https://lux-rest.herokuapp.com/register', newUser);
      const response = await fetch(request);
      this.state.status = await response.status;

      if(this.state.status === 200){
        alert('Sikeres regisztráció');
        navigate('/login');
      }
      else{
        alert("Sikertelen regisztráció!\nPróbálkozzon újra később!");
      }
    }
    
    else if(this.state.username === ''){
      alert('Felhasználónév megadása kötelező!')
    }

    else if(this.state.passwd !== this.state.passwdagain){
      alert('A két jelszó nem egyezik');
    }
    else if(this.state.gender === 'choose'){
      alert('Válasszon nemet!');
    }
    else if(this.state.firstname === '' || this.state.lastname === ''){
      alert('Név megadása kötelező!');
    }
    event.preventDefault();
  }

  changeToLogin(){
    navigate("/login");
  }

  render(){
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Regisztráció</div>
          <div className="content">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Felhasználónév</label>
                <input type="text" username={this.state.username} onChange={this.handleChangeUserName} name="username" placeholder="Felhasználónév"></input>
              </div>
              <div className="form-group">
                <label htmlFor="password">Jelszó</label>
                <input type="password" passwd={this.state.passwd} onChange={this.handleChangePW} name="password" placeholder="Jelszó"></input>
              </div>
              <div className="form-group">
                <label htmlFor="password">Jelszó ismét</label>
                <input type="password" passwdagain={this.state.passwdagain} onChange={this.handleChangePWAgain} name="passwordagain" placeholder="Jelszó ismét"></input>
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Vezetéknév</label>
                <input type="text" lastname={this.state.lastname} onChange={this.handleChangeLastName} name="lastname" placeholder="Felhasználónév"></input>
              </div>
              <div className="form-group">
                <label htmlFor="firstname">Keresztnév</label>
                <input type="text" firstname={this.state.firstname} onChange={this.handleChangeFirstName} name="firstname" placeholder="Felhasználónév"></input>
              </div>

              <div className="form-group">
                <label htmlFor="gender">Nem</label>
                <select gender={this.state.gender} onChange={this.handleChangeGender}>
                  <option value="choose">Válasszon!</option>
                  <option value="M">Férfi</option>
                  <option value="F">Nő</option>
                </select>
              </div>
              <div className="footer">
                <input type="submit" value="Regisztráció"/>
              </div>
              <div className="switch">
              <button onClick={this.changeToLogin}>Már van fiókja?</button>
            </div>
            </form>
          </div>          
      </div>
    );
  }
}

export default Register;
