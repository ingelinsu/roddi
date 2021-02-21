import React, {Component} from 'react';
import './Estate.css'


class Estate extends Component {
    render() {
        return (
            <div className="estate">
                <div className="estateImage">
                    <img src={this.props.image_url} style={{height:150, width:150}} />
                </div>
                
                <div className="estateContent">
                    <p className="estateName">{this.props.name}</p>
                </div>
            </div>
        );

    }
};

export default Estate