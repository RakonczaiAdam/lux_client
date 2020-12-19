import { useRoutes } from "hookrouter";
import React from "react";
import "./style.scss";
import routes from "./../router";
import { A } from "hookrouter";
import { navigate } from "hookrouter";



class Feed extends React.Component{
    constructor(props){
        super(props);
    }

    navigateHome(){
        navigate("/feed");
    }
    navigateNotifications(){
        navigate("/notifications");
    }
    navigatePeople(){
        navigate("/people");
    }
    navigateProfile(){
        navigate("/profile");
    }
    navigateSettings(){
        navigate("/settings");
    }

    render(){
        return(
            <div className="conatiner">
                <div className="navigation">
                    <ul>
                        <li><label htmlFor="home" onClick={this.navigateHome}>Home</label></li>
                        <li><label htmlFor="notifications" onClick={this.navigateNotifications}>Notifications</label></li>
                        <li><label htmlFor="people" onClick={this.navigatePeople}>People</label></li>
                        <li><label htmlFor="profile" onClick={this.navigateProfile}>Profile</label></li>
                        <li><label htmlFor="settings" onClick={this.navigateSettings}>Settings</label></li>
                    </ul>                       
                </div>
                <div className="mainfeed">
                    <div className="feedheader">

                    </div>
                    <div className="feed">

                    </div>
                </div>
                <div className="side">

                </div>
            </div>
        );
    }
}

export default Feed