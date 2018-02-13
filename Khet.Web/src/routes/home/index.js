import { h, Component } from 'preact';
import style from './style.css';
import Header from '../../components/header';
import classNames from 'classnames'

export default class Home extends Component {
	render() {
		const bodyClass = classNames('')
		console.log(style)
		return (
			<div>
				<section class={classNames('hero', 'is-fullheight', style.landing)}>
					< div class="hero-head " >
						<Header />
					</div >
					<div class="hero-body">
						<div class="container has-text-centered">
							<h1 class="title is-1 ">
								Khet
						</h1>
							<h2 class="subtitle is-2">
								Laser Chess
						</h2>
						</div>
					</div>
				</section >
				<section class={classNames('hero', 'is-dark', 'is-medium')}>
					<div class="hero-body">
						<div class="container has-text-centered">
							<p class="title is-3 ">
								How To Play
							</p>
						</div>
					</div>
				</section >
				<section class={classNames('hero', 'is-light', 'is-medium')}>
					<div class="hero-body">
						<div class="container ">
							<p class="title is-3 ">
								Join Now!
							</p>
							<div class="field">
								<p class="control has-icons-left">
									<input class="input" type="email" placeholder="Display Name" />
									<span class="icon is-small is-left">
										<i class="fas fa-user"></i>
									</span>
								</p>
							</div>
							<div class="field">
								<p class="control has-icons-left">
									<input class="input" type="email" placeholder="Email" />
									<span class="icon is-small is-left">
										<i class="fas fa-envelope"></i>
									</span>
								</p>
							</div>

							<div class="field">
								<textarea class="textarea" placeholder="Description" />
							</div>
							<div class="field ">
								<div class="control ">
									<button class="button is-link is-fullwidth">Join</button>
								</div>

							</div>
						</div>
					</div>
				</section >
			</div>
		);
	}
}
