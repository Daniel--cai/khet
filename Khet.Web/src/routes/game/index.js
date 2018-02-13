import { h, Component } from 'preact';
import style from './style.css';
import Api from '../../framework/api';
import classNames from 'classnames'

const Piece = {
	'scarab': '../../assets/images/scarab.png',
	'anubis': '../../assets/images/anubis.png',
	'sphinx': '../../assets/images/sphinx.png',
	'pharaoh': '../../assets/images/pharaoh.png',
	'obelisk': '../../assets/images/obelisk.png',
	'pyramid': '../../assets/images/pyramid.png',
}

export default class Game extends Component {
	constructor(props) {
		super(props);
	}

	// Note: `user` comes from the URL, courtesy of our router

	tileColour(colIndex, rowIndex) {
		let tileColour = "";
		console.log(colIndex, rowIndex)
		if (colIndex == 0) {
			tileColour = style.red;
		}
		if (colIndex == 7) {
			tileColour = style.white
		}

		if (colIndex == 1 && [0, 7].indexOf(rowIndex) != -1) {
			tileColour = style.white;
		}

		if (colIndex == 6 && [0, 7].indexOf(rowIndex) != -1) {
			tileColour = style.red;
		}
		return tileColour
	}

	render() {

		Array.matrix = function (numrows, numcols, initial) {
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

		let table = Array.matrix(8, 8, null)

		table[3][3] = {
			type: "scarab",
			player: 0,
			direction: 'N'
		}
		table[3][4] = {
			type: "scarab",
			player: 0,
			direction: 'N'
		}
		table[4][3] = {
			type: "scarab",
			player: 1,
			direction: 'N'
		}
		table[4][4] = {
			type: "scarab",
			player: 1,
			direction: 'N'
		}
		table[1][2] = {
			type: "anubis",
			player: 1,
			direction: 'N'
		}
		table[1][6] = {
			type: "sphinx",
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

		table[7][7] = {
			type: "sphinx",
			player: 1,
			direction: 'N'
		}
		table[7][7] = {
			type: "sphinx",
			player: 1,
			direction: 'N'
		}
		table[7][7] = {
			type: "sphinx",
			player: 1,
			direction: 'N'
		}

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
									table.map((row, rowIndex) => {
										return (
											<tr>
												{
													row.map((col, colIndex) => {
														const piece = table[rowIndex][colIndex];

														return (
															<td class={this.tileColour(colIndex, rowIndex)}>
																{piece != null &&
																	<img class={classNames(style.piece, piece.player == 0 ? style.friendly : '')} src={Piece[piece.type]} />
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
