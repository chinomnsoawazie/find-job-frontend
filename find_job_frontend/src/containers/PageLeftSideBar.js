import React from 'react'
import {withRouter} from 'react-router-dom'
import { setCurrentPreference } from '../redux/actions'

const PageLeftSideBar = (props) => {
    const {preferences} = props

    const handlePreferenceClick = (event) => {
        let preference = preferences.find(preference => preference.id.toString() === event.target.value)
        setCurrentPreference(preference, props.dispatch)
        props.history.push('/individual-preference')
    }
    return (
            <div className='left-side-bar'>
            {/*user router sent to routed for each button */}
               <button onClick={() => props.history.push('/favorite-jobs')} className='page-buttons'>My favorite jobs</button><br/>
               <button onClick={() => props.history.push('/applied-jobs')} className='page-buttons'>My applied jobs</button><br/>
               <button className='page-buttons'>Update profile</button><br/>
               <button className='page-buttons'>Search preferences</button>
                <ol className='side-bar-list'>
                    {preferences.map(preference => <li key={preference.id}>  <button  onClick={handlePreferenceClick} value={preference.id} className='page-buttons'>{preference.name}</button></li>)}
                </ol>
        </div>
    )
}

export default withRouter(PageLeftSideBar)