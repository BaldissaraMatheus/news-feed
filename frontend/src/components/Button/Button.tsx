import './Button.css';

export interface ButtonProps {
	text: string|number;	
}
 
const Button: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => (
	<button className="button">
		{props.text}
	</button>
);
 
export default Button;