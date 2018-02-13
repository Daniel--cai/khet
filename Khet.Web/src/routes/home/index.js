import { h, Component } from 'preact';
import style from './style';
import Header from '../../components/header';
import classNames from 'classnames'

export default class Home extends Component {
	render() {
		const bodyClass = classNames('')
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
								Subtitle
						</h2>
						</div>
					</div>
				</section >
				<section class={classNames('hero', 'is-dark', 'is-medium')}>
					<div class="hero-body">
						<div class="container has-text-centered">
							<p class="title is-3 ">
								Contact Us
							</p>
							<div class="field has-addons">
								<p class="control has-icons-left has-icons-right">
									<input class="input" type="email" placeholder="Email" />
									<span class="icon is-small is-left">
										<i class="fas fa-envelope"></i>
									</span>
									<span class="icon is-small is-right">
										<i class="fas fa-check"></i>
									</span>
								</p>
								<div class="control">
									<a class="button is-info">
										Search
									</a>
								</div>
							</div>
						</div>
					</div>
				</section >
			</div>
		);
	}
}
