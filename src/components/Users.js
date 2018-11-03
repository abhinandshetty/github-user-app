import React, {Component} from 'react';
import './Users.css';
class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch('https://api.github.com/users')
            .then(res => res.json())
            .then(data => this.setState({users: data}));
    }

    render() {
        const users = this.state.users.map(user => (
            <div className="card m-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="wrapper">
                                <img src={user.avatar_url}
                                     alt=""
                                     className="image-cover"/>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <h5>{user.login}</h5>
                            <h6>Profile URL : {user.url}</h6>
                            <h6>Type : {user.type}</h6>
                            <div className="row">
                                <div className="col-md-3"/>
                                <div className="col-md-3"/>
                                <div className="col-md-3"/>
                                <div className="col-md-3">
                                    <button className="btn">Details</button>

                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        ));
        return (
            <div className="card">
                <div className="card-header sticky-top" style={{'backgroundColor': '#0077B5'}}>
                    <div className="row">
                        <div className="col-lg-3"/>
                        <div className="col-lg-3">
                            <div className="float-left">
                                <select type="text" className="form-control">
                                    <option value="ascRank">Rank Low to High</option>
                                    <option value="descRank">Rank High to Low</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="float-right">
                                <input type="text" className="form-control" placeholder="Search User"/>
                            </div>
                        </div>
                        <div className="col-lg-3"/>
                    </div>
                </div>
                <div className="card-body">
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

export default Users;