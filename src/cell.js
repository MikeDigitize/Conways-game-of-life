export default class Cell {
	
	constructor(index, gridSize, state = 0) {
		
		this.state = state;

		let totalCells, rowLength;

		if(gridSize instanceof Array) {
			let [x, y] = gridSize;
			totalCells = x * y;
			rowLength = x;
		}
		else {
			totalCells = gridSize * gridSize;
			rowLength = gridSize;
		}

		let lastRowStart = totalCells - rowLength;

		this.neighbours = {};
		
		this.neighbours.left = getLeft(index, rowLength);
		this.neighbours.topLeft = getTopLeft(index, rowLength);
		this.neighbours.bottomLeft = getBottomLeft(index, rowLength, lastRowStart);

		this.neighbours.top = getTop(index, rowLength);
		this.neighbours.bottom = getBottom(index, rowLength, lastRowStart);

		this.neighbours.right = getRight(index, rowLength);
		this.neighbours.topRight = getTopRight(index, rowLength);
		this.neighbours.bottomRight = getBottomRight(index, rowLength, lastRowStart);

	}
	
}

function getLeft(index, rowLength) {
	if(index % rowLength === 0) {
		return null;
	}
	return --index;
}

function getTopLeft(index, rowLength) {
	if(getLeft(index, rowLength) === null || index < rowLength) {
		return null;
	}
	else {
		return index - ++rowLength;
	}
}

function getBottomLeft(index, rowLength, lastRowStart) {
	if(getLeft(index, rowLength) === null || index >= lastRowStart) {
		return null;
	}
	else {
		return index + --rowLength;
	}
}

function getTop(index, rowLength) {
	if(index < rowLength) {
		return null;
	}
	else {
		return index - rowLength;
	}
}

function getBottom(index, rowLength, lastRowStart) {
	if(index >= lastRowStart) {
		return null;
	}
	else {
		return index + rowLength;
	}
}

function getRight(index, rowLength) {
	if((index + 1) % rowLength === 0) {
		return null;
	}
	return ++index;
}

function getTopRight(index, rowLength) {
	if(getRight(index, rowLength) === null || index < rowLength) {
		return null;
	}
	else {
		return index - --rowLength;
	}
}

function getBottomRight(index, rowLength, lastRowStart) {
	if(getRight(index, rowLength) === null || index >= lastRowStart) {
		return null;
	}
	else {
		return index + ++rowLength;
	}
}