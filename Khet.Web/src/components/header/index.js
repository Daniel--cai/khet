import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class Header extends Component {
	render() {
		return (
			// <header class={style.header}>
			// 	
			// 	<nav>
			// 		<Link activeClassName={style.active} href="/">Home</Link>
			// 		<Link activeClassName={style.active} href="/game">Join</Link>
			// 	</nav>
			// </header>
			<nav class="navbar is-light" role="navigation" aria-label="main navigation">
				<div class="navbar-brand">
					<a class="navbar-item" href="#">
						<img src="http://wiki.karstenrutledge.com/images/3/3c/Khet_Logo_384.png" />
					</a>
					<div class="navbar-dropdown is-right">

					</div>
				</div>
			</nav>
		);
	}
}
