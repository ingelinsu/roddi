import React, { Component } from 'react';

import './Comment.css'


class Comment extends Component {

    render() {
        return (
                <div className="commentWrapper">
                    <div className="commentContent">
                        console.log(submitter);
                        <p className="submitter">{this.props.submitter.name}</p>
                        <p className="commentText">{this.props.text}</p>
                        <p className="timestamp">{this.props.timestamp}</p>
                    </div>
                </div>
        );

    }
}

export default Comment