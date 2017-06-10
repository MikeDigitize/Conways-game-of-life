import assert from 'assert';
import Cell from '../src/cell';

describe('Game of life', function() {

    describe('Cell awareness', function() {

        describe('Cells should be aware of their left and right relations in a grid size of 1', function() {
            
            it('Should know the left and right cells are not active if index = 0', function() {
                const index = 0;
                const gridSize = 1;
                const cell = new Cell(index, gridSize, 1);
                assert.equal(cell.neighbours.left, null);
                assert.equal(cell.neighbours.topLeft, null);
                assert.equal(cell.neighbours.bottomLeft, null);
                assert.equal(cell.neighbours.right, null);
                assert.equal(cell.neighbours.topRight, null);
                assert.equal(cell.neighbours.bottomRight, null);
            });

        });

        describe('Cells should be aware of their left and right relations in a grid size of 2', function() {
            
            it('Should know the left and right cell\'s state if index = 0', function() {
                const index = 0;
                const gridSize = 2;
                const cell = new Cell(index, gridSize, 1);
                assert.equal(cell.neighbours.left, null);
                assert.equal(cell.neighbours.topLeft, null);
                assert.equal(cell.neighbours.bottomLeft, null);
                assert.equal(cell.neighbours.right, 1);
                assert.equal(cell.neighbours.topRight, null);
                assert.equal(cell.neighbours.bottomRight, 3);
            });

            it('Should know the left and right cell\'s state if index = 3', function() {
                const index = 3;
                const gridSize = 2;
                const cell = new Cell(index, gridSize, 1);
                assert.equal(cell.neighbours.left, 2);
                assert.equal(cell.neighbours.topLeft, 0);
                assert.equal(cell.neighbours.bottomLeft, null);
                assert.equal(cell.neighbours.right, null);
                assert.equal(cell.neighbours.topRight, null);
                assert.equal(cell.neighbours.bottomRight, null);
            });

        });

        describe('Cells should be aware of their left relations in a grid size of 3', function() {
            
            it('Should know the left and right cell\'s state if index = 0', function() {
                const index = 0;
                const gridSize = 3;
                const cell = new Cell(index, gridSize, 1);
                assert.equal(cell.neighbours.left, null);
                assert.equal(cell.neighbours.topLeft, null);
                assert.equal(cell.neighbours.bottomLeft, null);
                assert.equal(cell.neighbours.right, 1);
                assert.equal(cell.neighbours.topRight, null);
                assert.equal(cell.neighbours.bottomRight, 4);
            });

            it('Should know the left and right cell\'s state if index = 1', function() {
                const index = 1;
                const gridSize = 3;
                const cell = new Cell(index, gridSize, 1);
                assert.equal(cell.neighbours.left, 0);
                assert.equal(cell.neighbours.topLeft, null);
                assert.equal(cell.neighbours.bottomLeft, 3);
                assert.equal(cell.neighbours.right, 2);
                assert.equal(cell.neighbours.topRight, null);
                assert.equal(cell.neighbours.bottomRight, 5);
            });

            it('Should know the left and right cell\'s state if index = 4', function() {
                const index = 4;
                const gridSize = 3;
                const cell = new Cell(index, gridSize, 1);
                assert.equal(cell.neighbours.left, 3);
                assert.equal(cell.neighbours.topLeft, 0);
                assert.equal(cell.neighbours.bottomLeft, 6);
                assert.equal(cell.neighbours.right, 5);
                assert.equal(cell.neighbours.topRight, 2);
                assert.equal(cell.neighbours.bottomRight, 8);
            });

            it('Should know the left and right cell\'s state if index = 6', function() {
                const index = 6;
                const gridSize = 3;
                const cell = new Cell(index, gridSize, 1);
                assert.equal(cell.neighbours.left, null);
                assert.equal(cell.neighbours.topLeft, null);
                assert.equal(cell.neighbours.bottomLeft, null);
                assert.equal(cell.neighbours.right, 7);
                assert.equal(cell.neighbours.topRight, 4);
                assert.equal(cell.neighbours.bottomRight, null);
            });

            it('Should know the left and right cell\'s state if index = 8', function() {
                const index = 8;
                const gridSize = 3;
                const cell = new Cell(index, gridSize, 1);
                assert.equal(cell.neighbours.left, 7);
                assert.equal(cell.neighbours.topLeft, 4);
                assert.equal(cell.neighbours.bottomLeft, null);
            });

        });

        describe('Cells should be aware of their top and bottom relations in a grid size of 1', function() {
            
            it('Should know the top and bottom cells are not active if index = 0', function() {
                const index = 0;
                const gridSize = 1;
                const cell = new Cell(index, gridSize, 1);
                assert.equal(cell.neighbours.top, null);
                assert.equal(cell.neighbours.bottom, null);
            });

        });

        describe('Cells should be aware of their top and bottom relations in a grid size of 2', function() {
            
            it('Should know the top cell is not active and the bottom is if index = 0', function() {
                const index = 0;
                const gridSize = 2;
                const cell = new Cell(index, gridSize, 1);
                assert.equal(cell.neighbours.top, null);
                assert.equal(cell.neighbours.bottom, 2);
            });

            it('Should know the top cell is active and the bottom isn\'t if index = 3', function() {
                const index = 3;
                const gridSize = 2;
                const cell = new Cell(index, gridSize, 1);
                assert.equal(cell.neighbours.top, 1);
                assert.equal(cell.neighbours.bottom, null);
            });

        });

        describe('Cells should be aware of their top and bottom relations in a grid size of 3', function() {
            
            it('Should know the top cell is not active and bottom is if index = 0', function() {
                const index = 0;
                const gridSize = 3;
                const cell = new Cell(index, gridSize, 1);
                assert.equal(cell.neighbours.top, null);
                assert.equal(cell.neighbours.bottom, 3);
            });

            it('Should know the top and bottom cell\'s state if index = 1', function() {
                const index = 3;
                const gridSize = 3;
                const cell = new Cell(index, gridSize, 1);
                assert.equal(cell.neighbours.top, 0);
                assert.equal(cell.neighbours.bottom, 6);
            });

            it('Should know the top and bottom cell\'s state if index = 4', function() {
                const index = 5;
                const gridSize = 3;
                const cell = new Cell(index, gridSize, 1);
                assert.equal(cell.neighbours.top, 2);
                assert.equal(cell.neighbours.bottom, 8);
            });

            it('Should know the top and bottom cell\'s state if index = 6', function() {
                const index = 6;
                const gridSize = 3;
                const cell = new Cell(index, gridSize, 1);
                assert.equal(cell.neighbours.top, 3);
                assert.equal(cell.neighbours.bottom, null);
            });

            it('Should know the top and bottom cell\'s state if index = 8', function() {
                const index = 8;
                const gridSize = 3;
                const cell = new Cell(index, gridSize, 1);
                assert.equal(cell.neighbours.top, 5);
                assert.equal(cell.neighbours.bottom, null);
            });

        });

        describe('Cells should be aware of their left and right relations in a grid size of 3 x 4', function() {
            
            it('Should know the right, top right and bottom right cells are not active if index = 8', function() {
                const index = 8;
                const gridSize = [3,4];
                const cell = new Cell(index, gridSize, 1);
                assert.equal(cell.neighbours.left, 7);
                assert.equal(cell.neighbours.topLeft, 4);
                assert.equal(cell.neighbours.top, 5);
                assert.equal(cell.neighbours.bottomLeft, 10);
                assert.equal(cell.neighbours.bottom, 11);
                assert.equal(cell.neighbours.right, null);
                assert.equal(cell.neighbours.topRight, null);
                assert.equal(cell.neighbours.bottomRight, null);
            });

            it('Should know the right, top right and bottom right cells are not active if index = 8', function() {
                const index = 11;
                const gridSize = [3,4];
                const cell = new Cell(index, gridSize, 1);
                assert.equal(cell.neighbours.left, 10);
                assert.equal(cell.neighbours.topLeft, 7);
                assert.equal(cell.neighbours.top, 8);
                assert.equal(cell.neighbours.bottomLeft, null);
                assert.equal(cell.neighbours.bottom, null);
                assert.equal(cell.neighbours.right, null);
                assert.equal(cell.neighbours.topRight, null);
                assert.equal(cell.neighbours.bottomRight, null);
            });

        });

    });

});