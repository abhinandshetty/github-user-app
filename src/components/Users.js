import React, {Component} from 'react';
import './Users.css';
import {connect} from 'react-redux';
import {fetchUsers, searchUser, fetchUserRepositories} from '../actions/user-action'
import PropTypes from 'prop-types'

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterValue: '',
            hideDetails: true,
            currentUser: ''
        }
    }

    componentDidMount() {
        this.props.fetchUsers(()=>{
            this.filterList();
        });
    }

    getUserInformation = (username) => {
        this.props.searchUser(username);
    };

    getUserRepos = (username, context) => {
        if(!this.state.hideDetails) {
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

    searchKeyUp =(e)=>{
        if(e.target.value) {
            this.getUserInformation(e.target.value)
        } else {
            this.props.fetchUsers(()=>{
                this.filterList();
            });
        }
    };

    filterList = () => {
        const filterValue = this.refs.filterCriteria.value;
        switch (filterValue) {
            case 'ascName' :
                this.props.users.sort(function(prev, next){
                    if (prev.login.toLowerCase() < next.login.toLowerCase())
                        return -1;
                    if (prev.login.toLowerCase() > next.login.toLowerCase())
                        return 1;
                    return 0
                });
                break;
            case 'descName':
                this.props.users.sort(function(prev, next){
                    if (prev.login.toLowerCase() > next.login.toLowerCase())
                        return -1;
                    if (prev.login.toLowerCase() < next.login.toLowerCase())
                        return 1;
                    return 0
                });
                break;
            case 'ascRank':
                break;
            case 'descRank':
                break;
            default:
                break;
        }
        this.setState({ filterValue: filterValue});
    };

    renderUserRepositories =()=>{
        return this.props.repos.map((repo,i) => (
            <div data-username = {repo.owner.login}>
                <div className="row">
                    Repository {i+1} : {repo.name}
                </div>
                <hr/>
            </div>
        ));
    };

    renderUserList = () => {
        return this.props.users.map(user => (
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
                    <div className="repo-info" hidden={this.state.hideDetails}>
                        {this.state.currentUser === user.login? this.renderUserRepositories():null}
                    </div>
                </div>
            </div>
        ));
    };

    render() {
        return (
            <div className="card">
                <div className="card-header sticky-top main-header">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-3"/>
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            <div className="float-left">
                                <select type="text" ref="filterCriteria" className="form-control" onChange={this.filterList.bind(this)}>
                                    <option value="ascName">Sort By Name (A-Z)</option>
                                    <option value="descName">Sort By Name (Z-A)</option>
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
                            {this.renderUserList()}
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