import React, { Component } from 'react'
import { editToDo } from '../redux/actions'

export class EditToDoForm extends Component {
    state = {
        newDescription: '',
        newDueDate: '',
        newDoneStatus: ''
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
            let task = {
                id: this.props.currentToDo.id,
                job_id: this.props.currentToDo.job_id,
                user_id: this.props.user_id,
                description: this.state.newDescription || this.props.currentToDo.description,
                due_date: this.state.newDueDate || this.props.currentToDo.due_date,
                done_status: this.state.newDoneStatus || this.props.currentToDo.done_status
            }
            editToDo(task, this.props)
    }

    render() {
        const todaysDate = new Date().toJSON().slice(0,10).replace(/-/g,'-');
        return (
            <div className='forms'>
                 <form onSubmit={this.handleSubmit}>
                    <h2><strong>Edit ToDo</strong></h2>
                    <div className='row'>
                        <label>
                            <strong>Current Description: </strong>
                        </label>{this.props.currentToDo.description}<br/>
                        <label>
                            <strong>New Description: </strong>
                        </label>
                    </div>
                    <div className='row'>
                        <textarea className='note' value={this.state.newDescription} name='newDescription' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row'>
                        <label>
                            <strong>Current Due Date: </strong>
                        </label>{this.props.currentToDo.due_date}<br/>
                        <label>
                            <strong>New Due Date: </strong>
                        </label>
                        <input className='page-buttons' type="date" min={todaysDate} name='newDueDate' value={this.state.newDueDate} onChange={this.handleChange} />
                    </div><br/>

                    <div className='row'>
                        <label>
                            <strong>Current done status: </strong>
                        </label>{this.props.currentToDo.done_status ? 'Yes' : 'No'}<br/>
                        <label>
                            <strong>New Done status: </strong>
                        </label>
                        <select name='newDoneStatus' onChange={this.handleChange} className='location-select'>
                            <option defaultValue='select'>Select</option>
                            <option  value='true'>Yes</option>
                            <option value='false'>No</option>
                        </select>  
                    </div><br/>
                    <input className='page-buttons' type="submit" value="Edit ToDo" />
                </form>
                <button onClick = {() => this.props.push('/dashboard')} className='page-buttons'>Back dashboard</button>
                   {/**go to favorite job or applied job depending on if fromFavoritesJobs or FromAppliedJobs is ser */}

                {/* <button onClick = {() => this.props.push('/dashboard')} className='page-buttons'>Back to job</button> */}
            </div>
        )
    }
}

export default EditToDoForm