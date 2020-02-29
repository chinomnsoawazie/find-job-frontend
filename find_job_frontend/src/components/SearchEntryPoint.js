import React from 'react'

const SearchEntryPoint = (props) => {
    const{push} = props
    return (
        <div className='entry-page'>
            <strong><p>Select a search method</p></strong>
            <div className='row'>
                 <button onClick={() => push('/search-by-tp')} className='page-buttons'> Job title, minimum pay & city</button>
            </div><br/>

            <div className='row'>
                <button onClick={() => push('/search-by-vet100')} className='page-buttons'> Get nearby Vet Jobs</button><br/>
            </div><br/>

            <div className='row'>
                <button onClick={() => push('/search-by-vetl')} className='page-buttons'> Vet jobs by location</button><br/>
            </div><br/>

            <div className='row'>
                <button onClick={() => push('/search-by-tcs')} className='page-buttons'> Job title and location</button><br/>
            </div><br/>

            <div className='row'>
                <button onClick={() => push('/search-by-kl')} className='page-buttons'> Key words and Location</button>
            </div><br/>

            <div className='row'>
                <button onClick={() => push('/search-by-general-nearby')} className='page-buttons'> Get nearby jobs</button>
            </div>
        </div>
    )
}

export default SearchEntryPoint