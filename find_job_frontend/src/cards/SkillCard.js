import React from 'react'

const SkillCard = (props) => {
    const {skill} = props
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

            <button className='page-buttons'>Edit skill</button>
        </>
    )
}

export default SkillCard
