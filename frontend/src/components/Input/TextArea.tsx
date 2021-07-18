import React from 'react';
import './Input.css';

export interface TextProps {
	label: string,	
	value?: string|number;
	onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}
 
const TextArea: React.FunctionComponent<TextProps> = (props: TextProps) => (
	<div className="input-container">
		<label className="label">{props.label}</label>
		<textarea
			className="input textarea"
			value={props.value}
			onChange={props.onChange}
		/>
	</div>
);
 
export default TextArea;
