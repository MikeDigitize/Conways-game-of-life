import assert from 'assert';
import Game from '../src/game';

describe('Game of life', function() {

    describe('Should initialise a grid', function() {

        it('should initialise a grid of 1', () => {
            const gridSize = 1;
            const game = new Game(1);
            assert.equal(game.grid.length, 1);
        });

        it('should initialise a grid of 9', function() {
            const gridSize = 3;
            const game = new Game(gridSize);
            assert.equal(game.grid.length, 9);
        });

        it('should initialise a grid of 10000', () => {
            const gridSize = 100;
            const game = new Game(gridSize);
            assert.equal(game.grid.length, 10000);
        });

    });

    describe('Should initialise a grid with a specified seed', function() {

        it('should initialise with specified live cells in a grid size of 3', function() {
            const gridSize = 3;
            const seed = {
                0: 1,
                1: 1
            };
            const game = new Game(gridSize, seed);
            assert.equal(game.grid.length, 9);
            assert.equal(game.grid[0].state, 1);
            assert.equal(game.grid[1].state, 1);
            assert.equal(game.grid[2].state, 0);
            assert.equal(game.grid[5].state, 0);
        });

        it('should initialise with specified live cells in a grid size of 10', function() {
            const gridSize = 10;
            const seed = {
                56: 1,
                99: 1
            };
            const game = new Game(gridSize, seed);
            assert.equal(game.grid.length, 100);
            assert.equal(game.grid[0].state, 0);
            assert.equal(game.grid[56].state, 1);
            assert.equal(game.grid[99].state, 1);
        });

    });

});