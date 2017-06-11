import Cell from './cell';
import Grid from './grid';

export default class Game extends Grid {

	constructor(gridSize, seed = {}) {

		super(gridSize, seed);
		
		this.grid = [];
		this.autoplay = false;

		let size;

		if(gridSize instanceof Array) {
			let [x, y] = gridSize;
			size = x * y;
		}
		else {
			size = Math.pow(gridSize, 2);
		}

		for(let i = 0; i < size; i++) {
			this.grid.push(new Cell(i, gridSize, seed[i]));
		}

	}

	tick() {

		// jsdom doesn't support raf - quick polyfill for testing
		let { requestAnimationFrame } = window;
		if(typeof requestAnimationFrame !== 'function') {
		    requestAnimationFrame = function(callback) {
		        setTimeout(callback, 1);
		    }
		}

		const { grid, cells, autoplay, tick } = this;
		const liveCells = grid.filter(isLiveCell);
		const numOfLiveCells = liveCells.length;

		// copy current state
		let nextGridState = [].concat(grid);

		// TODO: add test condition to see if new grid state is same as previous grid state and if so exit
		if(numOfLiveCells > 0 && grid.length !== numOfLiveCells) {
			
			// calculate new grid state
			nextGridState = nextGridState.map(function(dataCell, index) {
				const neighbourIndexes = getAllNeighbourIndexes(dataCell);
      	const neighbours = getAllNeighbours(grid, neighbourIndexes);
      	return setCellState(dataCell, neighbours);
			}); 

			// update dom with new state
			nextGridState.forEach(function(dataCell, index) {
				const isAlive = dataCell.state === 1 ? true : false;
				requestAnimationFrame(setDomCellState.bind(this, isAlive, cells[index]));
			});

			// remove last grid state and replace with new state
			this.grid.length = 0;
			this.grid = this.grid.concat(nextGridState);
			
			if(!autoplay) {
				return true; 
			}
			else {
				requestAnimationFrame(tick.bind(this));
			}
			
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

export function setCellState(dataCell, neighbours) {
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