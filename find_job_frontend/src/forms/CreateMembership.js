
import React, { Component } from 'react'
import { createMembership } from '../redux/actions'

export class CreateMembership extends Component {
    state = {
        organization: '',
        start_date: '',
        end_date: ''
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if(this.state.organization && this.state.start_date){
            let membership = {
                user_id: this.props.user_id,
                organization: this.state.organization,
                start_date: this.state.start_date,
                end_date: this.state.end_date
            }
            createMembership(membership, this.props)
        }else{
            alert('Please fill all fields')
        }
    }

    render() {
        const todaysDate = new Date().toJSON().slice(0,10).replace(/-/g,'-')

        return (
            <div className='forms'>
                <h2><strong>New membership</strong></h2>
                <form onSubmit={this.handleSubmit}>

                    <div className='row'>
                        <label>
                            <strong>Organization:</strong>
                        </label>
                    </div>
                    <div className='row'>
                        <input type='text' placeholder='Type in organization' name='organization' value={this.state.organization} onChange={this.handleChange} /><br/>
                    </div>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Start date:</strong>
                        </label>
                        <input type='date' value={this.state.start_date} name='start_date' max={todaysDate}  onChange={this.handleChange} /><br/>
                    </div>

                    <div className='row job-card-row'>
                        <label>
                            <strong>End date:</strong>
                        </label>
                        <input type='date' value={this.state.end_date} name='end_date'  onChange={this.handleChange} /><br/>
                    </div>

                    <input className='page-buttons' type="submit" value="Create membership" />
                </form>
            </div>
        )
    }
}

export default CreateMembership