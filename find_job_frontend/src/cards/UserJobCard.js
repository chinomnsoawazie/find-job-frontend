import React from 'react'
import { withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {applyToExistingJob, removeJobFromFavorites, setViewNote, resetViewNote, setViewToDo, resetViewToDo, setShowShareOptions, resetShowShareOptions} from '../redux/actions'
import applyIcon from '../pictures/applyIcon.png'
import favoriteIcon from '../pictures/favoriteIcon.png'
import shareIcon from '../pictures/shareIcon.png'
import NoteCard from './NoteCard'
import ToDoCard from './ToDoCard'
import { FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, EmailShareButton, EmailIcon } from 'react-share'

const UserJobCard = (props) => {
    const {currentFavoriteJob, appliedCheck, notes, viewNote, toDos, viewToDo, fromFavoriteJobs, showShareOptions} = props

    const handleUserApply = () => {
        applyToExistingJob(currentFavoriteJob, props)
    }

    const handleUnfavoriting = () => {
        removeJobFromFavorites(currentFavoriteJob, props)
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

    const handleBackToFavoriteJobs = (event) => {
        resetViewNote(props.dispatch)
        resetViewToDo(props.dispatch)
        resetShowShareOptions(props.dispatch)
        props.history.push('/favorite-jobs')
    }

    const handleBackToDashboard = (event) => {
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

    const jobNotes = notes.filter(note => note.job_id === currentFavoriteJob.id)

    const jobToDos = toDos.filter(todo => todo.job_id === currentFavoriteJob.id)


    return (
        <div className='job-card-div'>
            <div className='row'>
                 <h4><strong>Job Title: </strong>{currentFavoriteJob.job_title}</h4>
            </div>

            <div className='row columned-row' >
                <div className='column job-card-row' >
                    <p><strong>Organization:</strong> {currentFavoriteJob.organization_name}</p> 
                </div>
                <div className='column job-card-row'>
                    <p><strong>Location: </strong>{currentFavoriteJob.location}</p>
                </div>
            </div>

            <div className='row columned-row' >
                <div className='column job-card-row' > 
                    <strong>Min. pay:</strong> ${parseFloat(currentFavoriteJob.minimum_pay).toLocaleString()}
                </div>

                <div className='column job-card-row' >
                    <strong>Max. pay:</strong> ${parseFloat(currentFavoriteJob.maximum_pay).toLocaleString()}
                </div>

                <div className='column job-card-row' >
                    <strong>Pay period:</strong> {currentFavoriteJob.pay_period}
                </div>
            </div><br/>

            <div className='row columned-row'>
                <div className='column job-card-row' >
                    <strong>Job Type:</strong> {currentFavoriteJob.job_type}
                </div>
                <div className='column job-card-row' >
                    <strong>Hiring path: </strong> {currentFavoriteJob.hiring_path}
                </div>
            </div><br/>

            <div className='row columned-row'>
                <div className='column job-card-row' >
                    <strong>Job posting date:</strong> {currentFavoriteJob.job_posting_date}
                </div>
                <div className='column job-card-row' >
                    <strong>Applications close date:</strong> {currentFavoriteJob.application_close_date}
                </div>
            </div>

            <div className='row' >
                <p><strong>Schedule:</strong> {currentFavoriteJob.schedule}</p>
            </div>

            <div className='row job-card-row'>
                <strong>Summary:</strong>
            </div>
            <div className='row'>
                <p>{currentFavoriteJob.employer_strongpoints}</p>
            </div>

            <div className='row job-card-row'>
                <strong>Description:</strong>
            </div>

            <div className='row'>
                <p>{currentFavoriteJob.description}</p> 
            </div>
        
            <div className='row job-card-row'>
                <strong>Requirements:</strong>
            </div>
            <div className='row'>
                <p>{currentFavoriteJob.requirement}</p>
            </div>
            

            <div className='row columned-row'>
                <div className='column job-card-row' >
                    <button onClick={handleUnfavoriting} className='page-buttons'> <img src={favoriteIcon} height='11vh' alt='already in favorites'/>Remove from favorites</button>
                </div>

                <div className='column job-card-row' >
                {currentFavoriteJob.applied_key ? 
                    <button className='page-buttons'> <img src={applyIcon} height='11vh' alt='add to favorites'/>Job already applied to</button>
                    :
                    <button  onClick={handleUserApply}   className='page-buttons'> <img src={applyIcon} height='11vh' alt='apply'/> Apply</button> 
                }
                </div>

                {showShareOptions ?
                            <>
                           <div className='row'>
                                <button onClick={handleShare} className='page-buttons' name='close-share' >Close share options</button>
                            </div>        
                            <div className='row'>
                                <FacebookShareButton url={currentFavoriteJob.url}><FacebookIcon size={25} round /></FacebookShareButton>
                                <LinkedinShareButton url={currentFavoriteJob.url} ><LinkedinIcon size={25} round /> </LinkedinShareButton>
                                <TwitterShareButton url={currentFavoriteJob.url} ><TwitterIcon size={25} round /> </TwitterShareButton>
                                <WhatsappShareButton url={currentFavoriteJob.url} ><WhatsappIcon size={25} round /> </WhatsappShareButton>
                                <EmailShareButton url={currentFavoriteJob.url} ><EmailIcon size={25} round/> </EmailShareButton>
                            </div>                            
                            </>
                            :
                            <button  onClick={handleShare} name='open-share'  className='page-buttons'> <img src={shareIcon} height='11vh' alt='share'/> Share</button> 
                        }
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
                jobNotes.map(note => <NoteCard key={note.id} fromFavoriteJobs={fromFavoriteJobs} note={note} user_id={props.user_id} token={props.token} dispatch={props.dispatch} push={props.history.push}/>)
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
                jobToDos.map(todo => <ToDoCard key={todo.id} todo={todo} fromFavoriteJobs={fromFavoriteJobs} user_id={props.user_id} token={props.token} dispatch={props.dispatch} push={props.history.push}/>)
                }
            </div>
            :
            null
            }

             <div className='row'>
                <button onClick = {() => window.open(currentFavoriteJob.url)} className='page-buttons'>View job on employer website</button>
                <button onClick = {handleBackToFavoriteJobs} className='page-buttons'>Back to Favorite jobs</button>
                <button onClick={handleBackToDashboard} className='page-buttons'>Back to dashboard</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        token: state.allUserInfo.token,
        user_id: state.allUserInfo.user_id,
        currentFavoriteJob: state.allJobInfo.currentFavoriteJob,
        notes: state.allNoteInfo.notes,
        viewNote: state.allNoteInfo.viewNote,
        toDos: state.allToDoInfo.toDos,
        viewToDo: state.allToDoInfo.viewToDo,
        showShareOptions: state.allJobInfo.showShareOptions,
    }
}

export default connect(mapStateToProps)(withRouter(UserJobCard))