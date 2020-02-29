import React, { Component } from 'react'
import { editMembership } from '../redux/actions'

export class EditMembership extends Component {
    state = {
        newOrganization: '',
        newStartDate: '',
        newEndDate: ''
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
            let membership = {
                id: this.props.currentMembership.id,
                user_id: this.props.currentMembership.user_id,
                organization: this.state.newOrganization || this.props.currentMembership.organization,
                start_date: this.state.newStartDate || this.props.currentMembership.start_date,
                end_date: this.state.newEndDate || this.props.currentMembership.end_date
            }
            editMembership(membership, this.props)
    }

    render() {
        const todaysDate = new Date().toJSON().slice(0,10).replace(/-/g,'-')

        return (
            <div className='forms'>
                 <form onSubmit={this.handleSubmit}>
                    <h2><strong>Edit membership</strong></h2>
                    <div className='row'>
                        <label>
                            <strong>Current Organization: </strong>
                        </label>{this.props.currentMembership.organization}<br/>
                        <label>
                            <strong>New Organization: </strong>
                        </label>
                        <input type='text'  value={this.state.newOrganization} name='newOrganization' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row'>
                        <label>
                            <strong>Current start date: </strong>
                        </label>{this.props.currentMembership.start_date}<br/>
                        <label>
                            <strong>New start date: </strong>
                        </label>
                        <input type='date'  value={this.state.newStartDate} name='newStartDate' max={todaysDate}  onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row'>
                        <label>
                            <strong>Current end date: </strong>
                        </label>{this.props.currentMembership.end_date}<br/>
                        <label>
                            <strong>New end date: </strong>
                        </label>
                        <input type='date'  value={this.state.newEndDate} name='newEndDate' max={todaysDate}  onChange={this.handleChange} /><br/>
                    </div> <br/>

                    <input className='page-buttons' type="submit" value="Edit membership" />
                </form>
                <button onClick = {() => this.props.push('/user-profile')} className='page-buttons'>Back to profile</button>
                <button onClick = {() => this.props.push('/dashboard')} className='page-buttons'>Back dashboard</button>
            </div>
        )
    }
}

export default EditMembership