import React, { Component } from 'react';
import {AuthContext} from "../context/auth"
import axios from 'axios';

import Comment from "../components/Comment"

import "./comment.css"

class CommentPage extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            commentsArray: []
        }
    }

    commentToComponent(comment) {
        return (<Comment
            key={comment.id}
            id={comment.id}
            submitter={comment.submitter.name}
            text={comment.text}
            timestamp={comment.timestamp}
        />)
    }

    componentDidMount() {

        // API for getting all the comments for each asset

        axios
            .get("http://localhost:8000/api/asset-comments/" + this.props.location.state.commentsKey)
            .then(response => {
                this.setState({
                    commentsArray: response.data.comments.map(comment => this.commentToComponent(comment))
                })

            })
            .catch(err => console.log(err))
    }


    /**
     * 
     * @param commentText The text from the textfield input by user
     * Function submits the comment via API with commentText the logged in users ID and current asset/comment page
     */
    submitComment(commentText){
        const { authToken } = this.context

        console.log(commentText, authToken, this.props.location.state.commentsKey)
        axios
        .get("http://127.0.0.1:8000/api/comment/" + authToken + "&" + this.props.location.state.commentsKey + "&" + commentText)
        .catch(err => console.log(err))
        window.location.reload();
}

    render() {
        return (
            <div className="commentsWrapper">
                <div className="comments">
                    {this.state.commentsArray}
                </div>
                <div>
                    <textarea rows="3" cols="50" name="comment" form="usrform" id="submitText" className="textField"></textarea>
                    <button style={{ backgroundColor: "rgb(8, 181, 160)" }} onClick={(e) => this.submitComment(document.getElementById("submitText").value)}>Legg til kommentar</button> 

                </div>
            </div >
        );
    }

};

export default CommentPage