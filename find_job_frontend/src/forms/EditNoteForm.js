import React, { Component } from 'react'
import { editNote, resetAppliedCheck, resetViewNote, resetViewToDo, resetShowShareOptions, resetFromFavoriteJobAndFromAppliedJob } from '../redux/actions'

export class EditNoteForm extends Component {
    state = {
        newText: ''
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let note = {
            id: this.props.currentNote.id,
            user_id: this.props.user_id,
            job_id: this.props.currentNote.job_id,
            text: this.state.newText || this.props.currentNote.text
        }
        editNote(note, this.props)
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
                        <h2><strong>Edit note</strong></h2>
                        <label>
                            <strong>Current note: </strong>
                        </label>{this.props.currentNote.text}<br/>
                        <label>
                            <strong>New note: </strong>
                        </label><br/>
                        <textarea className='note' name='newText' value={this.state.newText}  onChange={this.handleChange} /><br/>
                    <input className='page-buttons' type="submit" value="Edit note" />
                </form><br/>
                <button onClick = {this.handleBackToDashboard} className='page-buttons'>Back dashboard</button>

                {this.props.fromFavoriteJobs ?
                    <button onClick = {() => this.props.push('/individual-favorite-job')} className='page-buttons'>Back to favorite job</button>
                    :
                    null
                }

                {this.props.fromAppliedJobs ?
                    <button onClick = {() => this.props.push('/individual-applied-job')} className='page-buttons'>Back to applied job</button>
                    :
                    null
                }
            </div>
        )
    }
}

export default EditNoteForm