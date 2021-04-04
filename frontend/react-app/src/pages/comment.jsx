import React, { Component } from 'react';
import axios from 'axios';

import Comment from "../components/Comment"

class CommentPage extends Component {

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
        axios
            .get("http://localhost:8000/api/asset-comments/" + this.props.location.state.commentsKey)
            .then(response => {
                this.setState({
                    commentsArray: response.data.comments.map(comment => this.commentToComponent(comment))//this.mapComments(response)
                })

            })//this.setState({ data: response.data.comments }))
            .catch(err => console.log(err))
    }
/*
    submitComment(){
        axios
        .get("http://localhost:8000/api/estate-assets/" + this.props.location.state.assetsKey)
        .then(response => {
            this.setState({
                assetsArray:
                    this.assetsToFilter(response.data.assets, this.state.isPriorityChecked)
                        .map(asset => this.assetToComponent(asset))

            })
        })
        .catch(err => console.log(err))
}
    <button style={{ backgroundColor: "red" }} onClick={(e) => submitComment(document.getElementById("submitText").value)}>Kaste</button>
*/

    render() {
        return (
            <div className="eiendelerWrapper">
                <div className="comments">
                    {this.state.commentsArray}
                </div>
                <div>
                    <input type="text" className="inputComment" id="submitText"></input>
                </div>
            </div >
        );
    }

};

export default CommentPage