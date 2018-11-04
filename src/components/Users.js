import React, {Component} from 'react';
import './Users.css';
import {connect} from 'react-redux';
import {fetchUsers, searchUser, fetchUserRepositories} from '../actions/user-action'
import PropTypes from 'prop-types'

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            userRepo: []
        }
    }

    componentDidMount() {
        this.props.fetchUsers();
    }

    getUserInformation = (username) => {
        this.props.searchUser(username);
    };

    getUserRepos = (username, context) => {
        this.props.fetchUserRepositories(username);
    };

    searchKeyUp =(e)=>{
        if(e.target.value) {
            this.getUserInformation(e.target.value)
        } else {
            this.props.fetchUsers();
        }
    };

    render() {
        const userRepo = this.props.repos.map((repo,i) => (
            <div>
                <div className="row">
                    Repository {i+1} : {repo.name}
                </div>
                <hr/>
            </div>

        ));
        const users = this.props.users.map(user => (
            <div className="card m-3 user-card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="wrapper">
                                <img src={user.avatar_url} alt="" className="image-cover"/>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <h4>{user.login}</h4>
                            <h6>Profile URL : {user.url}</h6>
                            <h6>Type : {user.type}</h6>
                        </div>
                        <div className="col-md-2">
                             <button className="btn detail-button" onClick={this.getUserRepos.bind(this, user.login)}>Details</button>
                        </div>
                    </div>
                    <div className="repo-info">
                        {userRepo}
                    </div>
                </div>
            </div>
        ));
        return (
            <div className="card">
                <div className="card-header sticky-top main-header">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-3"/>
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            <div className="float-left">
                                <select type="text" className="form-control">
                                    <option value="ascRank">Rank Low to High</option>
                                    <option value="descRank">Rank High to Low</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            <div className="float-right">
                                <input type="text" className="form-control" placeholder="Search User" onKeyUp={this.searchKeyUp}/>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3"/>
                    </div>
                </div>
                <div className="card-body main-body">
                    <div className="row">
                        <div className="col-lg-2"/>
                        <div className="col-lg-8">
                            {users}
                        </div>
                        <div className="col-lg-2"/>
                    </div>
                </div>
            </div>
        );
    }
}

Users.prototypes = {
    fetchUsers: PropTypes.func.isRequired,
    searchUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    users : state.users.userlist,
    repos: state.users.repos
});
export default connect(mapStateToProps,{ fetchUsers, searchUser, fetchUserRepositories })(Users);