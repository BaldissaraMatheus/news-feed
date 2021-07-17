import React, { useState } from 'react';
import './Input.css';

export interface TextProps {
	label: string,	
}
 
export const TextArea: React.FunctionComponent<TextProps> = (props: TextProps) => {
	const [textAreaValue, setTextAreaValue] = useState('');

	return (
		<div className="input-container">
			<label className="label">{props.label}</label>
			<textarea
				className="input input--textarea"
				value={textAreaValue}
				onChange={event => setTextAreaValue(event.target.value)}
			/>
		</div>
	);
}
 