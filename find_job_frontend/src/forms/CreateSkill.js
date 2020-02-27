
import React, { Component } from 'react'
import { createSkill } from '../redux/actions'

export class CreateSkill extends Component {
    state = {
        description: '',
        proficiency_level: ''
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if(this.state.proficiency_level){
            let skill = {
                user_id: this.props.user_id,
                description: this.state.description,
                proficiency_level: this.state.proficiency_level,
            }
            createSkill(skill, this.props)

        }else{
            alert('Please select a proficiency')
        }
    }

    render() {
        return (
            <div className='forms'>
                <h2><strong>New Skill</strong></h2>
                <form onSubmit={this.handleSubmit}>

                    <div className='row'>
                        <label>
                            <strong>Description:</strong>
                        </label>
                    </div>
                    <div className='row'>
                        <textarea className='note' placeholder='Type description of the skill here' name='description' value={this.state.description} onChange={this.handleChange} /><br/>
                    </div>

                    <div className='row'>
                        <label>
                            <strong>Proficiency Level: </strong>
                            {'No skill 0 <---------> 5 Highly skilled'}
                        </label>
                    </div>
                    <div className='row'>
                        <input className='page-buttons' type='number' min={0} max={5} name='proficiency_level' value={this.state.proficiency_level} onChange={this.handleChange} />
                    </div>

                    <input className='page-buttons' type="submit" value="Create skill" />
                </form>
            </div>
        )
    }
}

export default CreateSkill