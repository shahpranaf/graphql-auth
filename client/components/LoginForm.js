import React, { Component } from 'react'
import AuthForm from './AuthForm';
import { graphql }  from 'react-apollo'
import LoginMutation from '../mutations/login';
import { hashHistory } from 'react-router';
import currentUserQuery from '../queries/CurrentUser';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = { errors : [] };
    }

    componentWillUpdate(nextProps) {
        // this.props // the old, current set of props
        // nextProps // the next set of props that will be in place
        // when the component rerenders
        if (!this.props.data.user && nextProps.data.user) {
          // redirect to dashboard!!!!
          hashHistory.push('/dashboard');
        }
    }

    onLogin(email, password) {
        this.props.mutate({
            variables: {
                email,
                password
            },
            refetchQueries: [{query: currentUserQuery}]
        })
        // .then(
        //     (res) => {
        //         console.log(res.data);
                
        //         hashHistory.push('/');
        // })
        .catch(err => {
            this.setState({ errors: err.graphQLErrors.map(err => err.message) } );
        });
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <AuthForm errors={this.state.errors} onSubmit={this.onLogin.bind(this)} />
            </div>
        )
    }
}

export default graphql(currentUserQuery)(
    graphql(LoginMutation)(LoginForm)
);