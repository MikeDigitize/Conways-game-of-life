import Cell from './cell';
import Grid from './grid';

export default class Game {

	constructor(gridSize, seed = {}) {

		const size = Math.pow(gridSize, 2);
		this.grid = [];
		for(let i = 0; i < size; i++) {
			this.grid.push(new Cell(seed[i], i, gridSize));
		}
		const dom = new Grid(gridSize, seed);
		this.cells = dom.cells;

	}

	tick() {

		const { grid, cells } = this;
		const numOfLiveCells = grid.filter(isLiveCell).length;

		if(numOfLiveCells > 0 && grid.length !== numOfLiveCells) {
			grid.forEach(function(dataCell, index) {
				const neighbourIndexes = getAllNeighbourIndexes(dataCell);
      	const neighbours = getAllNeighbours(grid, neighbourIndexes);
      	setCellLife(dataCell, neighbours, cells[index]);
			});    
			return true;  
		}
		else {
			return false;
		}		

	}

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

export function setCellLife(dataCell, neighbours, domCell) {
	if(dataCell.state === 0) {
		const liveNeighbours = getAllLiveNeighbours(neighbours);
		if(liveNeighbours.length === 3) {
			setCellState(true, dataCell, domCell);
		}
	}
	else {
		const liveNeighbours = getAllLiveNeighbours(neighbours);
		if(liveNeighbours.length < 2 || liveNeighbours.length > 3) {
			setCellState(false, dataCell, domCell);
		}
	}
}

function setCellState(isLiveCell, dataCell, domCell) {
	if(isLiveCell) {
		dataCell.state = 1;
		domCell.classList.add('alive');
	}
	else {
		dataCell.state = 0;
		domCell.classList.remove('alive');
	}
}

function isLiveCell(cell) {
	return cell.state === 1;
}