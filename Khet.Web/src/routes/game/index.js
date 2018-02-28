import { h, Component } from 'preact';
import style from './style.css';
import classNames from 'classnames'
import Tile, { Piece } from './Tile'
import immutable from 'immutable';
import { InitialiseBoard } from './initialise'
import { connect } from 'redux-zero/preact';

import WebsocketClient from '../../framework/WebsocketClient'
import Guid from 'guid';
//const getClientId = () => 'web-client:' + Guid.raw();
const getMessageId = () => 'message-id:' + Guid.raw();

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			message: [],
			isConnected: false,
			table: InitialiseBoard(),
			selected: null
		}
	}

	connect = async () => {
		this.client = new WebsocketClient(this.props.guid, this.props.username)

		try {
			const response = await this.client.connect();
			this.setState({ isConnected: true });
			console.log('connected!', response)
			this.client.onMessageReceived((topic, message) => {
				console.log('received info', message)
			})
		} catch (ex) {
			console.log('error when connecting to IOT ', ex)
		}
	}
	onSend = (message) => {
		this.client.sendMessage({
			username: this.state.username,
			message,
			id: getMessageId()
		})
	}

	componentDidMount() {
		this.connect()
	}


	tileColour(colIndex, rowIndex) {
		let tileColour = "";

		if (colIndex == 0) {
			tileColour = style.red;
		}
		if (colIndex == 9) {
			tileColour = style.white
		}

		if (colIndex == 1 && [0, 7].indexOf(rowIndex) != -1) {
			tileColour = style.white;
		}

		if (colIndex == 8 && [0, 7].indexOf(rowIndex) != -1) {
			tileColour = style.red;
		}
		if (this.state.selected !== null)
			if (this.validMove(this.state.selected[0], this.state.selected[1], colIndex, rowIndex))
				tileColour = style.green;

		return tileColour
	}

	validMove(x, y, col, row) {
		if ((col == x + 0 && row == y - 1)
			|| (col == x + 0 && row == y + 1)
			|| (col == x - 1 && row == y - 1)
			|| (col == x + 1 && row == y)
			|| (col == x && row == y - 1)
			|| (col == x && row == y + 1)
			|| (col == x + 1 && row == y + 1)
			|| (col == x && row == y + 1)
			|| (col == x + 1 && row == y + 1)
			|| (col == x - 1 && row == y + 1)
			|| (col == x - 1 && row == y)
			|| (col == x + 1 && row == y - 1)) {
			return true
		}
	}

	handleClick = (colIndex, rowIndex) => (event) => {
		const tile = this.state.table[rowIndex][colIndex];
		if (tile != null) {
			console.log('select/reselect')
			this.setState({ selected: [colIndex, rowIndex] })
		} else if (this.state.selected != null && this.validMove(this.state.selected[0], this.state.selected[1], colIndex, rowIndex)) {
			console.log(tile)
			const table = [...this.state.table];
			table[rowIndex][colIndex] = this.state.table[this.state.selected[1]][this.state.selected[0]]
			table[this.state.selected[1]][this.state.selected[0]] = null;
			this.setState({ table, selected: null })

			console.log('clicked', this.state.selected)
		}

	}


	render() {
		return (
			<section class="hero is-fullheight">
				<div class="hero-body">
					<div class="container">
						<p class="title is-1">
							Your turn
						</p>
						<p>https://www.flaticon.com/packs/egypt-line-craft?word=sphinx&group_id=1</p>
						<table class={style.table}>
							<thead />
							<tbody>
								{
									this.state.table.map((row, rowIndex) => {
										{/* <img class={classNames(style.piece, piece.player == 0 ? style.friendly : '')} src={Piece[piece.type]} /> */ }
										return (
											<tr>
												{
													row.map((col, colIndex) => {
														const piece = this.state.table[rowIndex][colIndex];

														return (
															<td class={this.tileColour(colIndex, rowIndex)} onClick={this.handleClick(colIndex, rowIndex)}>
																{piece != null &&
																	<Tile player={piece.player} type={piece.type}
																		col={colIndex} row={rowIndex}
																		rotate={piece.rotate} />
																}
															</td>
														)
													})
												}
											</tr>
										)
									})
								}
							</tbody>
						</table>
						<section>
							<div class="field has-addons">
								<div class="control">
									<input class="input" type="text" placeholder="Enter your message..." />
								</div>
								<div class="control">
									<a class="button is-info">
										Post
						  			</a>
								</div>
							</div>
						</section>
					</div>
				</div>
				<footer class="footer">
					<div class="container">
						<div class="content has-text-centered">
							<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
						</div>
					</div>
				</footer>
			</section >

		);
	}
}

const mapToProps = ({ username, loading, guid }) => ({ username, loading, guid });
export default connect(mapToProps, {})(Game)