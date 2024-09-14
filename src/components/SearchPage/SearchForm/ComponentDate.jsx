import React, { useState } from "react";
import validator from 'validator';
import './SearchForm.css';

const ComponentDate = () => {

	const [errorMessage, setErrorMessage] = useState('')

	const validateDate = (value) => {

		if (validator.isDate(value)) {
			setErrorMessage('Корректная дата:)')
		} else {
			setErrorMessage('Введите дату!')
		}
	}

	return (
		<div style={{

		}}>
			<pre>
				<input className="field-input2" type="text" placeholder="гггг/мм/дд"
					onChange={(e) => validateDate(e.target.value)}></input> <br />
				<span style={{
					fontWeight: 'bold',
					color: 'red',
				}}>{errorMessage}</span>
			</pre>
		</div >
	);
}

export default ComponentDate
