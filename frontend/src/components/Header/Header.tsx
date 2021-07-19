import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

interface ILink {
	title: string;
	link: string;
	danger?: boolean;
}

export interface HeaderProps {
	navbarItems: ILink[];
}

function buildNavbarItems(navbarLinks: ILink[]) {
	return navbarLinks.map((item, index) => (
		<li key={index} className="navbar__menu-item">
			<Link
				to={item.link}
				className={`navbar__menu-item-link ${item.danger ? 'navbar__menu-item-link-danger': ''}`}
			>
				{ item.title }
			</Link>
		</li>
	));
}

const Header: React.FunctionComponent<HeaderProps> = (props: HeaderProps) => (
	<header className="header">
		<nav className="navbar">
			<div className="navbar__logo">
				<Link to="/" className="navbar__logo-link">
					Notícias Rio
				</Link>
			</div>
			<ul className="navbar__menu">
				{ buildNavbarItems(props.navbarItems) }
			</ul>
		</nav>
	</header>
);

export default Header;
