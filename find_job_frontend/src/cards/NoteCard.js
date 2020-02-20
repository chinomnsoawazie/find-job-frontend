import React from 'react'
import { deleteNote, setCurrentNote } from '../redux/actions'

function NoteCard(props) {
    const {note} = props

    const handleNoteDelete = () =>{
        deleteNote(note, props)
    }

    const handleNoteEdit = () => {
        setCurrentNote(note, props)
        props.push('/edit-note')
    }

    return (
        <div>
            {note.text}<br/>
            <button onClick={handleNoteDelete} className='page-buttons'>Delete note</button>
            <button onClick={handleNoteEdit} className='page-buttons'>Edit note</button>

        </div>
    )
}

export default NoteCard