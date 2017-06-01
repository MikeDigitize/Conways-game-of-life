export default class Cell {
	
	constructor(state = 0, index = 0, gridSize = 0) {
		
		this.state = state;

		this.neighbours = {};
		
		this.neighbours.left = getLeft(index, gridSize);
		this.neighbours.topLeft = getTopLeft(index, gridSize);
		this.neighbours.bottomLeft = getBottomLeft(index, gridSize);

		this.neighbours.top = getTop(index, gridSize);
		this.neighbours.bottom = getBottom(index, gridSize);

		this.neighbours.right = getRight(index, gridSize);
		this.neighbours.topRight = getTopRight(index, gridSize);
		this.neighbours.bottomRight = getBottomRight(index, gridSize);

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
	if(getLeft(index, gridSize) === null || index >= min) {
		return null;
	}
	else {
		return index + --gridSize;
	}
}

function getTop(index, gridSize) {
	if(index < gridSize) {
		return null;
	}
	else {
		return index - gridSize;
	}
}

function getBottom(index, gridSize) {
	const min = (gridSize * gridSize) - gridSize;
	if(index >= min) {
		return null;
	}
	else {
		return index + gridSize;
	}
}

function getRight(index, gridSize) {
	if((index + 1) % gridSize === 0) {
		return null;
	}
	return ++index;
}

function getTopRight(index, gridSize) {
	if(getRight(index, gridSize) === null || index < gridSize) {
		return null;
	}
	else {
		return index - --gridSize;
	}
}

function getBottomRight(index, gridSize) {
	const min = (gridSize * gridSize) - gridSize;
	if(getRight(index, gridSize) === null || index >= min) {
		return null;
	}
	else {
		return index + ++gridSize;
	}
}