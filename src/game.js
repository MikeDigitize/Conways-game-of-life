export class Cell {
	constructor(state = 0, index = 0, gridSize = 0) {
		this.state = state;
		this.neighbours = {};
		this.neighbours.left = getLeft(index, gridSize);
		this.neighbours.topLeft = getTopLeft(index, gridSize);
		this.neighbours.bottomLeft = getBottomLeft(index, gridSize);
	}
}

export default class Game {
	constructor(gridSize, seed = {}) {
		const size = Math.pow(gridSize, 2);
		this.grid = [];
		for(let i = 0; i < size; i++) {
			this.grid.push(new Cell(seed[i], i, Math.sqrt(gridSize)));
		}
	}
}

function getLeft(index, gridSize) {
	if(index % gridSize === 0) {
		return null;
	}
	return --index;
}

function getTopLeft(index, gridSize) {
	if(getLeft(index, gridSize) === null || index < gridSize) {
		return null;
	}
	else {
		return index - ++gridSize;
	}
}

function getBottomLeft(index, gridSize) {
	const min = (gridSize * gridSize) - gridSize;
	if(getLeft(index, gridSize) === null || index > min) {
		return null;
	}
	else {
		return index + --gridSize;
	}
}