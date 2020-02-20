import React from 'react'
import { deleteToDo, setCurrentToDo } from '../redux/actions'

function ToDoCard(props) {
    const {todo} = props

    const handleNoteDelete = () =>{
        deleteToDo(todo, props)
    }

    const handleNoteEdit = () => {
        setCurrentToDo(todo, props)
        props.push('/edit-todo')
    }

    return (
        <div className='job-card-row'>
            <strong>Description:</strong> {todo.description}<br/>
            <strong>Due Date:</strong> {todo.due_date}<br/>
            <strong>Done?</strong> {todo.done_status? 'Yes' : 'No'}<br/>
            <button onClick={handleNoteDelete} className='page-buttons'>Delete ToDo</button>
            <button onClick={handleNoteEdit} className='page-buttons'>Edit ToDo</button>

        </div>
    )
}

export default ToDoCard