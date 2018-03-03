import { h, Component } from 'preact';
import style from './style.css';
import classNames from 'classnames'
import Tile, { Piece } from './Tile'
import immutable from 'immutable';
import { InitialiseBoard } from './initialise'
import { connect } from 'redux-zero/preact';
import actions from './actions';

import IoTClient, { MOVE_TOPIC } from '../../framework/IoTClient'
import Guid from 'guid';
//const getClientId = () => 'web-client:' + Guid.raw();
const getMessageId = () => 'message-id:' + Guid.raw();

/*
Move {
	Game ID
	Piece ID
	ParticipantID 
	Move Type  -> Name
	Move Order
	Move Notation
	From Position
	To Position
	Rotation
}
*/

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			message: [],
			isConnected: false,
			table: InitialiseBoard(),
			selected: null,
			moves: []
		}
	}

	connect = async () => {
		this.client = new IoTClient(this.props.guid, this.props.username)

		try {
			const response = await this.client.connect();
			this.setState({ isConnected: true });
			console.log('connected!', response)
			this.client.onMessageReceived((topic, message) => {
				console.log('received info', topic, message)
				console.log(message.message)
				if (topic == MOVE_TOPIC)
					this.handleMove(message.message)
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

	async componentDidMount() {
		await this.props.setUsername({
			name: "Player1",
			email: "player12"
		})
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


	notation(pos1, pos2) {
		const notation1 = `${String.fromCharCode(97 + pos1[0])}${pos1[1]}`
		const notation2 = `${String.fromCharCode(97 + pos2[0])}${pos2[1]}`
		return `${notation1} ${notation2}`;
	}

	handleMove(notation) {
		let [pos1, pos2] = notation.split(" ");
		pos1 = pos1.split("")
		pos2 = pos2.split("")
		pos1[0] = pos1[0].charCodeAt(0) - 97
		pos2[0] = pos2[0].charCodeAt(0) - 97
		this.move(pos1,pos2)
		console.log(pos1, pos2)
	}

	move(pos1, pos2) {
		const table = [...this.state.table];
		table[pos2[1]][pos2[0]] = this.state.table[pos1[1]][pos1[0]]
		table[pos1[1]][pos1[0]] = null;

		const notation = this.notation(pos1, pos2);
		this.setState({ table, selected: null, moves: [...this.state.moves, notation] })
		//this.onSend(notation);
	}

	rotate(pos1, direction) {

	}

	handleClick = (colIndex, rowIndex) => (event) => {
		const tile = this.state.table[rowIndex][colIndex];
		if (tile != null) {
			console.log('select/reselect')
			this.setState({ selected: [colIndex, rowIndex] })
		} else if (this.state.selected != null && this.validMove(this.state.selected[0], this.state.selected[1], colIndex, rowIndex)) {
			const notation = this.notation(this.state.selected, [colIndex, rowIndex]);
			this.onSend(notation);
		}

	}


	render() {
		return (
			<section class="hero is-fullheight">
				<div class="container">
					<p class="title is-1">
						Your turn
						</p>
					<div class="columns">
						<div class="column is-three-quarters">
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
						</div>
						<div class="column">
							<div class="tabs">
								<ul>
									<li class="is-active"><a>Players</a></li>
									<li class=""><a>History</a></li>
									<li class=""><a>Chat</a></li>
								</ul>
							</div>
							<div class="tile is-parent">
								<article class="tile is-child box">
									<div class="content">
										<div class="content">
											{
												this.state.moves.map(move => {
													return (
														<p>{move}</p>
													)
												})
											}
										</div>
									</div>
								</article>
							</div>
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
						</div>
					</div>
				</div>

			</section >

		);
	}
}

const mapToProps = ({ username, loading, guid }) => ({ username, loading, guid });
export default connect(mapToProps, actions)(Game)