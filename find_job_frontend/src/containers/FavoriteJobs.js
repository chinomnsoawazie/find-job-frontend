import React from 'react'
import {connect} from 'react-redux'
import FavoritesJobCard from '../cards/FavoritesJobCard'

const FavoriteJobs = (props) => {
    const {userJobs} = props

    const favoriteJobs = userJobs.filter(job => job.favorite_key === true)

    return (
        <div className='job-card-div'>
            <div className='main-container'>
                {favoriteJobs.map(job => <FavoritesJobCard key={job.usaJobs_job_id} job={job}/>)}    
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userJobs: state.allUserInfo.userJobs
    }
}

export default connect(mapStateToProps)(FavoriteJobs)