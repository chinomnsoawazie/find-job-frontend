import React from 'react'
import {connect} from 'react-redux'
import PersonalInfoCard from '../cards/PersonalInfoCard'
import { resetViewPersonalInfo, setViewPersonalInfo, resetViewSkills, setViewSkills, resetViewMemberships, setViewMemberships, setViewEmployments, resetViewEmployments, resetViewEducations, setViewEducations, resetViewCertifications, setViewCertifications } from '../redux/actions'
import SkillCard from '../cards/SkillCard'
import MembershipCard from '../cards/MembershipCard'
import EmploymentCard from '../cards/EmploymentCard'
import EducationCard from '../cards/EducationCard'
import CertificationCard from '../cards/CertificationCard'

const UserProfile = (props) => {
    const {viewPersonalInfo, skills, viewSkills, viewMemberships, memberships,viewEmployments, employments, viewEducations, educations, viewCertifications, certifications} = props


    const handleView = (event) => {
        if(event.target.name === 'hide-personal-info'){
            resetViewPersonalInfo(props.dispatch)
        }else if(event.target.name === 'view-personal-info'){
            setViewPersonalInfo(props.dispatch)
        }else if(event.target.name === 'hide-skills'){
            resetViewSkills(props.dispatch)
        }else if(event.target.name === 'view-skills'){
            setViewSkills(props.dispatch)
        }else if(event.target.name === 'hide-memberships'){
            resetViewMemberships(props.dispatch)
        }else if(event.target.name === 'view-memberships'){
            setViewMemberships(props.dispatch)
        }else if(event.target.name === 'hide-employments'){
            resetViewEmployments(props.dispatch)
        }else if(event.target.name === 'view-employments'){
            setViewEmployments(props.dispatch)
        }else if(event.target.name === 'hide-educations'){
            resetViewEducations(props.dispatch)
        }else if(event.target.name === 'view-educations'){
            setViewEducations(props.dispatch)
        }else if(event.target.name === 'hide-certifications'){
            resetViewCertifications(props.dispatch)
        }else if(event.target.name === 'view-certifications'){
            setViewCertifications(props.dispatch)
        }

    }

    console.log('view personal info', viewPersonalInfo, 'view skills', viewSkills)

    return (
        <div className='job-card-div'>
        {viewPersonalInfo ?
        <>
        <button onClick={handleView}  name='hide-personal-info' className='page-buttons'>Hide Personal info</button>
        <PersonalInfoCard />
        </>
        :
        <button onClick={handleView} name='view-personal-info' className='page-buttons'>View Personal info</button>
        }<br/>

        {viewSkills ?
        <>
        <button onClick={handleView}  name='hide-skills' className='page-buttons'>Hide skills</button>
        {skills.map(skill => <SkillCard key={skill.id} skill={skill}/>)}
        </>
        :
        <button onClick={handleView} name='view-skills' className='page-buttons'>View skills</button>
        }<br/>

        {viewMemberships ?
        <>
        <button onClick={handleView}  name='hide-memberships' className='page-buttons'>Hide memberships</button>
        {memberships.map(membership => <MembershipCard key={membership.id} membership={membership}/>)}
        </>
        :
        <button onClick={handleView} name='view-memberships' className='page-buttons'>View memberships</button>
        }<br/>

        {viewEmployments ?
        <>
        <button onClick={handleView}  name='hide-employments' className='page-buttons'>Hide employments</button>
        {employments.map(employment => <EmploymentCard key={employment.id} employment={employment}/>)}
        </>
        :
        <button onClick={handleView} name='view-employments' className='page-buttons'>View employments</button>
        }<br/>

        {viewEducations ?
        <>
        <button onClick={handleView}  name='hide-educations' className='page-buttons'>Hide educations</button>
        {educations.map(education => <EducationCard key={education.id} education={education}/>)}
        </>
        :
        <button onClick={handleView} name='view-educations' className='page-buttons'>View educations</button>
        }<br/>

        {viewCertifications ?
        <>
        <button onClick={handleView}  name='hide-certifications' className='page-buttons'>Hide certifications</button>
        {certifications.map(certification => <CertificationCard key={certification.id} certification={certification}/>)}
        </>
        :
        <button onClick={handleView} name='view-certifications' className='page-buttons'>View certifications</button>
        }<br/>

        <button className='page-buttons' onClick={() => props.push('/dashboard')}>Go to dashboard</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        viewPersonalInfo: state.allUserInfo.viewPersonalInfo,
        skills: state.allSkillInfo.skills,
        viewSkills: state.allSkillInfo.viewSkills,
        memberships: state.allMembershipInfo.memberships,
        viewMemberships: state.allMembershipInfo.viewMemberships,
        employments: state.allEmploymentInfo.employments,
        viewEmployments: state.allEmploymentInfo.viewEmployments,
        educations: state.allEducationInfo.educations,
        viewEducations: state.allEducationInfo.viewEducations,
        certifications: state.allCertificationInfo.certifications,
        viewCertifications: state.allCertificationInfo.viewCertifications
    }
}

export default connect(mapStateToProps)(UserProfile)
