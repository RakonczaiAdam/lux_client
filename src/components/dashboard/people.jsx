import React from 'react';
import './../dashboard/post.css';
import './../dashboard/comment.css';
import { getEncoded } from './../dashboard/fetch';

export async function FriendsRequest() {
  const encoded = getEncoded();
      const newRequest = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Basic ' + encoded,
          'Access-Control-Allow-Origin': '*',
        },
        credentials: 'same-origin'
      }

      const request = new Request("http://localhost:8080/friendship/friends", newRequest);

      const response = await fetch(request);
      const result = await response.json();
      
      return result;
}

export const PendingRequest = () => {

}

export const Friends =({name})=>{
    return(
      <div className = "person">
        <label htmlFor="name">{name}</label>
      </div>
    );
}

export const Pending = () => {

}