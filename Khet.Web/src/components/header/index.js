import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';
import classNames from 'classnames';
export default class Header extends Component {
	render() {
		return (
			<nav class={classNames('navbar', 'is-transparent')} >
				<div class="navbar-brand">
					<a class="navbar-item" href="#">
						<img src="../../assets/images/logo.png" />
					</a>
					<div class="navbar-burger burger" >
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
				<div class="navbar-menu ">
					<div class="navbar-end">
						<Link class="navbar-item" activeClassName={style.active} href="/">Games</Link>
						<Link class="navbar-item" activeClassName={style.active} href="/game">Join</Link>
					</div>
				</div>
			</nav >
		);
	}
}
