import React from 'react'
import {connect} from 'react-redux'
import PreferencesCard from '../cards/PreferencesCard'

function AllPreferences(props) {
    const {preferences} = props

    return (
        <div  className='job-card-div'>
            <button onClick={() => props.push('/create-preference')} className='page-buttons'>Create new preference</button>
            <div className='main-container'>
                {preferences.map(preference => <PreferencesCard key={preference.id} dispatch={props.dispatch} preference={preference}/>)}    
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        preferences: state.allPreferenceInfo.preferences
    }
}

export default connect(mapStateToProps)(AllPreferences)