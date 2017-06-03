export default class Grid {
	constructor(gridSize, seed = {}) {
		this.dom = createGrid(gridSize, seed);
	}
}

function createGrid(gridSize, seed) {
	const size = Math.pow(gridSize, 2);
	const cells = [];
	const rows = [];
	for(let i = 0; i < size; i++) {
		cells.push(createCell(seed[i]));
		if((i + 1) % gridSize === 0) {
			rows.push(wrapRow(cells));
			cells.length = 0;
		}
	}
	return rows;
}

function createCell(state = 0) {
	const cell = document.createElement('span');
	cell.classList.add('cell');
	if(state === 1) {
		cell.classList.add('alive');
	}
	return cell;
}

function createRow(){
	const row = document.createElement('div');
	row.classList.add('row');
	return row;
}

function wrapRow(cells) {
	const row = createRow();
	cells.forEach(function(cell) {
		row.appendChild(cell);
	});
	return row;
}