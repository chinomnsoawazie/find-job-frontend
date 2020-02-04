import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

export class SignUpForm extends Component {
    state ={
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: ''
    }

    handleChange = (event) =>{
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let newUser = {
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
            "email": this.state.email,
            "username": this.state.username,
            "password_digest": this.state.password
        }
 
        axios.post('http://localhost:3000/users', newUser)
        .then(r => {
            this.props.getUser(r.data)
        })
        .then(() => this.props.history.push('/logged-in-options'))
        .catch((error) =>{
            console.log(error)
        })

    }


    render() {
        return (

            <div className='login-page'>
                <form onSubmit={this.handleSubmit}>
                    <div className='row'>
                        <label>
                            <strong>First Name:</strong>
                        </label>
                    </div>
                    <div className='row'>
                        <input type="text" name='first_name' value={this.state.first_name} onChange={this.handleChange} />
                    </div>

                    <div className='row'>
                        <label>
                            <strong>Last Name:</strong>
                        </label>
                    </div>
                    <div className='row'>
                        <input type="text" name='last_name' value={this.state.last_name} onChange={this.handleChange} />
                    </div>

                    <div className='row'>
                        <label>
                            <strong>Email:</strong>
                        </label>
                    </div>
                    <div className='row'>
                        <input type="text" name='email' value={this.state.email} onChange={this.handleChange} />
                    </div>

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
                        <button  className='login-buttons' type='submit' value='login'>Create account</button>
                    </div>
                 
                </form>
            </div>
        )
    }
}

export default withRouter(SignUpForm)
