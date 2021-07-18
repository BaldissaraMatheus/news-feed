import React from 'react';
import './Input.css';

export interface InputProps {
	label: string;
	type: string;
	value?: string|number;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
 
export const Input: React.FunctionComponent<InputProps> = (props: InputProps) => (
	<div className="input-container">
		<label className="label">{props.label}</label>
		<input
			className="input"
			type={props.type || 'text'}
			value={props.value}
			onChange={props.onChange}
		/>
	</div>
);
 