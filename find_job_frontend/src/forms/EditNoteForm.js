import React, { Component } from 'react'
import { editNote } from '../redux/actions'

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
            text: this.state.text
        }
        editNote(note, this.props)
    }

    render() {
        return (
            <div className='forms'>
                 <form onSubmit={this.handleSubmit}>
                        <h2><strong>Edit note</strong></h2>
                        <textarea className='note' name='newText' defaultValue={this.props.currentNote.text}  onChange={this.handleChange} /><br/>
                    <input className='page-buttons' type="submit" value="Edit note" />
                </form>
                <button onClick = {() => this.props.push('/dashboard')} className='page-buttons'>Back dashboard</button>
            </div>
        )
    }
}

export default EditNoteForm