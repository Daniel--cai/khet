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
export const InitialiseBoard = () => {
	const table = Array.matrix(10, 8, null)

	table[4][5] = {
		type: "scarab",
		player: 0,
		direction: 'N',
		rotate:0
	}
	table[4][4] = {
		type: "scarab",
		rotate:0,
		player: 0,
		direction: 'N'
	}
	table[3][4] = {
		type: "scarab",
		rotate:0,
		player: 1,
		direction: 'N'
	}
	table[3][5] = {
		rotate:0,
		type: "scarab",
		player: 1,
		direction: 'N'
	}

	table[0][0] = {
		rotate:0,
		type: "sphinx",
		player: 0,
		direction: 'N'
	}

	table[7][7] = {
		type: "sphinx",
		rotate:0,
		player: 1,
		direction: 'N'
	}

	table[7][9] = {
		type: "sphinx",
		rotate:0,
		player: 1,
		direction: 'N'
	}
	table[7][7] = {
		rotate:0,
		type: "pyramid",
		player: 0,
		direction: 'N'
	}

	table[0][7] = {
		rotate:0,
		type: "pyramid",
		player: 0,
		direction: 'N'
	}
	table[3][7] = {
		rotate:0,
		type: "pyramid",
		player: 0,
		direction: 'N'
	}
	table[4][7] = {
		rotate:0,
		type: "pyramid",
		player: 0,
		direction: 'N'
	}
	table[5][6] = {
		rotate:0,
		type: "pyramid",
		player: 0,
		direction: 'N'
	}
	table[1][2] = {
		rotate:0,
		type: "pyramid",
		player: 0,
		direction: 'N'
	}

	table[3][0] = {
		rotate:0,
		type: "pyramid",
		player: 0,
		direction: 'N'
	}

	table[4][0] = {
		rotate:1,
		type: "pyramid",
		player: 0,
		direction: 'N'
	}
	table[0][4] = {
		rotate:0,
		type: "anubis",
		player: 0,
		direction: 'N'
	}
	table[0][6] = {
		rotate:2,
		type: "anubis",
		player: 0,
		direction: 'N'
	}
	//flatten table

	const flattenTable = []
	for (let col = 0; col < table.length; col++) {
		for (let row = 0; row < table[col].length; row++) {
			flattenTable.push(table[col, row])
		}
	}
	return table;

}