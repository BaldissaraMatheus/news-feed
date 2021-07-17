import React, { useState } from 'react';
import './Input.css';

export interface InputProps {
	label: string;
	type: string;
}
 
export const Input: React.FunctionComponent<InputProps> = (props: InputProps) => {
	const [inputValue, setInputValue] = useState('');

	return (
		<div className="input-container">
			<label className="label">{props.label}</label>
			<input
				className="input"
				type={props.type || 'text'}
				value={inputValue}
				onChange={event => setInputValue(event.target.value)}
			/>
		</div>
	);
}
 