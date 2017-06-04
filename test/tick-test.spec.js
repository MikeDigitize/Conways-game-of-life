import assert from 'assert';
import Game, { 
    getAllNeighbourIndexes, 
    getAllNeighbours, 
    getAllLiveNeighbours,
    setCellLife 
} from '../src/game';
import Cell from '../src/cell';

describe('Game of life', function() {

    describe('Tick', function() {

        describe('Grid size of 1', function() {

            it('should return no relations of a cell in a 1x1 grid', function() {
                const index = 0;
                const gridSize = 1;
                const cell = new Cell(1, index, gridSize);
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                assert.equal(neighbourIndexes.length, 0);
                assert.deepEqual(neighbourIndexes, []);
            });

        });

        describe('Grid size of 2', function() {

            it('should return all relations of a cell', function() {
                const index = 0;
                const gridSize = 2;
                const cell = new Cell(1, index, gridSize);
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
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                assert.equal(dataCell.state, 0);
                assert.equal(domCell.classList.contains('alive'), false);
                setCellLife(dataCell, neighbours, domCell);
                assert.equal(dataCell.state, 1);
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
                setCellLife(dataCell, neighbours, domCell);
                assert.equal(dataCell.state, 0);
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
                setCellLife(dataCell, neighbours, domCell);
                assert.equal(dataCell.state, 1);
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
                setCellLife(dataCell, neighbours, domCell);
                assert.equal(dataCell.state, 0);
                assert.equal(domCell.classList.contains('alive'), false);
            });

        });

        describe('Grid size of 3', function() {

            it('should return all relations of a cell', function() {
                const index = 4;
                const gridSize = 3;
                const cell = new Cell(1, index, gridSize);
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                assert.equal(neighbourIndexes.length, 8);
                assert.deepEqual(neighbourIndexes, [0,1,2,3,5,6,7,8]);
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
                setCellLife(dataCell, neighbours, domCell);
                assert.equal(dataCell.state, 1);
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
                setCellLife(dataCell, neighbours, domCell);
                assert.equal(dataCell.state, 0);
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
                setCellLife(dataCell, neighbours, domCell);
                assert.equal(dataCell.state, 1);
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
                setCellLife(dataCell, neighbours, domCell);
                assert.equal(dataCell.state, 0);
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
                setCellLife(dataCell, neighbours, domCell);
                assert.equal(dataCell.state, 0);
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
                setCellLife(dataCell, neighbours, domCell);
                assert.equal(dataCell.state, 0);
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

            it('should continue forever with a grid of 3 and 3 live cells', function() {
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