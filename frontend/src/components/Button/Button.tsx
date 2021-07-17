import './Button.css';

export interface ButtonProps {
	text: string|number;	
}
 
export const Button: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => {
	return (
		<button className="button">
			{props.text}
		</button>
	);
}
 