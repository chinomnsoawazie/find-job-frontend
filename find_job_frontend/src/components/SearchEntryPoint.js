import React from 'react'

const SearchEntryPoint = (props) => {
    const{push} = props
    return (
        <div className='entry-page'>
            <strong><p>Select a search method</p></strong>
            <div className='row'>
                 <button onClick={() => push('/search-by-tp')} className='button'> Job title and pay range </button>
            </div><br/>

            <div className='row'>
                <button onClick={() => push('/search-by-sz')} className='button'> Job title and company/organization </button><br/>
            </div><br/>

            <div className='row'>
                <button onClick={() => push('/search-by-z')} className='button'> Job title </button><br/>
            </div><br/>

            <div className='row'>
                <button onClick={() => push('/search-by-cs')} className='button'> Company/organization </button><br/>
            </div><br/>


            <div className='row'>
                <button onClick={() => push('/search-by-current-location')} className='button'> Location</button>
            </div><br/>

            <div className='row'>
                <button onClick={() => push('/search-by-current-location')} className='button'> Job title and job type</button>
            </div>

            
        </div>
    )
}

export default SearchEntryPoint