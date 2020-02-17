import React from 'react'
import SkillsCard from '../components/SkillsCard'
import { withRouter } from 'react-router'


const AllSkills = (props) => {

    const {userSkills} = props
    return (
        <>
            <div className='profile-child'>
                {userSkills.map(skill => <SkillsCard key={skill.id} skill={skill} />)}    
            </div>

            <div className='row'>
                <button onClick={() => props.history.push('/profile-entry-point')} className='profile-entry-button'>Back to profile</button>
            </div>
    </>
    )
}

export default withRouter(AllSkills) 
