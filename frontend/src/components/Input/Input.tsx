import React from 'react';
import './Input.css';

export interface InputProps {
	type: string;
	value?: string|number;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	label?: string;
	placeholder?: string;
	noMargin?: boolean;
}
 
const Input: React.FunctionComponent<InputProps> = (props: InputProps) => (
	<div className="input-container">
		{
			props.label
				? <label className="label">{props.label}</label>
				: <></>
		}
		<input
			className={`input ${props.noMargin ? 'no-margin' : ''}`}
			type={props.type || 'text'}
			value={props.value}
			onChange={props.onChange}
			placeholder={props.placeholder || ''}
		/>
	</div>
);

export default Input;
 