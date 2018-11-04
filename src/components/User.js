import React, {Component} from 'react';
import Repositories from './Repositories';
import './Users.css';
import {fetchUserRepositories} from '../actions/user-action'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import ProfileDetails from "./ProfileDetails";
import Image from "./Image";


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideDetails: true,
            currentUser: ''
        }
    }

    getUserRepos = (username, context) => {
        if (!this.state.hideDetails) {
            this.setState({
                hideDetails: !this.state.hideDetails,
            })
        } else {
            this.props.fetchUserRepositories(username, () => {
                this.setState({
                    hideDetails: !this.state.hideDetails,
                    currentUser: username
                })
            });
        }
    };

    render() {
        return (
            <div className="row">
                <div className="col-lg-2 col-md-2"/>
                <div className="col-lg-8 col-md-8">
                    <div className="card m-3 user-card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3 col-lg-3">
                                    <Image url={this.props.user.avatar_url}/>
                                </div>
                                <ProfileDetails user={this.props.user}/>
                                <div className="col-md-2 col-lg-2">
                                    <button className="btn detail-button"
                                            onClick={this.getUserRepos.bind(this, this.props.user.login)}>
                                        Details
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className="repo-info" hidden={this.state.hideDetails}>
                            {this.state.currentUser === this.props.user.login ?
                                <Repositories repos={this.props.repos}/> : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


User.prototypes = {
    fetchUserRepositories: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    repos: state.users.repos
});
export default connect(mapStateToProps, {fetchUserRepositories})(User);