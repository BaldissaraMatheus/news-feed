import './ErrorMessage.css';

export interface ErrorMessageProps {
	msg: string;
}
 
const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = (props: ErrorMessageProps) => props.msg === ''
	? null
	: (<p className="error-msg">{props.msg}</p>);
 
export default ErrorMessage;
