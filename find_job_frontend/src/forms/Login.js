import React, { Component } from 'react'
import {login, setAPIKeys} from '../redux/actions'

export class Login extends Component {

    state ={
        username: '',
        password: ''
    }

    componentDidMount() {
        setAPIKeys(this.props.dispatch)
      }

    handleChange = (event) =>{
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let push = this.props.push
        let dispatch = this.props.dispatch
        let user = {
            "username": this.state.username,
            "password": this.state.password
        }
        login(user, push, dispatch)
    }


    render() {
        return (

            <div className='entry-page'>
                <form onSubmit={this.handleSubmit}>
                    <div className='row'>
                        <label>
                            <strong>Username:</strong>
                        </label>
                    </div>
                    
                    <div className='row'>
                        <input type="text" name='username' value={this.state.username} onChange={this.handleChange} />
                    </div>
                    
                    <div className='row'>
                        <label>
                            <strong>Password:</strong>
                        </label>
                    </div>
                    
                    <div className='row'>
                        <input name='password' type='password' value={this.state.password} onChange={this.handleChange} />
                    </div>
                    
                    <div className='row'>
                        <button className='page-buttons' type='submit' value='login'>Sign In</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login