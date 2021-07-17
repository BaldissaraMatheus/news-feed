import './Container.css';

export interface ContainerProps {
	children: JSX.Element,
}

export const Container: React.FunctionComponent<ContainerProps> = (props: ContainerProps) => {
	return (
		<main className="container">
			{ props.children }
		</main>
	);
}
 