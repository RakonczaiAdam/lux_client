import React from "react";
import "./style.scss";
import { navigate } from "hookrouter";
import Scroller from "./../dashboard/feedscroll";

class Feed extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
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
                <div className="main">
                    <div className="title">
                        <label htmlFor="title">Home</label>
                    </div>
                    <div className="feedheader">
                        <textarea name="post" rows="5">Post something</textarea>
                        <button onClick={this.submitPost}>Post</button>
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

/*
const Posts = props => {
    const {posts, dimensions, pages, currentPage} = props
    const handleChange = (event) => {
        setValue(event.target.value);
        props.filerHandler(event.target.value)
    }

    return(
        <div>
            {posts ? 
            <InfiniteScroll
        dataLength={posts.dataLength}
        next = {props.fetchMoreData}
        hasMore={pages-currentPage!==0}
        loader={<h4>Loading...</h4>}
    >
        <div className='flex'>
            {photos.map((photo, index) => {
                return
                    <div key = {index}><img id = {photo.id} src = {photo.url}
                    onClick={() => props.imageHandler(photo)} /></div>})}
        </div>
    </InfiniteScroll>
    : null}
        </div>
    )
}*/