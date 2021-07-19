import './Button.css';

export interface ButtonProps {
	text: string|number;	
	danger?: boolean
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
 
const Button: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => (
	<button onClick={props.onClick} className={`button ${props.danger ? 'button--danger' : ''}`}>
		{props.text}
	</button>
);
 
export default Button;