import { h, Component } from 'preact';
import style from './style.css';
import Header from '../../components/header';
import classNames from 'classnames'
import linkState from 'linkstate';
import axios from 'axios'

const BASE_URL = "http://localhost:3000"

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(event) {
		console.log(this.state)
		const body = {
			name: this.state.name,
			email: this.state.email
		}
		const user = axios.post(`${BASE_URL}/users`, body).then(
			response => {
				console.log(response.data)
				const users = axios.get(`${BASE_URL}/users`).then(response => {
					console.log(response.data)
				})

			}
		)

	}

	render({ }, { name, email }) {
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
								<input class="input" onInput={linkState(this, 'name')} placeholder="Display Name" />
							</div>
							<div class="field">
								<input class="input" onInput={linkState(this, 'email')} placeholder="Email" />
							</div>
							<div class="field">
								<textarea class="textarea" placeholder="Description" />
							</div>
							<div class="field ">
								<div class="control ">
									<button class="button is-link is-fullwidth" onClick={this.handleClick}>Join</button>
								</div>

							</div>
						</div>
					</div>
				</section >
			</div>
		);
	}
}
