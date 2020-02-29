import React from 'react'
import {withRouter} from 'react-router-dom'
import { setCurrentPreference, searchVetJobsNationwide } from '../redux/actions'
import {connect} from 'react-redux'

const PageLeftSideBar = (props) => {
    const {preferences} = props

    const handlePreferenceClick = (event) => {
        let preference = preferences.find(preference => preference.id.toString() === event.target.value)
        setCurrentPreference(preference, props.dispatch)
        props.history.push('/individual-preference')
    }

    const handleSearchVetJobs = () => {
        alert('N/B: This will get all vet jobs posted within the last 30 days')
        searchVetJobsNationwide(props)
    }

    return (
            <div className='left-side-bar'>
                <button onClick={handleSearchVetJobs} className='page-buttons'>National Vet Jobs</button><br/>
               <button onClick={() => props.history.push('/favorite-jobs')} className='page-buttons'>My favorite jobs</button><br/>
               <button onClick={() => props.history.push('/applied-jobs')} className='page-buttons'>Track my applications</button><br/>
               <button onClick={() => props.history.push('/edit-user')} className='page-buttons'>Update profile</button><br/>
               <button className='page-buttons'>Search preferences</button>
                <ol className='side-bar-list'>
                    {preferences.map(preference => <li key={preference.id}>  <button  onClick={handlePreferenceClick} value={preference.id} className='page-buttons'>{preference.name}</button></li>)}
                </ol>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        myEmail: state.allJobInfo.myEmail,
        USAJobsAPIKey: state.allJobInfo.USAJobsAPIKey
    }
}

export default connect(mapStateToProps)(withRouter(PageLeftSideBar))