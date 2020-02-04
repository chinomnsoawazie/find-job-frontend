import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import applyIcon from '../pictures/applyIcon.png'
import favoriteIcon from '../pictures/favoriteIcon.png'
import shareIcon from '../pictures/shareIcon.png'


export class JobCardNav extends Component {

    state = {
        favorite_key: this.props.job.favorite_key
    }

    handleClick = () => {
        console.log('clicked')
    }

    


    handleFavoriting = () => {
        let job = this.props.job
        job.user_id = this.props.user.id
        job.favorite_key = true
        this.setState({favorite_key: !this.state.favorite_key})
        this.props.favoriteAJob(job)
    }

   

    applyButtonText = () => {
        return 'Apply'
    }

    backToSearchButtonText = () => {
        return 'Remove Job'
    }
    render() {
        console.log(this.props.job)
        return (

            <>
                {this.props.loggedIn ? 
                    <div className='row'>
                        {!this.props.job.favorite_key ? 
                        
                        <div className='column job-card-row'>
                            <button onClick={this.handleFavoriting} className='job-card-button'> <img src={favoriteIcon} alt='add to favorites'/> Add to favorites </button>
                        </div>
                    :
                    <div className='column job-card-row'>
                        <button className='job-card-button'> <img src={favoriteIcon} alt='add to favorites'/>Job already in favorites</button>
                    </div>

                    
                    }

                    {!this.props.job.applied_key ? 
                    
                
                        <div className='column job-card-row'>
                            <NavLink to={'/jobs/general_jobs/:id/apply'} >
                                <button  onClick={this.handleClick}   className='job-card-button'> <img src={applyIcon} alt='apply'/> Apply</button> 
                            </NavLink>
                        </div>  
                
                
                :

                <div className='column job-card-row'>
                    <button className='job-card-button'> <img src={favoriteIcon} alt='add to favorites'/>Already applied to this job</button>
                </div>
                
                }
        
                        <div className='column job-card-row'>
                            <button  onClick={this.handleClick}   className='job-card-button'> Notes</button> 
                                <select>
                                    <option value="add">Add</option>
                                    <option value="delete">Delete</option>
                                    <option value="update">Update</option>
                                </select>
                        </div>
        
                        <div className='column job-card-row'>
                            <button  onClick={this.handleClick}   className='job-card-button'> ToDo</button> 
                                <select>
                                    <option value="add">Add</option>
                                    <option value="delete">Delete</option>
                                    <option value="update">Update</option>
                                </select>
                        </div>
        
                        <div className='column job-card-row'>
                            <NavLink to={'/jobs/general_jobs/:id/apply'} >
                                <button  onClick={this.handleClick}   className='job-card-button'> <img src={shareIcon} alt='apply'/> Share</button> 
                            </NavLink>
                        </div> 
                        
                    </div>
    
                    :

                    <div className='row'>
                        <div className='column job-card-row'>
                            <NavLink to={'/jobs/general_jobs/:id/apply'} >
                                <button  onClick={this.handleClick}   className='job-card-button'> <img src={applyIcon} alt='apply'/> Apply</button> 
                            </NavLink>
                        </div>  
                        <div className='column job-card-row'>
                            <NavLink to={'/jobs/general_jobs/:id/apply'} >
                                <button  onClick={this.handleClick}   className='job-card-button'> <img src={shareIcon} alt='apply'/> Share</button> 
                            </NavLink>
                        </div> 
                    </div>
                }
            </>
        )
    }
}

export default JobCardNav