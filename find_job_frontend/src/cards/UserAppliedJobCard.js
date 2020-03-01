import React from 'react'
import { withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {addExistingJobToFavorites, removeJobFromFavorites, setViewNote, resetViewNote, setViewToDo, resetViewToDo, setShowShareOptions, resetShowShareOptions, resetFavoriteCheck, resetFromFavoriteJobAndFromAppliedJob} from '../redux/actions'
import applyIcon from '../pictures/applyIcon.png'
import favoriteIcon from '../pictures/favoriteIcon.png'
import shareIcon from '../pictures/shareIcon.png'
import NoteCard from './NoteCard'
import ToDoCard from './ToDoCard'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton, EmailShareButton, FacebookIcon, LinkedinIcon, TwitterIcon, WhatsappIcon, EmailIcon } from 'react-share'

const UserAppliedJobCard = (props) => {

    const {currentAppliedJob, favoriteCheck, notes, viewNote, toDos, viewToDo, showShareOptions} = props

    const handleUnfavoriting = () => {
        removeJobFromFavorites(currentAppliedJob, props)
    }

    const handleFavoriting = () => {
        addExistingJobToFavorites(currentAppliedJob, props)
    }

    const handleView = (event) => {
        if(event.target.value === 'view-notes'){
            setViewNote(props.dispatch)
        }else if(event.target.value === 'hide-notes'){
            resetViewNote(props.dispatch)
        }else if(event.target.value === 'view-todos'){
            setViewToDo(props.dispatch)
        }else if(event.target.value === 'hide-todos'){
            resetViewToDo(props.dispatch)
        }
    }

    const handleBackToAppliedJobs = (event) => {
        resetFavoriteCheck(props.dispatch)
        resetViewNote(props.dispatch)
        resetViewToDo(props.dispatch)
        resetShowShareOptions(props.dispatch)
        props.history.push('/applied-jobs')
    }

    const handleBackToDashboard = (event) => {
        resetFromFavoriteJobAndFromAppliedJob(props.dispatch)
        resetViewNote(props.dispatch)
        resetViewToDo(props.dispatch)
        resetShowShareOptions(props.dispatch)
        props.history.push('/dashboard')
    }

    const handleShare = (event) => {
        if(event.target.name === 'open-share'){
            setShowShareOptions(props.dispatch)
        }else{
            resetShowShareOptions(props.dispatch)
        }
    }

    const jobNotes = notes.filter(note => note.job_id === currentAppliedJob.id)

    const jobToDos = toDos.filter(todo => todo.job_id === currentAppliedJob.id)

    return (
        <div className='job-card-div'>
            <div className='row'>
                 <h4><strong>Job Title: </strong>{currentAppliedJob.job_title}</h4>
            </div>

            <div className='row columned-row' >
                <div className='column job-card-row' >
                    <p><strong>Organization:</strong> {currentAppliedJob.organization_name}</p> 
                </div>
                <div className='column job-card-row'>
                    <p><strong>Location: </strong>{currentAppliedJob.location}</p>
                </div>
            </div>

            <div className='row columned-row' >
                <div className='column job-card-row' >
                    <strong>Min. pay:</strong> ${parseFloat(currentAppliedJob.minimum_pay).toLocaleString()}
                </div>

                <div className='column job-card-row' >
                    <strong>Max. pay:</strong> ${parseFloat(currentAppliedJob.maximum_pay).toLocaleString()}
                </div>

                <div className='column job-card-row' >
                    <strong>Pay period:</strong> {currentAppliedJob.pay_period}
                </div>
            </div><br/>

            <div className='row columned-row'>
                <div className='column job-card-row' >
                    <strong>Job Type:</strong> {currentAppliedJob.job_type}
                </div>
                <div className='column job-card-row' >
                    <strong>Hiring path: </strong> {currentAppliedJob.hiring_path}
                </div>
            </div><br/>

            <div className='row columned-row'>
                <div className='column job-card-row' >
                    <strong>Job posting date:</strong> {currentAppliedJob.job_posting_date}
                </div>
                <div className='column job-card-row' >
                    <strong>Applications close date:</strong> {currentAppliedJob.application_close_date}
                </div>
            </div>

            <div className='row' >
                <p><strong>Schedule:</strong> {currentAppliedJob.schedule}</p>
            </div>

            <div className='row job-card-row'>
                <strong>Summary:</strong>
            </div>
            <div className='row'>
                <p>{currentAppliedJob.employer_strongpoints}</p>
            </div>

            <div className='row job-card-row'>
                <strong>Description:</strong>
            </div>

            <div className='row'>
                <p>{currentAppliedJob.description}</p> 
            </div>
        
            <div className='row job-card-row'>
                <strong>Requirements:</strong>
            </div>
            <div className='row'>
                <p>{currentAppliedJob.requirement}</p>
            </div>
            

            <div className='row columned-row'>
                <div className='column job-card-row' >

                {favoriteCheck? 
                        <button onClick={handleUnfavoriting} className='page-buttons'> <img src={favoriteIcon} height='11vh' alt='already in favorites'/>Job in favorite jobs. Remove from favorites?</button>
                    :
                        <button onClick={handleFavoriting} className='page-buttons'> <img src={favoriteIcon} height='11vh' alt='add to favorites'/>Add to favorites </button>
                }

                </div>

                <div className='column job-card-row' >
                    <button className='page-buttons'> <img src={applyIcon} height='11vh' alt='add to favorites'/>Job already applied to</button>
                </div>

                <div className='column job-card-row' >
                    {showShareOptions ?
                        <>
                        <div className='row'>
                            <button onClick={handleShare} className='page-buttons' name='close-share' >Close share options</button>
                        </div>        
                        <div className='row'>
                            <FacebookShareButton url={currentAppliedJob.url}><FacebookIcon size={25} round /></FacebookShareButton>
                            <LinkedinShareButton url={currentAppliedJob.url} ><LinkedinIcon  size={25} round /> </LinkedinShareButton>
                            <TwitterShareButton url={currentAppliedJob.url} ><TwitterIcon size={25} round /> </TwitterShareButton>
                            <WhatsappShareButton url={currentAppliedJob.url} ><WhatsappIcon size={25} round /> </WhatsappShareButton>
                            <EmailShareButton url={currentAppliedJob.url} ><EmailIcon size={25} round/> </EmailShareButton>
                        </div>                            
                        </>
                        :
                        <button  onClick={handleShare} name='open-share'  className='page-buttons'> <img src={shareIcon} height='11vh' alt='share'/> Share</button> 
                    }                
                </div>
            </div>


            <div className='row columned-row'>
                <div className='column job-card-row'>
                    <button onClick={() => props.history.push('/create-note')} className='page-buttons'> Add Note</button>
                    { viewNote ?
                        <button  onClick={handleView} className='page-buttons' value='hide-notes'> Hide Notes</button>
                        :
                        <button onClick={handleView} className='page-buttons' value='view-notes'> View Notes</button>
                    }

                </div>

                <div className='column job-card-row'>
                    <button onClick={() => props.history.push('/create-todo')}className='page-buttons'> Add ToDo</button>
                    { viewToDo ?
                        <button onClick={handleView} className='page-buttons' value='hide-todos'> Hide ToDos</button>
                        :
                        <button onClick={handleView} className='page-buttons' value='view-todos'> View ToDos</button>
                    }
                </div>

            </div>

            { viewNote ?
            <div className='row columned-row'>
                { jobNotes.length <= 0 ? 
                'This job has no notes yet. Add notes to it'
                :
                jobNotes.map(note => <NoteCard key={note.id} note={note} user_id={props.user_id} token={props.token} dispatch={props.dispatch} push={props.history.push}/>)
                }
            </div>
            :
            null
            }

            { viewToDo ?
            <div className='row columned-row'>
                { jobToDos.length <= 0 ? 
                'This job has no ToDos yet. Add ToDos to it'
                :
                jobToDos.map(todo => <ToDoCard key={todo.id} todo={todo} user_id={props.user_id} token={props.token} dispatch={props.dispatch} push={props.history.push}/>)
                }
            </div>
            :
            null
            }

             <div className='row'>
                <button onClick = {() => window.open(currentAppliedJob.url)} className='page-buttons'>View job on employer website</button>
                <button onClick = {handleBackToAppliedJobs} className='page-buttons'>Back to Applied jobs</button>
                <button onClick={handleBackToDashboard} className='page-buttons'>Back to dashboard</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        token: state.allUserInfo.token,
        user_id: state.allUserInfo.user_id,
        currentAppliedJob: state.allJobInfo.currentAppliedJob,
        notes: state.allNoteInfo.notes,
        viewNote: state.allNoteInfo.viewNote,
        toDos: state.allToDoInfo.toDos,
        viewToDo: state.allToDoInfo.viewToDo,
        showShareOptions: state.allJobInfo.showShareOptions,
        favoriteCheck: state.allJobInfo.favoriteCheck
    }
}

export default connect(mapStateToProps)(withRouter(UserAppliedJobCard))