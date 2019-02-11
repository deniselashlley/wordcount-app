import React from 'react'
import PropTypes from 'prop-types'

const UserInput = ({handleChange, handleSubmit, isInvalid, validationText }) => (
	<form className="userForm" onSubmit={handleSubmit} noValidate>
		<label htmlFor="user-input" className="user-label">Please enter a message</label>
		{isInvalid && (
			<p className="error-message">{validationText} </p>
			)
		}
		<textarea id="user-input" 
					className="user-text-input"
					onChange={handleChange}
					placeholder="enter text here"
					>
		</textarea>
		<button className="main-button">
			See results
		</button>
	</form>
)

UserInput.propTypes = {
	validationText: PropTypes.string,
	isInvalid: PropTypes.bool,
	handleSubmit: PropTypes.func,
	handleChange: PropTypes.func
}

export default UserInput;
