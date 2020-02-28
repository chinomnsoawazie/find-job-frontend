import React from 'react'

const SearchEntryPoint = (props) => {
    const{push} = props
    return (
        <div className='entry-page'>
            <strong><p>Select a search method</p></strong>
            <div className='row'>
                 <button onClick={() => push('/search-by-tp')} className='page-buttons'> Job title and pay range </button>
            </div><br/>

            <div className='row'>
                <button onClick={() => push('/search-by-sz')} className='page-buttons'> Job title and company/organization </button><br/>
            </div><br/>

            <div className='row'>
                <button onClick={() => push('/search-by-vet100')} className='page-buttons'> Nearby Vet Jobs</button><br/>
            </div><br/>

            <div className='row'>
                <button onClick={() => push('/search-by-z')} className='page-buttons'> Vet jobs by cities</button><br/>
            </div><br/>

            <div className='row'>
                <button onClick={() => push('/search-by-z')} className='page-buttons'> Vet jobs by states </button><br/>
            </div><br/>

            <div className='row'>
                <button onClick={() => push('/search-by-z')} className='page-buttons'> Job title </button><br/>
            </div><br/>

            <div className='row'>
                <button onClick={() => push('/search-by-cs')} className='page-buttons'> Company/organization </button><br/>
            </div><br/>


            <div className='row'>
                <button onClick={() => push('/search-by-current-location')} className='page-buttons'> Location</button>
            </div><br/>

            <div className='row'>
                <button onClick={() => push('/search-by-current-location')} className='page-buttons'> Job title and job type</button>
            </div>
        </div>
    )
}

export default SearchEntryPoint