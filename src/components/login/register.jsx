import React from "react";

export class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userName: '',
      passWD:'',
      passWDagain:'.',
      lastName:'',
      firstName:'',
      birthDate:'',
      gender:'choose'
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
    this.setState({userName: event.target.value});
  }

  handleChangePW(event){
    this.setState({passWD: event.target.value});
  }

  handleChangePWAgain(event){
    this.setState({passWDagain: event.target.value});
  }

  handleChangeLastName(event){
    this.setState({lastName: event.target.value});
  }

  handleChangeFirstName(event){
    this.setState({firstName: event.target.value});
  }

  handleChangeBirthDate(event){
    this.setState({birthDate: event.target.value});
  }

  handleChangeGender(event){
    this.setState({gender: event.target.value});
  }

  handleSubmit(event){
    if(this.state.passWD == this.state.passWDagain && this.state.gender != 'choose' && this.state.firstName != '' && this.state.lastName != ''){
      fetch('http://localhost/8080/register', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.userName,
        password: this.state.passWD,
        birthsday: "2000-05-18",
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        interests: this.state.interests,
        place: this.state.place,
        sex: this.state.gender
      })
    })

      alert('Sikeres regisztráció ' + this.state.userName + ' ' + this.state.passWD + this.state.gender);
    }

    else if(this.state.passWD != this.state.passWDagain){
      alert('A két jelszó nem egyezik');
    }
    else if(this.state.gender == 'choose'){
      alert('Válasszon nemet!');
    }
    else if(this.state.firstName == '' || this.state.lastName == ''){
      alert('Név megadása kötelező!');
    }
    event.preventDefault();
  }

  render(){
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Regisztráció</div>
          <div className="content">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Felhasználónév</label>
                <input type="text" userName={this.state.userName} onChange={this.handleChangeUserName} name="username" placeholder="Felhasználónév"></input>
              </div>
              <div className="form-group">
                <label htmlFor="password">Jelszó</label>
                <input type="password" passWD={this.state.passWD} onChange={this.handleChangePW} name="password" placeholder="Jelszó"></input>
              </div>
              <div className="form-group">
                <label htmlFor="password">Jelszó ismét</label>
                <input type="password" passWDagain={this.state.passWDagain} onChange={this.handleChangePWAgain} name="passwordagain" placeholder="Jelszó ismét"></input>
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Vezetéknév</label>
                <input type="text" lastName={this.state.lastName} onChange={this.handleChangeLastName} name="lastname" placeholder="Felhasználónév"></input>
              </div>
              <div className="form-group">
                <label htmlFor="firstname">Keresztnév</label>
                <input type="text" firstName={this.state.firstName} onChange={this.handleChangeFirstName} name="firstname" placeholder="Felhasználónév"></input>
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
            </form>
          </div>          
      </div>
    );
  }
}
