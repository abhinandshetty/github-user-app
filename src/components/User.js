import React, {Component} from 'react';
import Repositories from './Repositories';
import './Users.css';
import {fetchUserRepositories} from '../actions/user-action'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';


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
            <div>
                <div className="card m-3 user-card">
                    <div className="card-body">
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