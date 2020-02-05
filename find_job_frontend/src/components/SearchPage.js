import React, { Component } from 'react'
import searchJob from '../pictures/searchJob.png'
import {withRouter} from 'react-router-dom'

export class SearchPage extends Component {


    state ={
        what: '',
        where: ''
    }

    handleChange = (event) =>{
        this.setState({[event.target.name]: event.target.value})
    }


    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state.what)
        console.log(this.props.allJobs)

        if(this.state.what && !this.state.where){
            let filteredJobs = this.props.allJobs.filter(job => job.job_title.toLowerCase().includes(this.state.what.toLowerCase()) || job.company_name.toLowerCase().includes(this.state.what.toLowerCase()) || job.intro.toLowerCase().includes(this.state.what.toLowerCase()) || job.description.toLowerCase().includes(this.state.what.toLowerCase()) || job.duties.toLowerCase().includes(this.state.what.toLowerCase()))
            let distinctJobs = Array.from(new Set(filteredJobs.map(job => job.id)))
            .map(id => {
                return {
                    id: id,
                    user_id: filteredJobs.find(job => job.id === id).user_id,
                    job_title: filteredJobs.find(job => job.id === id).job_title,
                    company_name: filteredJobs.find(job => job.id === id).company_name,
                    country: filteredJobs.find(job => job.id === id).country,
                    state: filteredJobs.find(job => job.id === id).state,
                    city: filteredJobs.find(job => job.id === id).city,
                    zipcode: filteredJobs.find(job => job.id === id).zipcode,
                    pay: filteredJobs.find(job => job.id === id).pay,
                    job_type: filteredJobs.find(job => job.id === id).job_type,
                    intro: filteredJobs.find(job => job.id === id).intro,
                    requirement: filteredJobs.find(job => job.id === id).requirement,
                    employer_strongpoints: filteredJobs.find(job => job.id === id).employer_strongpoints,
                    benefits: filteredJobs.find(job => job.id === id).benefits,
                    education: filteredJobs.find(job => job.id === id).education,
                    schedule: filteredJobs.find(job => job.id === id).schedule,
                    description: filteredJobs.find(job => job.id === id).description,
                    duties: filteredJobs.find(job => job.id === id).duties,
                    url: filteredJobs.find(job => job.id === id).url,
                    industry: filteredJobs.find(job => job.id === id).industry,
                    applied_key: filteredJobs.find(job => job.id === id).applied_key,
                    favorite_key: filteredJobs.find(job => job.id === id).favorite_key,
                    created_at: filteredJobs.find(job => job.id === id).created_at,
                    updated_at: filteredJobs.find(job => job.id === id).updated_at,
                };
            })
            this.props.setJobSearchResults(distinctJobs)
            this.props.history.push('search-jobs-results')
        }else if(!this.state.what && this.state.where){
            let filteredJobs = this.props.allJobs.filter(job =>job.country.toLowerCase().includes(this.state.where.toLowerCase()) || job.state.toLowerCase().includes(this.state.where.toLowerCase()) || job.city.toLowerCase().includes(this.state.where.toLowerCase()) || job.zipcode.toString().includes(this.state.where))
            let distinctJobs = Array.from(new Set(filteredJobs.map(job => job.id)))
            .map(id => {
                return {
                    id: id,
                    user_id: filteredJobs.find(job => job.id === id).user_id,
                    job_title: filteredJobs.find(job => job.id === id).job_title,
                    company_name: filteredJobs.find(job => job.id === id).company_name,
                    country: filteredJobs.find(job => job.id === id).country,
                    state: filteredJobs.find(job => job.id === id).state,
                    city: filteredJobs.find(job => job.id === id).city,
                    zipcode: filteredJobs.find(job => job.id === id).zipcode,
                    pay: filteredJobs.find(job => job.id === id).pay,
                    job_type: filteredJobs.find(job => job.id === id).job_type,
                    intro: filteredJobs.find(job => job.id === id).intro,
                    requirement: filteredJobs.find(job => job.id === id).requirement,
                    employer_strongpoints: filteredJobs.find(job => job.id === id).employer_strongpoints,
                    benefits: filteredJobs.find(job => job.id === id).benefits,
                    education: filteredJobs.find(job => job.id === id).education,
                    schedule: filteredJobs.find(job => job.id === id).schedule,
                    description: filteredJobs.find(job => job.id === id).description,
                    duties: filteredJobs.find(job => job.id === id).duties,
                    url: filteredJobs.find(job => job.id === id).url,
                    industry: filteredJobs.find(job => job.id === id).industry,
                    applied_key: filteredJobs.find(job => job.id === id).applied_key,
                    favorite_key: filteredJobs.find(job => job.id === id).favorite_key,
                    created_at: filteredJobs.find(job => job.id === id).created_at,
                    updated_at: filteredJobs.find(job => job.id === id).updated_at,
                };
            })
            this.props.setJobSearchResults(distinctJobs)
            this.props.history.push('search-jobs-results')
        }else if(this.state.what && this.state.where){
            let filteredByWhatJobs = this.props.allJobs.filter(job => job.job_title.toLowerCase().includes(this.state.what.toLowerCase()) || job.company_name.toLowerCase().includes(this.state.what.toLowerCase()) || job.intro.toLowerCase().includes(this.state.what.toLowerCase()) || job.description.toLowerCase().includes(this.state.what.toLowerCase()) || job.duties.toLowerCase().includes(this.state.what.toLowerCase()))
            let filteredByWhereJobs = this.props.allJobs.filter(job =>job.country.toLowerCase().includes(this.state.where.toLowerCase()) || job.state.toLowerCase().includes(this.state.where.toLowerCase()) || job.city.toLowerCase().includes(this.state.where.toLowerCase()) || job.zipcode.toString().includes(this.state.where))
            let filteredJobs = filteredByWhereJobs.concat(filteredByWhatJobs)
            let distinctJobs = Array.from(new Set(filteredJobs.map(job => job.id)))
            .map(id => {
                return {
                    id: id,
                    user_id: filteredJobs.find(job => job.id === id).user_id,
                    job_title: filteredJobs.find(job => job.id === id).job_title,
                    company_name: filteredJobs.find(job => job.id === id).company_name,
                    country: filteredJobs.find(job => job.id === id).country,
                    state: filteredJobs.find(job => job.id === id).state,
                    city: filteredJobs.find(job => job.id === id).city,
                    zipcode: filteredJobs.find(job => job.id === id).zipcode,
                    pay: filteredJobs.find(job => job.id === id).pay,
                    job_type: filteredJobs.find(job => job.id === id).job_type,
                    intro: filteredJobs.find(job => job.id === id).intro,
                    requirement: filteredJobs.find(job => job.id === id).requirement,
                    employer_strongpoints: filteredJobs.find(job => job.id === id).employer_strongpoints,
                    benefits: filteredJobs.find(job => job.id === id).benefits,
                    education: filteredJobs.find(job => job.id === id).education,
                    schedule: filteredJobs.find(job => job.id === id).schedule,
                    description: filteredJobs.find(job => job.id === id).description,
                    duties: filteredJobs.find(job => job.id === id).duties,
                    url: filteredJobs.find(job => job.id === id).url,
                    industry: filteredJobs.find(job => job.id === id).industry,
                    applied_key: filteredJobs.find(job => job.id === id).applied_key,
                    favorite_key: filteredJobs.find(job => job.id === id).favorite_key,
                    created_at: filteredJobs.find(job => job.id === id).created_at,
                    updated_at: filteredJobs.find(job => job.id === id).updated_at,
                };
            })
            this.props.setJobSearchResults(distinctJobs)
            this.props.history.push('search-jobs-results')
        }else{
            let distinctJobs = []
            this.props.setJobSearchResults(distinctJobs)
            this.props.history.push('search-jobs-results')
        }

        // console.log(distinctJobs)
        // console.log(filteredJobs)
        // let distinctJobs = Array.from(new Set(filteredJobs.map(job => job.id)))
        //                     .map(id => {
        //                         return {
        //                             id: id,
        //                             user_id: filteredJobs.find(job => job.id === id).user_id,
        //                             job_title: filteredJobs.find(job => job.id === id).job_title,
        //                             company_name: filteredJobs.find(job => job.id === id).company_name,
        //                             country: filteredJobs.find(job => job.id === id).country,
        //                             state: filteredJobs.find(job => job.id === id).state,
        //                             city: filteredJobs.find(job => job.id === id).city,
        //                             zipcode: filteredJobs.find(job => job.id === id).zipcode,
        //                             pay: filteredJobs.find(job => job.id === id).pay,
        //                             job_type: filteredJobs.find(job => job.id === id).job_type,
        //                             intro: filteredJobs.find(job => job.id === id).intro,
        //                             requirement: filteredJobs.find(job => job.id === id).requirement,
        //                             employer_strongpoints: filteredJobs.find(job => job.id === id).employer_strongpoints,
        //                             benefits: filteredJobs.find(job => job.id === id).benefits,
        //                             education: filteredJobs.find(job => job.id === id).education,
        //                             schedule: filteredJobs.find(job => job.id === id).schedule,
        //                             description: filteredJobs.find(job => job.id === id).description,
        //                             duties: filteredJobs.find(job => job.id === id).duties,
        //                             url: filteredJobs.find(job => job.id === id).url,
        //                             industry: filteredJobs.find(job => job.id === id).industry,
        //                             applied_key: filteredJobs.find(job => job.id === id).applied_key,
        //                             favorite_key: filteredJobs.find(job => job.id === id).favorite_key,
        //                             created_at: filteredJobs.find(job => job.id === id).created_at,
        //                             updated_at: filteredJobs.find(job => job.id === id).updated_at,
        //                         };
        //                     })
        //                     this.props.setJobSearchResults(distinctJobs)
        //                     this.props.history.push('search-jobs-results')
      
    }


    render() {

        return (
            <div className='search-pg'>
                <form onSubmit={this.handleSubmit}>

                   <div className='search-pg-box'>
                       <div className='search-pg-input-wrapper'>
                            <label>
                                <strong>What</strong>
                            </label>
                            <p>job title, keywords or company</p>
                       </div>
                    </div>

                   <div className='search-pg-box'>
                       <div className='search-pg-input-wrapper'>
                            <input maxLength='100'  type="text" name='what' value={this.state.what} onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className='search-pg-box'>
                       <div className='search-pg-input-wrapper'>
                       <label>
                            <strong>Where</strong>
                        </label>
                        <p>city, state, or zip code</p>
                       </div>
                    </div>

                   <div className='search-pg-box'>
                       <div className='search-pg-input-wrapper'>
                            <input maxLength='50'type='text'   name='where' value={this.state.where} onChange={this.handleChange} />
                        </div>
                    </div>
                        <button  className='login-buttons' type='submit' value='login'> <img src={searchJob} height='20' width='20'  alt="search"/>Find jobs</button>
                </form>
            </div>
        )
    }
}

export default withRouter(SearchPage)
