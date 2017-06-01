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

		// test if any live cells exist
		const isAlive = !!this.grid.filter(isLiveCell).length;

		// loop through grid

			//	test relations for dead cells

				//	Any dead cell with exactly three live neighbours becomes a live cell

		if(isAlive) {
			const deadCells = this.grid.filter(isDeadCell);
			if(deadCells.length) {
				deadCells.forEach(makeDeadCellsLive, this);
			}
		}		

			//	test relations for live cells

				//	any live cell with fewer than two live neighbours dies, as if caused by underpopulation

				//	any live cell with more than three live neighbours dies, as if by overcrowding

				//	any live cell with two or three live neighbours lives on to the next generation

	}

}

function makeDeadCellsLive(cell) {
	const liveRelationsIndexes = getAllLiveNeighboursIndexes(cell);
	const liveRelations = liveRelationsIndexes.map(index => this.grid[index]);
	if(liveRelations.length === 3) {
		console.log('Cell should live!');
	}
	else {
		console.log('Cell should stay dead!');	
	}
}

function getAllLiveNeighboursIndexes(cell) {

	const { neighbours } = cell;

	const liveNeighbours = 
		Object.keys(neighbours)
			.map(function(key) {
				return neighbours[key];
			})
			.filter(function(value) {
				return value !== null;
			});

	return liveNeighbours;

}

function isDeadCell(cell) {
	return cell.state === 0;
}

function isLiveCell(cell) {
	return cell.state === 1;
}