import Cell from './cell';
import Grid from './grid';

export default class Game extends Grid {

	constructor(gridSize, seed = {}) {

		super(gridSize, seed);
		
		this.grid = [];
		this.autoplay = false;

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
			this.grid.push(new Cell(seed[i], i, x));
		}

	}

	tick() {

		const { grid, cells, autoplay, tick } = this;
		const liveCells = grid.filter(isLiveCell);
		const numOfLiveCells = liveCells.length;

		let nextGridState = [];
		nextGridState = nextGridState.concat(grid);

		if(numOfLiveCells > 0 && grid.length !== numOfLiveCells) {
			
			nextGridState = nextGridState.map(function(dataCell, index) {
				const neighbourIndexes = getAllNeighbourIndexes(dataCell);
      	const neighbours = getAllNeighbours(grid, neighbourIndexes);
      	console.log(grid, neighbourIndexes, neighbours)
      	return setCellLife(dataCell, neighbours, index);
			}); 

			// nextGridState.forEach(function(dataCell, index) {
			// 	const isAlive = dataCell.state === 1 ? true : false;
			// 	if(typeof window.requestAnimationFrame === 'function') {
			// 		window.requestAnimationFrame(setDomCellState.bind(this, isAlive, cells[index]));
			// 	}
			// 	else {
			// 		setDomCellState(isAlive, cells[index]);
			// 	}
			// });

			// this.grid.length = 0;
			// this.grid = this.grid.concat(nextGridState);
			
			// if(!autoplay) {
			// 	return true; 
			// }
			// else {
			// 	window.requestAnimationFrame(tick.bind(this));
			// }
			
		}
		else {
			return false;
		}		

	}

	play() {
		this.autoplay = true;
		this.tick();
	}

	stop() {
		this.autoplay = false;
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

export function setCellLife(dataCell, neighbours, index) {
	const liveNeighbours = getAllLiveNeighbours(neighbours);
	const nextCell = Object.assign({}, dataCell);
	if(dataCell.state === 0) {
		if(liveNeighbours.length === 3) {
			nextCell.state = 1;
		}
	}
	else {
		if(liveNeighbours.length < 2 || liveNeighbours.length > 3) {
			nextCell.state = 0;
		}
	}
	return nextCell;
}

export function setDomCellState(isLiveCell, domCell) {
	if(isLiveCell) {		
		domCell.classList.add('alive');
	}
	else {
		domCell.classList.remove('alive');
	}
}

function isLiveCell(cell) {
	return cell.state === 1;
}

function isDeadCell(cell) {
	return cell.state === 0;
}