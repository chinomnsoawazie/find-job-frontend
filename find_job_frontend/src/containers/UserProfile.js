import React from 'react'
import {connect} from 'react-redux'
import PersonalInfoCard from '../cards/PersonalInfoCard'
import { resetViewPersonalInfo, setViewPersonalInfo, resetViewSkills, setViewSkills, resetViewMemberships, setViewMemberships, setViewEmployments, resetViewEmployments, resetViewEducations, setViewEducations, resetViewCertifications, setViewCertifications, resetAllView } from '../redux/actions'
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

    const handleBackToDashboard = () => {
        resetAllView(props.dispatch)
        props.push('/dashboard')
    }

    return (
        <div className='job-card-div'>
        {viewPersonalInfo ?
        <>
        <button onClick={handleView}  name='hide-personal-info' className='page-buttons'>Hide Personal info</button>
        <PersonalInfoCard dispatch={props.dispatch} push={props.push}/>
        </>
        :
        <button onClick={handleView} name='view-personal-info' className='page-buttons'>View Personal info</button>
        }<br/>

        {viewSkills ?
        <>
        <button onClick={handleView}  name='hide-skills' className='page-buttons'>Hide skills</button>
        <button onClick={() => props.push('/create-skill')} className='page-buttons'>Add skill</button>
        {skills.length < 1 ?
            <p>You currently have no skills. You can add skills using the 'Add skill' button.</p>
            :
            skills.map(skill => <SkillCard key={skill.id} skill={skill} push={props.push} dispatch={props.dispatch}/>)
        }
        </>
        :
        <>
        <button onClick={handleView} name='view-skills' className='page-buttons'>View skills</button>
        <button onClick={() => props.push('/create-skill')} className='page-buttons'>Add skill</button>
        </>
        }<br/>

        {viewMemberships ?
        <>
        <button onClick={handleView}  name='hide-memberships' className='page-buttons'>Hide memberships</button>
        <button onClick={() => props.push('/create-membership')} className='page-buttons'>Add membership</button>
        {memberships.length < 1 ?
            <p>You currently have no memberships. You can add memberships using the 'Add membership' button</p>
            :
            memberships.map(membership => <MembershipCard key={membership.id} membership={membership} push={props.push} dispatch={props.dispatch}/>)
        }
        </>
        :
        <>
        <button onClick={handleView} name='view-memberships' className='page-buttons'>View memberships</button>
        <button onClick={() => props.push('/create-membership')} className='page-buttons'>Add membership</button>
        </>
        }<br/>

        {viewEmployments ?
        <>
        <button onClick={handleView}  name='hide-employments' className='page-buttons'>Hide employments</button>
        <button onClick={() => props.push('/create-employment')} className='page-buttons'>Add employment</button>
        {employments.length < 1 ?
            <p>You currently have no employment history. You can add employments using the 'Add employment' button</p>
            :
            employments.map(employment => <EmploymentCard key={employment.id} employment={employment}  push={props.push} dispatch={props.dispatch}/>)
        }
        </>
        :
        <>
        <button onClick={handleView} name='view-employments' className='page-buttons'>View employments</button>
        <button onClick={() => props.push('/create-employment')} className='page-buttons'>Add employment</button>
        </>
        }<br/>

        {viewEducations ?
        <>
        <button onClick={handleView}  name='hide-educations' className='page-buttons'>Hide educations</button>
        <button onClick={() => props.push('/create-education')} className='page-buttons'>Add education</button>
        {educations.length < 1 ?
            <p>You currently have no education. You can add educations using the 'Add education' button</p>
            :
            educations.map(education => <EducationCard key={education.id} education={education} push={props.push} dispatch={props.dispatch}/>)
        }
        </>
        :
        <>
        <button onClick={handleView} name='view-educations' className='page-buttons'>View educations</button>
        <button onClick={() => props.push('/create-education')} className='page-buttons'>Add education</button>
        </>
        }<br/>

        {viewCertifications ?
        <>
        <button onClick={handleView}  name='hide-certifications' className='page-buttons'>Hide certifications</button>
        <button onClick={() => props.push('/create-certification')} className='page-buttons'>Add certification</button>
        {certifications.length < 1 ?
            <p>You currently have no certification. You can add certifications using the 'Add certification' button</p>
            :
            certifications.map(certification => <CertificationCard key={certification.id} certification={certification} push={props.push} dispatch={props.dispatch}/>)
        }

        </>
        :
        <>
        <button onClick={handleView} name='view-certifications' className='page-buttons'>View certifications</button>
        <button onClick={() => props.push('/create-certification')} className='page-buttons'>Add certification</button>
        </>
        }<br/><br/>

        <button className='page-buttons' onClick={handleBackToDashboard}>Go to dashboard</button>
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