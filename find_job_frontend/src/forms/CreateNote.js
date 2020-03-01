import React, { Component } from 'react'
import { createNote, resetFromFavoriteJobAndFromAppliedJob, resetAppliedCheck, resetViewNote, resetViewToDo, resetShowShareOptions } from '../redux/actions'

export class CreateNote extends Component {
    state = {
        text: ''
    }

    handleChange = (event) => {
        this.setState({text: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let note = {
            job_id: this.props.currentFavoriteJobID,
            user_id: this.props.user_id,
            text: this.state.text
        }
        createNote(note, this.props)
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
        return (
            <div className='forms'>
                <form onSubmit={this.handleSubmit}>
                        <h2><strong>New note</strong></h2>
                        <textarea className='note' placeholder='Type new note here' value={this.state.text} onChange={this.handleChange} /><br/>
                    <input className='page-buttons' type="submit" value="Create note" />
                </form>
                <button className='page-buttons' onClick={this.handleBackToDashboard}>Go to dashboard</button>
            </div>
        )
    }
}

export default CreateNote