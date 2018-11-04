import React, { Component } from 'react';

class Image extends Component {
    render() {
        return (
            <div className="wrapper">
                <img src={this.props.url} alt="" className="image-cover"/>
            </div>
        );
    }
}

export default Image;
