import React, { Component } from 'react'
import { editSkill } from '../redux/actions'

export class EditSkill extends Component {
    state = {
        newDescription: '',
        newProficiencyLevel: '',
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
            let skill = {
                id: this.props.currentSkill.id,
                user_id: this.props.currentSkill.user_id,
                description: this.state.newDescription || this.props.currentSkill.description,
                proficiency_level: this.state.newProficiencyLevel || this.props.currentSkill.proficiency_level,
            }
            editSkill(skill, this.props)
    }

    render() {
        return (
            <div className='forms'>
                 <form onSubmit={this.handleSubmit}>
                    <h2><strong>Edit skill</strong></h2>
                    <div className='row'>
                        <label>
                            <strong>New Description(Old one in box by default): </strong>
                        </label>
                        <textarea className='note' defaultValue={this.props.currentSkill.description} name='newDescription' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row'>
                        <label>
                            <strong>New proficiency level): </strong>
                        </label>
                        <input className='page-buttons' type="number" min={0} max={5} name='newProficiencyLevel' value={this.state.newProficiencyLevel} onChange={this.handleChange} />
                    </div>

                    <input className='page-buttons' type="submit" value="Edit skill" />
                </form>
                <button onClick = {() => this.props.push('/user-profile')} className='page-buttons'>Back to profile</button>
                <button onClick = {() => this.props.push('/dashboard')} className='page-buttons'>Back dashboard</button>

            </div>
        )
    }
}

export default EditSkill