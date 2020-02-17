import React from 'react'

const SkillsCard = (props) => {
    const {skill} = props



    return (
        <>
        <div className='row' >
             <p><strong>Skill: </strong> {skill.description}</p>
         </div>
         <div className='row' >
             <p><strong>Proficiency: </strong> {skill.proficiency_level}</p>
         </div>
             
         <div className='row'>
                 <button onClick={() => this.props.history.push('/edit-work-history')} className='profile-entry-button'>Edit</button>
                 <button onClick={() => this.props.history.push('/profile-entry-point')} className='profile-entry-button'>Delete</button>
         </div><br/>
     </>
    )
}

export default SkillsCard
