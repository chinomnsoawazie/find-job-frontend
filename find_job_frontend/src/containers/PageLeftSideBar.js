import React from 'react'

const PageLeftSideBar = () => {
    return (
            <div className='left-side-bar'>
            {/*user router sent to routed for each button */}
               <button className='page-buttons'>My favorite jobs</button><br/>
               <button className='page-buttons'>My applied jobs</button><br/>
               <button className='page-buttons'>Update profile</button><br/>
               <button className='page-buttons'>My search preferences</button><br/>
                <ul>
                    <li><button>preference</button></li>
                    <li><button>preference</button></li>
                    <li><button>preference</button></li>
                </ul>
        </div>
    )
}

export default PageLeftSideBar