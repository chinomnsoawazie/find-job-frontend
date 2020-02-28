import React from 'react'
import {connect} from 'react-redux'
import FavoritesJobCard from '../cards/FavoritesJobCard'

const FavoriteJobs = (props) => {
    const {userJobs} = props

    const favoriteJobs = userJobs.filter(job => job.favorite_key === true)

    return (
        <div className='job-card-div'>
            <div className='main-container'>
                {favoriteJobs.length < 1 ?
                    <>
                    <p>You have no favorite jobs yet. Run a search, favorite jobs and they will appear here</p><br/>
                    <button className='page-buttons' onClick={() => props.push('/dashboard')}>Back to dashboard</button>
                    </>
                    :
                    favoriteJobs.map(job => <FavoritesJobCard key={job.usaJobs_job_id} job={job}/>)   
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userJobs: state.allJobInfo.userJobs
    }
}

export default connect(mapStateToProps)(FavoriteJobs)