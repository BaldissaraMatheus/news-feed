import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export interface HeaderProps {}
 
export const Header: React.FunctionComponent<HeaderProps> = (props) => {
	return (
		<header className="header">
			<nav className="navbar">
				<div className="navbar__logo">
					<Link to="/" className="navbar__logo-link">
						Notícias Rio
					</Link>
				</div>
				<ul className="navbar__menu">
					<li className="navbar__menu-item">
						<Link to="/login" className="navbar__menu-item-link">
							Entrar
						</Link>
					</li>
					<li className="navbar__menu-item">
						<Link to="/register" className="navbar__menu-item-link">
							Cadastrar
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
 