import assert from 'assert';
import Game, { Cell } from '../src/game';

describe('Game of life', function() {

    describe('Should initialise a grid', function() {
        it('should initialise a grid of 9', function() {
            const game = new Game(3);
            assert.equal(game.grid.length, 9);
        });
        it('should initialise a grid of 1', () => {
            const game = new Game(1);
            assert.equal(game.grid.length, 1);
        });
        it('should initialise a grid of 10000', () => {
            const game = new Game(100);
            assert.equal(game.grid.length, 10000);
        });
    });

    describe('Should initialise a grid with a specified seed', function() {
        it('should initialise with specified live cells', function() {
            const seed = {
                0: 1,
                1: 1
            };
            const game = new Game(3, seed);
            assert.equal(game.grid.length, 9);
            assert.equal(game.grid[0].state, 1);
            assert.equal(game.grid[1].state, 1);
            assert.equal(game.grid[2].state, 0);
            assert.equal(game.grid[5].state, 0);
        });

        it('should initialise with specified live cells', function() {
            const seed = {
                56: 1,
                99: 1
            };
            const game = new Game(10, seed);
            assert.equal(game.grid.length, 100);
            assert.equal(game.grid[0].state, 0);
            assert.equal(game.grid[56].state, 1);
            assert.equal(game.grid[99].state, 1);
        });

    });

    describe('Cell awareness', function() {
        describe('Cells on the left of the grid should know they have no left relations', function() {
            
            it('Should know the left cells are not active if index = 0', function() {
                const index = 0;
                const gridSize = 3;
                const cell = new Cell(1, index, gridSize);
                assert.equal(cell.neighbours.left, null);
                assert.equal(cell.neighbours.topLeft, null);
                assert.equal(cell.neighbours.bottomLeft, null);
            });

            it('Should know the left cells state if index = 1', function() {
                const index = 1;
                const gridSize = 3;
                const cell = new Cell(1, index, gridSize);
                assert.equal(cell.neighbours.left, 0);
                assert.equal(cell.neighbours.topLeft, null);
                assert.equal(cell.neighbours.bottomLeft, 3);
            });

            it('Should know the left cells state if index = 4', function() {
                const index = 4;
                const gridSize = 3;
                const cell = new Cell(1, index, gridSize);
                assert.equal(cell.neighbours.left, 3);
                assert.equal(cell.neighbours.topLeft, 0);
                assert.equal(cell.neighbours.bottomLeft, 6);
            });

        });
    });

});