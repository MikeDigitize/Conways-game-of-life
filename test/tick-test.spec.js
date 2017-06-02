import assert from 'assert';
import Game, { 
    getAllNeighbourIndexes, 
    getAllNeighbours, 
    getAllLiveNeighbours, 
    getAllDeadNeighbours,
    setCellLife 
} from '../src/game';
import Cell from '../src/cell';

describe('Game of life', function() {

    describe('Tick', function() {

        describe('Grid size of 1', function() {

            it('should end a game with a grid size of 1 and a live cell', function() {
                const gridSize = 1;
                const seed = {
                    0: 1
                };
                const game = new Game(gridSize, seed);
                const result = game.tick();
                assert.equal(result, 'Game Over');
            });

            it('should end a game with a grid size of 1 and a dead cell', function() {
                const gridSize = 1;
                const game = new Game(gridSize);
                const result = game.tick();
                assert.equal(result, 'Game Over');
            });

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

            it('should identify no live relations in a cell', function() {
                const gridSize = 2;
                const game = new Game(gridSize);
                const [cell] = game.grid;
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                const liveNeighbours = getAllLiveNeighbours(neighbours);
                assert.equal(liveNeighbours.length, 0);
            });

            it('should identify 1 live relations in a cell', function() {
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

            it('should identify 2 live relations in a cell', function() {
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

            it('should identify 3 dead relations in a cell', function() {
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

            it('should identify no dead relations in a cell', function() {
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
                const deadNeighbours = getAllDeadNeighbours(neighbours);
                assert.equal(deadNeighbours.length, 0);
            });

            it('should identify one dead relations in a cell', function() {
                const gridSize = 2;
                const seed = {
                    1: 1,
                    3: 1
                };
                const game = new Game(gridSize, seed);
                const [cell] = game.grid;
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                const deadNeighbours = getAllDeadNeighbours(neighbours);
                assert.equal(deadNeighbours.length, 1);
            });

            it('should identify two dead relations in a cell', function() {
                const gridSize = 2;
                const seed = {
                    3: 1
                };
                const game = new Game(gridSize, seed);
                const [cell] = game.grid;
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                const deadNeighbours = getAllDeadNeighbours(neighbours);
                assert.equal(deadNeighbours.length, 2);
            });

            it('should identify 3 dead relations in a cell', function() {
                const gridSize = 2;
                const game = new Game(gridSize);
                const [cell] = game.grid;
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                const deadNeighbours = getAllDeadNeighbours(neighbours);
                assert.equal(deadNeighbours.length, 3);
            });

            it('should identify if a cell is dead and has 3 live relations it is now alive', function() {
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
                assert.equal(cell.state, 0);
                setCellLife(cell, neighbours);
                assert.equal(cell.state, 1);
            });

            it('should identify if a cell is dead and has 2 live relations it is still dead', function() {
                const gridSize = 2;
                const seed = {
                    1: 1,
                    2: 1
                };
                const game = new Game(gridSize, seed);
                const [cell] = game.grid;
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                assert.equal(cell.state, 0);
                setCellLife(cell, neighbours);
                assert.equal(cell.state, 0);
            });

            it('should identify if a cell is alive and has 2-3 live relations it is still alive', function() {
                const gridSize = 2;
                const seed = {
                    0: 1,
                    2: 1,
                    3: 1
                };
                const game = new Game(gridSize, seed);
                const [cell] = game.grid;
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                console.log('cell state', cell.state);
                assert.equal(cell.state, 1);
                setCellLife(cell, neighbours);
                assert.equal(cell.state, 1);
            });

            it('should identify if a cell is alive and has less than 2 live relations it is dead', function() {
                const gridSize = 2;
                const seed = {
                    0: 1,
                    2: 1
                };
                const game = new Game(gridSize, seed);
                const [cell] = game.grid;
                const neighbourIndexes = getAllNeighbourIndexes(cell);
                const neighbours = getAllNeighbours(game.grid, neighbourIndexes);
                assert.equal(cell.state, 1);
                setCellLife(cell, neighbours);
                assert.equal(cell.state, 0);
            });

        });
        
    });

});