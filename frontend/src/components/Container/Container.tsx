import './Container.css';

export interface ContainerProps {
	children: JSX.Element,
}

const Container: React.FunctionComponent<ContainerProps> = (props: ContainerProps) => {
	return (
		<main className="container">
			{ props.children }
		</main>
	);
}
 
export default Container;
