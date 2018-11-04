import React, { Component } from 'react';

class User extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-3 col-lg-3">
                        <div className="wrapper">
                            <img src={this.props.user.avatar_url} alt="" className="image-cover"/>
                        </div>
                    </div>
                    <div className="col-md-7 col-lg-7">
                        <h4>{this.props.user.login}</h4>
                        <h6>Profile URL : {this.props.user.url}</h6>
                        <h6>Type : {this.props.user.type}</h6>
                    </div>
                </div>
            </div>
        );
    }
}

export default User;
