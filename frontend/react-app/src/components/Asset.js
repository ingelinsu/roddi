import React, {Component} from 'react';

class Asset extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <h2>Hei</h2>
            </div>
        );

    }
}

export default Asset