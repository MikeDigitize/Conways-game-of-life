const GRID_CONTAINER_SELECTOR = 'grid-container';
const GRID_CONTAINER_WIDTH = 600;

export default class Grid {
	constructor(gridSize, seed = {}) {
		this.dom = createGrid(gridSize, seed);
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
	const size = Math.pow(gridSize, 2);
	const cells = [];
	const rows = [];
	for(let i = 0; i < size; i++) {
		cells.push(createCell(gridSize, seed[i]));
		if((i + 1) % gridSize === 0) {
			rows.push(wrapRow(cells));
			cells.length = 0;
		}
	}
	return rows;
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