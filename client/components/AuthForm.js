import React, { Component } from 'react'

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "" };
    }

    onSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;
        this.props.onSubmit(email, password);
    }

    render() {
        const { email, password } = this.state;
        const { errors } = this.props;
        return (
            <div>
                { errors.length ?  errors.map((err, i) => <div key={i} className="danger">{err}</div>)  : null }
                
                <form onSubmit={this.onSubmit.bind(this)}  className="cols s4">
                    <div className="input-field">
                        {/* <label to="a">Email</label> */}
                        <input placeholder="Email" name="a" value={email} 
                            onChange={($event) => this.setState({email: $event.target.value})} 
                        />
                    </div>
                    
                    <div className="input-field">
                        {/* <label>Password</label> */}
                        <input placeholder="Password" value={password} 
                            onChange={(e) => this.setState({password: e.target.value})} 
                        />
                    </div>
                    
                    <button className="btn">Login</button>
                </form>
            </div>
        )
    }
}

export default AuthForm;