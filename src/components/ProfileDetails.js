import React, { Component } from 'react';

class ProfileDetails extends Component {
    render() {
        return (
            <div className="col-md-7 col-lg-7">
                <h4>{this.props.user.login}</h4>
                <h6>Profile URL : {this.props.user.url}</h6>
                <h6>Type : {this.props.user.type}</h6>
            </div>
        );
    }
}

export default ProfileDetails;
