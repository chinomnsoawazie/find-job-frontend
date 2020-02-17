import React from 'react'

const CreateButton = (props) => {

    const buttonText = () =>{
        if (props.preference){
            {/*text will be 'Create preference' */}
        }else if (props.certifcation){
            {/*text will be 'Create Certification */}
        }
    }
    return (
        <div>

            {/*dynamically chose the text to show on the button */}
    <button className='side-bar-button'>Create {/*whatever name is where it is being created */}</button>
            
        </div>
    )
}

export default CreateButton
