import React from 'react'
import ToDoCard from '../components/SkillsCard'

const AllToDo = (props) => {

    const {allToDo} = props
    return (
        <div>
        {allToDo.map(toDo => <ToDoCard key={toDo.id} todo={toDo}/> )}
        </div>
    )
}

export default AllToDo
