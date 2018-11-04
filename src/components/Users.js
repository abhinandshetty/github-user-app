import React, {Component} from 'react';
import './Users.css';
import {connect} from 'react-redux';
import {fetchUsers, searchUser, fetchUserRepositories} from '../actions/user-action'
import PropTypes from 'prop-types'
import User from './User'

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

    renderUserList = () => {
        return this.props.users.map((user,i) => (
            <User user={user} key={i}/>
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
                        <div className="col-lg-2 col-md-2"/>
                        <div className="col-lg-8 col-md-8">
                            {this.renderUserList()}
                        </div>
                        <div className="col-lg-2 col-md-2"/>
                    </div>
                </div>
            </div>
        );
    }
}

Users.prototypes = {
    fetchUsers: PropTypes.func.isRequired,
    searchUser: PropTypes.func.isRequired,
    fetchUserRepositories: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    users : state.users.userlist,
    repos: state.users.repos
});
export default connect(mapStateToProps,{ fetchUsers, searchUser, fetchUserRepositories })(Users);