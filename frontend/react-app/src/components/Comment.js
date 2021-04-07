import React, { Component } from 'react';

import './Comment.css'


class Comment extends Component {

    /**
     * 
     * @param timestamp acquired from comment object in API  
     * @returns A more readable substring of the original timestamp
     */
    timestampToString(timestamp){
        console.log(timestamp);
        var timeString = timestamp.toString();
        var timeSubString1 = timeString.substr(0,10);
        var timeSubString2 = timeString.substr(11,5);
        return timeSubString1 + " " + timeSubString2;
    }

    /**
    getUserName(commentUser){
        axios
        .get("http://127.0.0.1:8000/api/comment-User/" + this.props.location.state.commentsKey + "&" + commentUser)
        .catch(err => console.log(err))
        getUserName(this.props.submitter)
        
    }
    */

    render() {
        return (
                <div className="commentWrapper">
                    <div className="commentContent">
                        <p className="submitter">{this.props.submitter}</p>
                        <p className="commentText">{this.props.text}</p>
                        <p className="timestamp">{this.timestampToString(this.props.timestamp)}</p>
                    </div>
                </div>
        );

    }
}

export default Comment