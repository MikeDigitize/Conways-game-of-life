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
		console.log(isAlive);

		// loop through grid

			//	test relations for dead cells

				//	Any dead cell with exactly three live neighbours becomes a live cell

			//	test relations for live cells

				//	any live cell with fewer than two live neighbours dies, as if caused by underpopulation

				//	any live cell with more than three live neighbours dies, as if by overcrowding

				//	any live cell with two or three live neighbours lives on to the next generation

	}

}

function isLiveCell(cell) {
	return cell.state === 1;
}