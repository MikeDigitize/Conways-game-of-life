const GRID_CONTAINER_SELECTOR = 'grid-container';
const GRID_CONTAINER_WIDTH = 600;

export default class Grid {
	constructor(gridSize, seed = {}) {
		const grid = createGrid(gridSize, seed); 
		this.dom = grid.rows;
		this.cells = grid.cells;
	}
	append(parent) {
		appendGrid(this.dom, parent);
	}

}

function appendGrid(grid, parent = document.body) {
	const container = document.createElement('div');
	container.classList.add(GRID_CONTAINER_SELECTOR);
	container.style.setProperty('width', `${GRID_CONTAINER_WIDTH}px`);
	const frag = document.createDocumentFragment();
	grid.forEach(function(row) {
		container.appendChild(row);
	});
	frag.appendChild(container);
	parent.appendChild(frag);
}

function createGrid(gridSize, seed) {
	
	const tempCells = [], cells = [], rows = [];
	let size, x, y;

	if(gridSize instanceof Array) {
		x = gridSize[0];
		y = gridSize[1];
		size = x * y;
	}
	else {
		size = Math.pow(gridSize, 2);
		x = gridSize;
	}
	
	for(let i = 0; i < size; i++) {

		const cell = createCell(x, seed[i]);
		tempCells.push(cell);
		cells.push(cell);

		if((i + 1) % x === 0) {
			rows.push(wrapRow(tempCells));
			tempCells.length = 0;
		}

	}
	return { rows, cells };
}

function createCell(gridSize, state = 0) {
	const cell = document.createElement('span');
	const width = (GRID_CONTAINER_WIDTH / gridSize).toFixed(2);
	cell.classList.add('cell');
	cell.style.setProperty('width', `${width}px`);
	cell.style.setProperty('height', `${width}px`);
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