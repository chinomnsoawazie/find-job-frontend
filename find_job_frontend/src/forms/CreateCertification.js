
import React, { Component } from 'react'
import { createCertification } from '../redux/actions'

export class CreateCertification extends Component {
    state = {
        description: '',
        issued_by: '',
        renewable: '',
        issuing_date: '',
        valid_until: ''
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        
            let certification = {
                user_id: this.props.user_id,
                description: this.state.description,
                issued_by: this.state.issued_by,
                renewable: this.state.renewable,
                issuing_date: this.state.issuing_date,
                valid_until: this.state.valid_until
            }
             createCertification(certification, this.props)
    }

    render() {
        const todaysDate = new Date().toJSON().slice(0,10).replace(/-/g,'-')
        return (
            <div className='forms'>
                <h2><strong>New certification</strong></h2>
                <form onSubmit={this.handleSubmit}>

                    <div className='row'>
                        <label>
                            <strong>Description: </strong>
                        </label>
                        <input type='text' placeholder='Type in description' name='description' value={this.state.description} onChange={this.handleChange} required /><br/>
                    </div><br/>

                    <div className='row'>
                        <label>
                            <strong>Issued by: </strong>
                        </label>
                        <input type='text' placeholder='Issuing organization' name='issued_by' value={this.state.issued_by} onChange={this.handleChange} required /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Issuing date: </strong>
                        </label>
                        <input type='date' value={this.state.issuing_date} name='issuing_date' max={todaysDate}  onChange={this.handleChange} required /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Expires?: </strong>
                        </label>
                        <select onChange={this.handleChange} name='renewable' required >
                            <option defaultValue >Select</option>
                            <option value={false} >No</option>
                            <option value={true}>Yes</option>
                        </select>
                    </div><br/>

                    {this.state.renewable === 'true' ?
                    <div className='row job-card-row'>
                        <label>
                            <strong>Expiration date: </strong>
                        </label>
                        <input type='date' value={this.state.valid_until} name='valid_until'  onChange={this.handleChange} /><br/>
                    </div>
                    :
                    null
                    }<br/><br/>

                    <input className='page-buttons' type="submit" value="Create certification" />
                </form>
            </div>
        )
    }
}

export default CreateCertification