import React, { Component } from 'react'
import { editNote } from '../redux/actions'

export class EditNoteForm extends Component {
    state = {
        newText: ''
    }

    handleChange = (event) => {
        this.setState({newText: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let note = {
            id: this.props.currentNote.id,
            user_id: this.props.user_id,
            job_id: this.props.currentNote.job_id,
            text: this.state.text
        }

        editNote(note, this.props)
    }

    render() {
        console.log(this.props.currentNote)
        return (
            <div className='forms'>
                 <form onSubmit={this.handleSubmit}>
                        <h2><strong>Edit note</strong></h2>
                        <textarea className='note' defaultValue={this.props.currentNote.text} value={this.state.text} onChange={this.handleChange} /><br/>
                    <input className='page-buttons' type="submit" value="Edit note" />
                </form>
            </div>
        )
    }
}

export default EditNoteForm