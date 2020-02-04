/* make it such that it */

import React from 'react'

const DeleteButton = (props) => {

    /*HandleDelete function that removes target item,
    transfers control to fxn in the app that does a pessimistic
    redirect i.e does a fetch and renders what view was
    chosen */
    return (
        <div>
            {/*delete button */}
            <button className='side-bar-button'> {props.buttonText}</button>

        </div>
    )
}

export default DeleteButton
