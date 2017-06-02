import Cell from './cell';

export default class Game {

	constructor(gridSize, seed = {}) {

		const size = Math.pow(gridSize, 2);
		this.grid = [];
		for(let i = 0; i < size; i++) {
			this.grid.push(new Cell(seed[i], i, gridSize));
		}

	}

	tick() {

		const { grid } = this;
		const numOfLiveCells = grid.filter(isLiveCell).length;

		if(numOfLiveCells > 0 && grid.length !== numOfLiveCells) {
			grid.forEach(function(cell) {
				const neighbourIndexes = getAllNeighbourIndexes(cell);
      	const neighbours = getAllNeighbours(grid, neighbourIndexes);
      	setCellLife(cell, neighbours);
			});      
		}
		else {
			return gameOver();
		}		

	}

}

function gameOver() {
	return 'Game Over';
}

export function getAllNeighbourIndexes(cell) {

	const { neighbours } = cell;

	return Object.keys(neighbours)
			.map(function(key) {
				return neighbours[key];
			})
			.filter(function(value) {
				return value !== null;
			})
			.sort(function(a, b) {
				return a - b;
			});

}

export function getAllNeighbours(grid, indexes) {
	return indexes.map(function(i) {
		return grid.filter((_, j) => i === j).shift();
	});
}

export function getAllLiveNeighbours(neighbours) {
	return neighbours.filter(isLiveCell);
}

export function setCellLife(cell, neighbours) {
	if(cell.state === 0) {
		const liveNeighbours = getAllLiveNeighbours(neighbours);
		if(liveNeighbours.length === 3) {
			cell.state = 1;
		}
	}
	else {
		const liveNeighbours = getAllLiveNeighbours(neighbours);
		if(liveNeighbours.length < 2 || liveNeighbours.length > 3) {
			cell.state = 0;
		}
	}
}

function isLiveCell(cell) {
	return cell.state === 1;
}