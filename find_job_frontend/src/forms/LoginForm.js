import React, { Component } from 'react'
import axios from 'axios'
 
export class LoginForm extends Component {

    state ={
        username: '',
        password: ''
    }

    handleChange = (event) =>{
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let user = {
            "username": this.state.username,
            "password": this.state.password
        }
 
        axios.post('http://localhost:3000/login', user)
        .then(r => {
            // console.log(r.data.user)
            this.props.getUser(r.data)
        })
    }


    render() {
        return (

            <div className='login-page'>
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
                        <button className='login-buttons' type='submit' value='login'>Sign In</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginForm



