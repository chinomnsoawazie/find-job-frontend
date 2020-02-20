import React, { Component } from 'react'
import { editToDo } from '../redux/actions'

export class EditToDoForm extends Component {
    state = {
        newDescription: '',
        newDueDate: '',
        newDoneStatus: ''
    }

    handleChange = (event) => {
        // event.preventDefault()
        console.log(event.target.value)
        this.setState({[event.target.name]: event.target.value})
    }

    handleDescriptionChange =(event) => {
        this.setState({newDescription: event.target.value})


    }

    handleSubmit = (event) => {
        event.preventDefault()
        if(this.state.newDueDate){
            let task = {
                id: this.props.currentToDo.id,
                job_id: this.props.currentToDo.job_id,
                user_id: this.props.user_id,
                description: this.state.newDescription,
                due_date: this.state.newDueDate,
                done_status: this.state.newDoneStatus
            }
            editToDo(task, this.props)
        }else{
            let task = {
                id: this.props.currentToDo.id,
                job_id: this.props.currentToDo.job_id,
                user_id: this.props.user_id,
                description: this.state.newDescription,
                due_date: this.props.currentToDo.due_date,
                done_status: this.state.newDoneStatus
            }
            editToDo(task, this.props)
        }
    }

    render() {
        const todaysDate = new Date().toJSON().slice(0,10).replace(/-/g,'-');
        console.log(this.state.newDoneStatus)
        console.log(this.props.currentToDo)
        console.log(this.state.newDescription)
        return (
            <div className='forms'>
                 <form onSubmit={this.handleSubmit}>
                    <h2><strong>Edit ToDo</strong></h2>
                    <div className='row'>
                        <label>
                            <strong>New Description(Old one in box by default):</strong>
                        </label>
                    </div>
                    <div className='row'>
                        <textarea className='note' defaultValue={this.props.currentToDo.description} name='newDescription' onChange={this.handleChange} /><br/>
                    </div>

                    <div className='row'>
                        <label>
                            <strong>New Due Date(min: tomorrow):</strong>
                        </label>
                        <input className='page-buttons' type="date" min={todaysDate} name='newDueDate' value={this.state.newDueDate} onChange={this.handleChange} />
                    </div>

                    <div className='row'>
                        <label>
                            <strong>Done status:</strong>
                        </label>
                        <select name='newDoneStatus' onChange={this.handleChange}className='location-select'>
                            <option defaultValue='select'>Select</option>
                            <option  value='true'>Yes</option>
                            <option value='false'>No</option>
                        </select>  
                </div>

                    <input className='page-buttons' type="submit" value="Edit ToDo" />
                </form>
            </div>
        )
    }
}

export default EditToDoForm