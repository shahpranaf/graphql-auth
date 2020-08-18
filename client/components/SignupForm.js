import React, { Component } from 'react'
import AuthForm from './AuthForm';
import { graphql }  from 'react-apollo'
import SignupMutation from '../mutations/signup';
import { hashHistory } from 'react-router';
import currentUserQuery from '../queries/CurrentUser';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = { errors : [] };
    }

    componentWillUpdate(nextProps) {
        if (nextProps.data.user && !this.props.data.user) {
          hashHistory.push('/dashboard');
        }
    }

    onSignup(email, password) {
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
        //     }
        // )
        .catch(err => {
            this.setState({ errors: err.graphQLErrors.map(err => err.message) } );
        });
    }

    render() {
        return (
            <div>
                <h3>Signup</h3>
                <AuthForm errors={this.state.errors} onSubmit={this.onSignup.bind(this)} />
            </div>
        )
    }
}

export default graphql(currentUserQuery)(
    graphql(SignupMutation)(Signup)
);