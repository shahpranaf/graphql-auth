import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import currentUserQuery from '../queries/CurrentUser';
import { Link, hashHistory } from 'react-router';
import LogoutMutation from '../mutations/logout';

class Header extends Component {

    logout() {
        this.props.mutate({
            refetchQueries: [{ query: currentUserQuery}]
        })
        // .then( res => this.props.data.refetch())
    }

    renderButtons() {
        const { user, loading } = this.props.data;
        if(loading){
            return <div>Loading...</div>
        }

        if(!user){
            return (
                <div>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </div>
            )
        }

        return (
            <li><a href="#" onClick={()=>this.logout()}>Logout</a></li>
        )
    }
    
    render() {
        const {user} = this.props.data;
        return(
            <nav>
                <div className="nav-wrapper">
                    <Link style={{marginLeft: 10}} className="brand-logo left" to="/">Home</Link>
                    <ul className="right">
                        {user ? user.email : null}
                        {this.renderButtons()}
                    </ul>
                </div>
            </nav>
        )
    }

        
}



export default graphql(LogoutMutation)(
    graphql(currentUserQuery)(Header)
);