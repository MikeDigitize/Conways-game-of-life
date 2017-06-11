import globalJsdom from 'jsdom-global';
import assert from 'assert';
import Game, { 
    getAllNeighbourIndexes, 
    getAllNeighbours, 
    getAllLiveNeighbours,
    setCellState,
    setDomCellState 
} from '../src/game';
import Cell from '../src/cell';

describe('Game of life', function() {

    globalJsdom();

    describe('Tick', function() {

        describe('Grid size of 1', function() {

            it('should return no relations of a cell in a 1x1 grid', function() {
                const index = 0;
                const gridSize = 1;
                const cell = new Cell(index, gridSize, 1);
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                assert.equal(neighbourIndexes.length, 0);
                assert.deepEqual(neighbourIndexes, []);
            });

        });

        describe('Grid size of 2', function() {

            it('should return all relations of a cell', function() {
                const index = 0;
                const gridSize = 2;
                const cell = new Cell(index, gridSize, 1);
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                assert.equal(neighbourIndexes.length, 3);
                assert.deepEqual(neighbourIndexes, [1,2,3]);
            });

            it('should return all relations of a cell', function() {
                const index = 0;
                const gridSize = [2, 2];
                const cell = new Cell(index, gridSize, 1);
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                assert.equal(neighbourIndexes.length, 3);
                assert.deepEqual(neighbourIndexes, [1,2,3]);
            });

            it('should identify no live relations to a cell', function() {
                const gridSize = 2;
                const game = new Game(gridSize);
                const [cell] = game.grid;
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                const liveNeighbours = getAllLiveNeighbours(neighbours);
                assert.equal(liveNeighbours.length, 0);
            });

            it('should identify 1 live relations to a cell', function() {
                const gridSize = 2;
                const seed = {
                    1: 1
                };
                const game = new Game(gridSize, seed);
                const [cell] = game.grid;
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                const liveNeighbours = getAllLiveNeighbours(neighbours);
                assert.equal(liveNeighbours.length, 1);
            });

            it('should identify 1 live relations to a cell', function() {
                const gridSize = [2, 2];
                const seed = {
                    1: 1
                };
                const game = new Game(gridSize, seed);
                const [cell] = game.grid;
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                const liveNeighbours = getAllLiveNeighbours(neighbours);
                assert.equal(liveNeighbours.length, 1);
            });

            it('should identify 2 live relations to a cell', function() {
                const gridSize = 2;
                const seed = {
                    1: 1,
                    2: 1
                };
                const game = new Game(gridSize, seed);
                const [cell] = game.grid;
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                const liveNeighbours = getAllLiveNeighbours(neighbours);
                assert.equal(liveNeighbours.length, 2);
            });

            it('should identify 3 dead relations to a cell', function() {
                const gridSize = 2;
                const seed = {
                    1: 1,
                    2: 1,
                    3: 1
                };
                const game = new Game(gridSize, seed);
                const [cell] = game.grid;
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                const liveNeighbours = getAllLiveNeighbours(neighbours);
                assert.equal(liveNeighbours.length, 3);
            });

            it('should identify if a cell is dead and has 3 live relations it is now alive', function() {
                const gridSize = 2;
                const seed = {
                    1: 1,
                    2: 1,
                    3: 1
                };
                const game = new Game(gridSize, seed);
                const [dataCell] = game.grid;
                const [domCell] = game.cells;
                const neighbourIndexes = getAllNeighbourIndexes(dataCell);
                assert.equal(neighbourIndexes.length, 3);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                assert.equal(dataCell.state, 0);
                assert.equal(domCell.classList.contains('alive'), false);
                const nextDataCell = setCellState(dataCell, neighbours);
                setDomCellState(nextDataCell.state === 1, domCell);
                assert.equal(nextDataCell.state, 1);
                assert.equal(domCell.classList.contains('alive'), true);
            });

            it('should identify if a cell is dead and has 2 live relations it is still dead', function() {
                const gridSize = 2;
                const seed = {
                    1: 1,
                    2: 1
                };
                const game = new Game(gridSize, seed);
                const [dataCell] = game.grid;
                const [domCell] = game.cells;
                const neighbourIndexes = getAllNeighbourIndexes(dataCell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                assert.equal(dataCell.state, 0);
                assert.equal(domCell.classList.contains('alive'), false);
                const nextDataCell = setCellState(dataCell, neighbours);
                setDomCellState(nextDataCell.state === 1, domCell);
                assert.equal(nextDataCell.state, 0);
                assert.equal(domCell.classList.contains('alive'), false);
            });

            it('should identify if a cell is alive and has 2-3 live relations it is still alive', function() {
                const gridSize = 2;
                const seed = {
                    0: 1,
                    2: 1,
                    3: 1
                };
                const game = new Game(gridSize, seed);
                const [dataCell] = game.grid;
                const [domCell] = game.cells;
                const neighbourIndexes = getAllNeighbourIndexes(dataCell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                assert.equal(dataCell.state, 1);
                assert.equal(domCell.classList.contains('alive'), true);
                const nextDataCell = setCellState(dataCell, neighbours);
                setDomCellState(nextDataCell.state === 1, domCell);
                assert.equal(nextDataCell.state, 1);
                assert.equal(domCell.classList.contains('alive'), true);
            });

            it('should identify if a cell is alive and has less than 2 live relations it is dead', function() {
                const gridSize = 2;
                const seed = {
                    0: 1,
                    2: 1
                };
                const game = new Game(gridSize, seed);
                const [dataCell] = game.grid;
                const [domCell] = game.cells;
                const neighbourIndexes = getAllNeighbourIndexes(dataCell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                assert.equal(dataCell.state, 1);
                assert.equal(domCell.classList.contains('alive'), true);
                const nextDataCell = setCellState(dataCell, neighbours);
                setDomCellState(nextDataCell.state === 1, domCell);
                assert.equal(nextDataCell.state, 0);
                assert.equal(domCell.classList.contains('alive'), false);
            });

            it('should identify if a cell is alive and has less than 2 live relations it is dead', function() {
                const gridSize = [2, 2];
                const seed = {
                    0: 1,
                    2: 1
                };
                const game = new Game(gridSize, seed);
                const [dataCell] = game.grid;
                const [domCell] = game.cells;
                const neighbourIndexes = getAllNeighbourIndexes(dataCell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                assert.equal(dataCell.state, 1);
                assert.equal(domCell.classList.contains('alive'), true);
                const nextDataCell = setCellState(dataCell, neighbours);
                setDomCellState(nextDataCell.state === 1, domCell);
                assert.equal(nextDataCell.state, 0);
                assert.equal(domCell.classList.contains('alive'), false);
            });

        });

        describe('Grid size of 3', function() {

            it('should return all relations of a cell', function() {
                const index = 4;
                const gridSize = 3;
                const cell = new Cell(index, gridSize, 1);
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                assert.equal(neighbourIndexes.length, 8);
                assert.deepEqual(neighbourIndexes, [0,1,2,3,5,6,7,8]);
            });

            it('should return all relations of a cell', function() {
                const index = 4;
                const gridSize = [3, 3];
                const cell = new Cell(index, gridSize, 1);
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                assert.equal(neighbourIndexes.length, 8);
                assert.deepEqual(neighbourIndexes, [0,1,2,3,5,6,7,8]);
            });

            it('should return all relations of a cell', function() {
                const index = 8;
                const gridSize = 3;
                const cell = new Cell(index, gridSize, 1);
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                assert.equal(neighbourIndexes.length, 3);
                assert.deepEqual(neighbourIndexes, [4,5,7]);
            });

            it('should return all relations of a cell', function() {
                const index = 7;
                const gridSize = 3;
                const cell = new Cell(index, gridSize, 1);
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                assert.equal(neighbourIndexes.length, 5);
                assert.deepEqual(neighbourIndexes, [3,4,5,6,8]);
            });

            it('should return all relations of a cell', function() {
                const index = 6;
                const gridSize = 3;
                const cell = new Cell(index, gridSize, 1);
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                assert.equal(neighbourIndexes.length, 3);
                assert.deepEqual(neighbourIndexes, [3,4,7]);
            });

            it('should return all neighbours of a cell', function() {
                const index = 6;
                const gridSize = 3;
                const game = new Game(gridSize);
                const cell = game.grid[index];
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                neighbours.forEach(neighbour => assert.equal(neighbour instanceof Cell, true));
                assert.equal(neighbours.length, 3);
                assert.deepEqual(neighbours, [game.grid[3], game.grid[4], game.grid[7]]);
            });

            it('should return all neighbours of a cell', function() {
                const index = 7;
                const gridSize = 3;
                const game = new Game(gridSize);
                const cell = game.grid[index];
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                neighbours.forEach(neighbour => assert.equal(neighbour instanceof Cell, true));
                assert.equal(neighbours.length, 5);
                assert.deepEqual(neighbours, [game.grid[3], game.grid[4], game.grid[5], game.grid[6], game.grid[8]]);
            });

            it('should return all neighbours of a cell', function() {
                const index = 8;
                const gridSize = 3;
                const game = new Game(gridSize);
                const cell = game.grid[index];
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                neighbours.forEach(neighbour => assert.equal(neighbour instanceof Cell, true));
                assert.equal(neighbours.length, 3);
                assert.deepEqual(neighbours, [game.grid[4], game.grid[5], game.grid[7]]);
            });

            it('should return all live neighbours of a cell', function() {
                const index = 6;
                const gridSize = 3;
                const seed = {
                    3: 1,
                    4: 1
                };
                const game = new Game(gridSize, seed);
                const cell = game.grid[index];
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                const liveNeighbours = getAllLiveNeighbours(neighbours);
                liveNeighbours.forEach(neighbour => assert.equal(neighbour instanceof Cell, true));
                assert.equal(liveNeighbours.length, 2);
                assert.deepEqual(liveNeighbours, [game.grid[3], game.grid[4]]);
            });

            it('should return all live neighbours of a cell', function() {
                const index = 4;
                const gridSize = 3;
                const seed = {
                    2: 1,
                    3: 1,
                    5: 1,
                    8: 1
                };
                const game = new Game(gridSize, seed);
                const cell = game.grid[index];
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                const liveNeighbours = getAllLiveNeighbours(neighbours);
                liveNeighbours.forEach(neighbour => assert.equal(neighbour instanceof Cell, true));
                assert.equal(liveNeighbours.length, 4);
                assert.deepEqual(liveNeighbours, [game.grid[2], game.grid[3], game.grid[5], game.grid[8]]);
            });

            it('should return all live neighbours of a cell', function() {
                const index = 8;
                const gridSize = [3, 4];
                const game = new Game(gridSize);
                const cell = game.grid[index];
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                neighbours.forEach(neighbour => assert.equal(neighbour instanceof Cell, true));
                assert.equal(neighbours.length, 5);
                assert.deepEqual(neighbours, [game.grid[4], game.grid[5], game.grid[7], game.grid[10], game.grid[11]]);
            });

            it('should return all live neighbours of a cell', function() {
                const index = 8;
                const gridSize = 3;
                const seed = {
                    7: 1
                };
                const game = new Game(gridSize, seed);
                const cell = game.grid[index];
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                const liveNeighbours = getAllLiveNeighbours(neighbours);
                liveNeighbours.forEach(neighbour => assert.equal(neighbour instanceof Cell, true));
                assert.equal(liveNeighbours.length, 1);
                assert.deepEqual(liveNeighbours, [game.grid[7]]);
            });

            it('should identify no live relations to a cell', function() {
                const gridSize = 3;
                const game = new Game(gridSize);
                const cell = game.grid[2];
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                const liveNeighbours = getAllLiveNeighbours(neighbours);
                assert.equal(liveNeighbours.length, 0);
            });

            it('should identify 1 live relations to a cell', function() {
                const gridSize = 3;
                const seed = {
                    1: 1
                };
                const game = new Game(gridSize, seed);
                const cell = game.grid[2];
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                const liveNeighbours = getAllLiveNeighbours(neighbours);
                assert.equal(liveNeighbours.length, 1);
            });

            it('should identify 2 live relations to a cell', function() {
                const gridSize = 3;
                const seed = {
                    1: 1,
                    5: 1
                };
                const game = new Game(gridSize, seed);
                const cell = game.grid[2];
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                const liveNeighbours = getAllLiveNeighbours(neighbours);
                assert.equal(liveNeighbours.length, 2);
            });

            it('should identify 3 live relations to a cell', function() {
                const gridSize = 3;
                const seed = {
                    1: 1,
                    4: 1,
                    5: 1
                };
                const game = new Game(gridSize, seed);
                const cell = game.grid[2];
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                const liveNeighbours = getAllLiveNeighbours(neighbours);
                assert.equal(liveNeighbours.length, 3);
            });

            it('should identify if a cell is dead and has 3 live relations it is now alive', function() {
                const gridSize = 3;
                const seed = {
                    1: 1,
                    4: 1,
                    5: 1
                };
                const game = new Game(gridSize, seed);
                const dataCell = game.grid[2];
                const domCell = game.cells[2];
                const neighbourIndexes = getAllNeighbourIndexes(dataCell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                assert.equal(dataCell.state, 0);
                assert.equal(domCell.classList.contains('alive'), false);
                const nextDataCell = setCellState(dataCell, neighbours);
                setDomCellState(nextDataCell.state === 1, domCell);
                assert.equal(nextDataCell.state, 1);
                assert.equal(domCell.classList.contains('alive'), true);
            });

            it('should identify if a cell is dead and has 2 live relations it is still dead', function() {
                const gridSize = 3;
                const seed = {
                    1: 1,
                    4: 1
                };
                const game = new Game(gridSize, seed);
                const dataCell = game.grid[2];
                const domCell = game.cells[2];
                const neighbourIndexes = getAllNeighbourIndexes(dataCell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                assert.equal(dataCell.state, 0);
                assert.equal(domCell.classList.contains('alive'), false);
                const nextDataCell = setCellState(dataCell, neighbours);
                setDomCellState(nextDataCell.state === 1, domCell);
                assert.equal(nextDataCell.state, 0);
                assert.equal(domCell.classList.contains('alive'), false);
            });

            it('should identify if a cell is alive and has 2-3 live relations it is still alive', function() {
                const gridSize = 3;
                const seed = {
                    1: 1,
                    2: 1,
                    4: 1
                };
                const game = new Game(gridSize, seed);
                const dataCell = game.grid[2];
                const domCell = game.cells[2];
                const neighbourIndexes = getAllNeighbourIndexes(dataCell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                assert.equal(dataCell.state, 1);
                assert.equal(domCell.classList.contains('alive'), true);
                const nextDataCell = setCellState(dataCell, neighbours);
                setDomCellState(nextDataCell.state === 1, domCell);
                assert.equal(nextDataCell.state, 1);
                assert.equal(domCell.classList.contains('alive'), true);
            });

            it('should identify if a cell is alive and has less than 2 live relations it is dead', function() {
                const gridSize = 3;
                const seed = {
                    1: 1,
                    2: 1
                };
                const game = new Game(gridSize, seed);
                const dataCell = game.grid[2];
                const domCell = game.cells[2];
                const neighbourIndexes = getAllNeighbourIndexes(dataCell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                assert.equal(dataCell.state, 1);
                assert.equal(domCell.classList.contains('alive'), true);
                const nextDataCell = setCellState(dataCell, neighbours);
                setDomCellState(nextDataCell.state === 1, domCell);
                assert.equal(nextDataCell.state, 0);
                assert.equal(domCell.classList.contains('alive'), false);
            });

            it('should identify if a cell is alive and more than 3 live relations it is dead', function() {
                const gridSize = 3;
                const seed = {
                    0: 1,
                    1: 1,
                    2: 1,
                    3: 1,
                    4: 1
                };
                const game = new Game(gridSize, seed);
                const dataCell = game.grid[4];
                const domCell = game.cells[4];
                const neighbourIndexes = getAllNeighbourIndexes(dataCell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                assert.equal(dataCell.state, 1);
                assert.equal(domCell.classList.contains('alive'), true);
                const nextDataCell = setCellState(dataCell, neighbours);
                setDomCellState(nextDataCell.state === 1, domCell);
                assert.equal(nextDataCell.state, 0);
                assert.equal(domCell.classList.contains('alive'), false);
            });

            it('should identify if a cell is alive and more than 3 live relations it is dead', function() {
                const gridSize = 3;
                const seed = {
                    0: 1,
                    1: 1,
                    2: 1,
                    3: 1,
                    4: 1,
                    5: 1,
                    6: 1,
                    7: 1,
                    8: 1
                };
                const game = new Game(gridSize, seed);
                const dataCell = game.grid[4];
                const domCell = game.cells[4];
                const neighbourIndexes = getAllNeighbourIndexes(dataCell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                assert.equal(dataCell.state, 1);
                assert.equal(domCell.classList.contains('alive'), true);
                const nextDataCell = setCellState(dataCell, neighbours);
                setDomCellState(nextDataCell.state === 1, domCell);
                assert.equal(nextDataCell.state, 0);
                assert.equal(domCell.classList.contains('alive'), false);
            });

            it('should identify if a cell is alive and more than 3 live relations it is dead', function() {
                const gridSize = [3, 3];
                const seed = {
                    0: 1,
                    1: 1,
                    2: 1,
                    3: 1,
                    4: 1,
                    5: 1,
                    6: 1,
                    7: 1,
                    8: 1
                };
                const game = new Game(gridSize, seed);
                const dataCell = game.grid[4];
                const domCell = game.cells[4];
                const neighbourIndexes = getAllNeighbourIndexes(dataCell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                assert.equal(dataCell.state, 1);
                assert.equal(domCell.classList.contains('alive'), true);
                const nextDataCell = setCellState(dataCell, neighbours);
                setDomCellState(nextDataCell.state === 1, domCell);
                assert.equal(nextDataCell.state, 0);
                assert.equal(domCell.classList.contains('alive'), false);
            });

        });

        describe('Tick method', function() {

            it('should end a game with a grid size of 1 and a live cell', function() {
                const gridSize = 1;
                const seed = {
                    0: 1
                };
                const game = new Game(gridSize, seed);
                const result = game.tick();
                assert.equal(result, false);
            });

            it('should end a game with a grid size of 1 and a dead cell', function() {
                const gridSize = 1;
                const game = new Game(gridSize);
                const result = game.tick();
                assert.equal(result, false);
            });

            it('should end after 1 tick with a grid of 2 and 2 live cells', function() {
                const gridSize = 2;
                const seed = {
                    0: 1,
                    1: 1
                };
                const game = new Game(gridSize, seed);
                let result = game.tick();
                assert.equal(result, true);
                result = game.tick();
                assert.equal(result, false);
            });

            it('should end after 1 tick with a grid of 2 and 3 live cells', function() {
                const gridSize = 2;
                const seed = {
                    0: 1,
                    1: 1,
                    2: 1
                };
                const game = new Game(gridSize, seed);
                let result = game.tick();
                assert.equal(result, true);
                result = game.tick();
                assert.equal(result, false);
            });

            it('should continue forever with a grid of 3 and 3 live cells', function() {
                const gridSize = 3;
                const seed = {
                    0: 1,
                    3: 1,
                    4: 1
                };
                const game = new Game(gridSize, seed);
                let result = game.tick();
                assert.equal(result, true);                
                result = game.tick();
                assert.equal(result, true);
                result = game.tick();
                assert.equal(result, true);
            });

            it('should forever with a grid of 3 and 3 live cells', function() {
                const gridSize = 3;
                const seed = {
                    1: 1,
                    2: 1,
                    4: 1
                };
                const game = new Game(gridSize, seed);
                let result = game.tick();
                assert.equal(result, true);                
                result = game.tick();
                assert.equal(result, true);
                result = game.tick();
                assert.equal(result, true);
            });

        });
        
    });

});