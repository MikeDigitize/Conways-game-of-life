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

        describe('Cells should be aware of their left relations in a grid size of 1', function() {
            
            it('Should know the left cell\'s are not active if index = 0', function() {
                const index = 0;
                const gridSize = 1;
                const cell = new Cell(1, index, gridSize);
                assert.equal(cell.neighbours.left, null);
                assert.equal(cell.neighbours.topLeft, null);
                assert.equal(cell.neighbours.bottomLeft, null);
            });

        });

        describe('Cells should be aware of their left relations in a grid size of 2', function() {
            
            it('Should know the left cell\'s are not active if index = 0', function() {
                const index = 0;
                const gridSize = 2;
                const cell = new Cell(1, index, gridSize);
                assert.equal(cell.neighbours.left, null);
                assert.equal(cell.neighbours.topLeft, null);
                assert.equal(cell.neighbours.bottomLeft, null);
            });

            it('Should know the left cell\'s are not active if index = 3', function() {
                const index = 3;
                const gridSize = 2;
                const cell = new Cell(1, index, gridSize);
                assert.equal(cell.neighbours.left, 2);
                assert.equal(cell.neighbours.topLeft, 0);
                assert.equal(cell.neighbours.bottomLeft, null);
            });

        });

        describe('Cells should be aware of their left relations in a grid size of 3', function() {
            
            it('Should know the left cell\'s are not active if index = 0', function() {
                const index = 0;
                const gridSize = 3;
                const cell = new Cell(1, index, gridSize);
                assert.equal(cell.neighbours.left, null);
                assert.equal(cell.neighbours.topLeft, null);
                assert.equal(cell.neighbours.bottomLeft, null);
            });

            it('Should know the left cell\'s state if index = 1', function() {
                const index = 1;
                const gridSize = 3;
                const cell = new Cell(1, index, gridSize);
                assert.equal(cell.neighbours.left, 0);
                assert.equal(cell.neighbours.topLeft, null);
                assert.equal(cell.neighbours.bottomLeft, 3);
            });

            it('Should know the left cell\'s state if index = 4', function() {
                const index = 4;
                const gridSize = 3;
                const cell = new Cell(1, index, gridSize);
                assert.equal(cell.neighbours.left, 3);
                assert.equal(cell.neighbours.topLeft, 0);
                assert.equal(cell.neighbours.bottomLeft, 6);
            });

            it('Should know the left cell\'s state if index = 6', function() {
                const index = 6;
                const gridSize = 3;
                const cell = new Cell(1, index, gridSize);
                assert.equal(cell.neighbours.left, null);
                assert.equal(cell.neighbours.topLeft, null);
                assert.equal(cell.neighbours.bottomLeft, null);
            });

            it('Should know the left cell\'s state if index = 8', function() {
                const index = 8;
                const gridSize = 3;
                const cell = new Cell(1, index, gridSize);
                assert.equal(cell.neighbours.left, 7);
                assert.equal(cell.neighbours.topLeft, 4);
                assert.equal(cell.neighbours.bottomLeft, null);
            });

        });

        describe('Cells should be aware of their top and bottom relations in a grid size of 3', function() {
            
            it('Should know the top cell\'s are not active and bottom are if index = 0', function() {
                const index = 0;
                const gridSize = 3;
                const cell = new Cell(1, index, gridSize);
                assert.equal(cell.neighbours.top, null);
            });

            it('Should know the top cell\'s state if index = 1', function() {
                const index = 3;
                const gridSize = 3;
                const cell = new Cell(1, index, gridSize);
                assert.equal(cell.neighbours.top, 0);
            });

            it('Should know the left cells state if index = 4', function() {
                const index = 5;
                const gridSize = 3;
                const cell = new Cell(1, index, gridSize);
                assert.equal(cell.neighbours.top, 2);
            });

            it('Should know the left cells state if index = 6', function() {
                const index = 6;
                const gridSize = 3;
                const cell = new Cell(1, index, gridSize);
                assert.equal(cell.neighbours.top, 3);
            });

            it('Should know the left cells state if index = 8', function() {
                const index = 8;
                const gridSize = 3;
                const cell = new Cell(1, index, gridSize);
                assert.equal(cell.neighbours.top, 5);
            });

        });

    });

});