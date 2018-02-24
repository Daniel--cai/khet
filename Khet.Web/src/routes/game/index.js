import { h, Component } from 'preact';
import style from './style.css';
import Api from '../../framework/api';
import classNames from 'classnames'
import Tile, { Piece } from './Tile'
import immutable from 'immutable';

Array.matrix = function (numcols, numrows, initial) {
	var arr = [];
	for (var i = 0; i < numrows; ++i) {
		var columns = [];
		for (var j = 0; j < numcols; ++j) {
			columns[j] = initial;
		}
		arr[i] = columns;
	}
	return arr;
}

const InitializeBoard = () => {
	const table = Array.matrix(10, 8, null)

	table[4][5] = {
		type: "scarab",
		player: 0,
		direction: 'N'
	}
	table[4][4] = {
		type: "scarab",
		player: 0,
		direction: 'N'
	}
	table[3][4] = {
		type: "scarab",
		player: 1,
		direction: 'N'
	}
	table[3][5] = {
		type: "scarab",
		player: 1,
		direction: 'N'
	}

	table[0][0] = {
		type: "sphinx",
		player: 0,
		direction: 'N'
	}

	table[7][7] = {
		type: "sphinx",
		player: 1,
		direction: 'N'
	}

	table[7][9] = {
		type: "sphinx",
		player: 1,
		direction: 'N'
	}
	table[7][7] = {
		type: "pyramid",
		player: 0,
		direction: 'N'
	}

	table[0][7] = {
		type: "pyramid",
		player: 0,
		direction: 'N'
	}
	table[3][7] = {
		type: "pyramid",
		player: 0,
		direction: 'N'
	}
	table[4][7] = {
		type: "pyramid",
		player: 0,
		direction: 'N'
	}
	table[5][6] = {
		type: "pyramid",
		player: 0,
		direction: 'N'
	}
	table[1][2] = {
		type: "pyramid",
		player: 0,
		direction: 'N'
	}

	table[3][0] = {
		type: "pyramid",
		player: 0,
		direction: 'N'
	}

	table[4][0] = {
		type: "pyramid",
		player: 0,
		direction: 'N'
	}
	table[0][4] = {
		type: "anubis",
		player: 0,
		direction: 'N'
	}
	table[0][6] = {
		type: "anubis",
		player: 0,
		direction: 'N'
	}
	//flatten table
	
	const flattenTable = []
	for (let col =0; col<table.length; col++){
		for(let row=0; row < table[col].length; row++){
			flattenTable.push(table[col,row])
		}
	}
	return table;

}

export default class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			table: InitializeBoard()
		}
		this.handleClick = this.handleClick.bind(this)
	}

	// Note: `user` comes from the URL, courtesy of our router

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

		if (colIndex == 3 &&rowIndex == 5) {
			tileColour = style.green;
		}
		return tileColour
	}

	handleClick(tile){
		console.log(tile)
		const table = this.state.table;
		table[tile.x][tile.y].
		this.setState(table)
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
															<td class={this.tileColour(colIndex, rowIndex)}>
																{piece != null &&
																	<Tile player={piece.player} type={piece.type} onClick={this.handleClick} col={colIndex} row={rowIndex}/>
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
