import React, { Component } from 'react';
import { useHistory } from 'react-router'
import axios from 'axios';

import Comment from "../components/Comment"
import {AuthContext} from "../context/auth"

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
            submitter={comment.submitter}
            text={comment.text}
            timestamp={comment.timestamp}
        />)

    }

    componentDidMount() {
        console.log("hei")

        axios
            .get("http://localhost:8000/api/asset-comments/" + this.props.location.state.commentsKey)
            .then(response => {
                this.setState({
                    commentsArray: response.data.comments.map(comment => this.commentToComponent(comment))//this.mapComments(response)
                })

            })//this.setState({ data: response.data.comments }))
            .catch(err => console.log(err))
    }

    submitComment(commentText){
        const { authToken } = this.context

        console.log(commentText, authToken, this.props.location.state.commentsKey)
        axios
        .get("http://127.0.0.1:8000/api/comment/" + authToken + "&" + this.props.location.state.commentsKey + "&" + commentText)
        .catch(err => console.log(err))
        window.location.reload();
}
/*
    <button style={{ backgroundColor: "red" }} onClick={(e) => submitComment(document.getElementById("submitText").value)}>Kaste</button>
                        <input type="textarea" className="inputComment" id="submitText"></input>
*/

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