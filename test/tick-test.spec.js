import assert from 'assert';
import Game, { getAllLiveNeighbourIndexes } from '../src/game';
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

        });


        describe('Grid size of 2', function() {

            it('should return all live relations of a cell', function() {
                const index = 0;
                const gridSize = 2;
                const cell = new Cell(1, index, gridSize);
                const liveCells = getAllLiveNeighbourIndexes(cell);
                assert.equal(liveCells.length, 0);
            });

        });
        
    });

});