import React, { Component } from 'react';

class Repositories extends Component {

    renderUserRepositories =()=>{
        return this.props.repos.map((repo,i) => (
            <div className='respository'>
                <div className="row ml-3">
                    <div className="col-md-3"/>
                    <div className="col-md-3">Repository {i+1}</div>
                    <div className="col-md-6">{repo.name}</div>
                </div>
                <hr/>
            </div>
        ));
    };
    render() {
        return (
                <div>
                    {this.renderUserRepositories()}
                </div>
        );
    }
}

export default Repositories;
