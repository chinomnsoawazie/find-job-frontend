import React, { Component } from 'react'
import { createToDo, resetFromFavoriteJobAndFromAppliedJob, resetAppliedCheck, resetViewNote, resetViewToDo, resetShowShareOptions } from '../redux/actions'

export class CreateToDo extends Component {
    state = {
        description: '',
        due_date: ''
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if(this.state.due_date){
            let task = {
                job_id: this.props.currentFavoriteJobID,
                user_id: this.props.user_id,
                description: this.state.description,
                due_date: this.state.due_date,
            }
            createToDo(task, this.props)

        }else{
            alert('Please chose a due date')
        }
    }

    handleBackToDashboard = () => {
        resetFromFavoriteJobAndFromAppliedJob(this.props.dispatch)
        resetAppliedCheck(this.props.dispatch)
        resetViewNote(this.props.dispatch)
        resetViewToDo(this.props.dispatch)
        resetShowShareOptions(this.props.dispatch)
        this.props.push('/dashboard')
    }

    render() {
        const todaysDate = new Date().toJSON().slice(0,10).replace(/-/g,'-');
        return (
            <div className='forms'>
                <h2><strong>New ToDo</strong></h2>
                <form onSubmit={this.handleSubmit}>

                    <div className='row'>
                        <label>
                            <strong>Description:</strong>
                        </label>
                    </div>
                    <div className='row'>
                        <textarea className='note' placeholder='Type description of ToDo here' name='description' value={this.state.description} onChange={this.handleChange} /><br/>
                    </div>

                    <div className='row'>
                        <label>
                            <strong>Due Date(min: tomorrow):</strong>
                        </label>
                    </div>
                    <div className='row'>
                        <input className='page-buttons' type="date" min={todaysDate} name='due_date' value={this.state.due_date} onChange={this.handleChange} />
                    </div>

                    <input className='page-buttons' type="submit" value="Create ToDo" />
                </form>
                <button className='page-buttons' onClick={this.handleBackToDashboard}>Go to dashboard</button>
            </div>
        )
    }
}

export default CreateToDo