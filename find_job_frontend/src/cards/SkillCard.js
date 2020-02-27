import React from 'react'
import { setCurrentSkill, deleteSkill } from '../redux/actions'

const SkillCard = (props) => {
    const {skill, dispatch, push} = props

    const handleSkillEdit = () => {
        setCurrentSkill(skill, dispatch)
        push('/edit-skill')
    }

    const handleSkillDelete = () => {
        deleteSkill(skill, props)
    }

    return (
        <>
            <div className='row job-card-row'>
                <label>
                    <strong>Description:</strong>
                </label>{skill.description}
            </div>

            <div className='row job-card-row'>
                <label>
                    <strong>Proficiency level:</strong>
                </label>{skill.proficiency_level}
            </div>

            <button onClick={handleSkillEdit} className='page-buttons'>Edit skill</button>
            <button onClick={handleSkillDelete} className='page-buttons'>Delete skill</button>
        </>
    )
}

export default SkillCard
