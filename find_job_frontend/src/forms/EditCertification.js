
import React, { Component } from 'react'
import { editCertification } from '../redux/actions'

export class EditCertification extends Component {
    state = {
        newDescription: '',
        newIssuedBy: '',
        newRenewable: '',
        newIssuingDate: '',
        newValidUntil: ''
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let certificationToModify = this.props.currentCertification
            let newCertification = {
                id: certificationToModify.id,
                user_id: certificationToModify.user_id,
                description: this.state.newDescription || certificationToModify.description,
                issued_by: this.state.newIssuedBy || certificationToModify.issued_by,
                renewable: this.state.newRenewable || certificationToModify.renewable,
                issuing_date: this.state.newIssuingDate || certificationToModify.issuing_date,
                valid_until: this.state.newValidUntil || certificationToModify.valid_until
            }
            editCertification(newCertification, this.props)
        
    }

    render() {
        const todaysDate = new Date().toJSON().slice(0,10).replace(/-/g,'-')
        let certification = this.props.currentCertification
        return (
            <div className='forms'>
                <h2><strong>New certification</strong></h2>
                <form onSubmit={this.handleSubmit}>

                    <div className='row'>
                        <label>
                            <strong>Current description: </strong>
                        </label>{certification.description}<br/>
                        <label>
                            <strong>New description: </strong>
                        </label>
                        <input type='text' placeholder='Type new description' name='newDescription' value={this.state.newDescription} onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row'>
                        <label>
                            <strong> Current issued by: </strong>
                        </label>{certification.issued_by}<br/>
                        <label>
                            <strong>New issued by: </strong>
                        </label>
                        <input type='text' placeholder='Issuing organization' name='newIssuedBy' value={this.state.newIssuedBy} onChange={this.handleChange}/><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current issuing date: </strong>
                        </label>{certification.issuing_date}<br/>
                        <label>
                            <strong>New issuing date: </strong>
                        </label>
                        <input type='date' value={this.state.newIssuingDate} name='newIssuingDate' max={todaysDate}  onChange={this.handleChange} /><br/>
                    </div><br/>

                    {certification.renewable ? 
                    <div className='row job-card-row'>
                        <label>
                            <strong>Current expiration date: </strong>
                        </label>{certification.valid_until}<br/>
                        <label>
                            <strong>New expiration date: </strong>
                        </label>
                        <input type='date' value={this.state.newValidUntil} name='newValidUntil'  onChange={this.handleChange} /><br/>
                    </div>
                    : 
                    null
                    }<br/><br/>
                    <input className='page-buttons' type="submit" value="Edit certification" />
                </form>
            </div>
        )
    }
}

export default EditCertification