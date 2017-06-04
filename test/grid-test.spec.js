import globalJsdom from 'jsdom-global';
import assert from 'assert';
import Grid from '../src/grid';

describe('Game of life', function() {

		globalJsdom();

    describe('Grid', function() {

        describe('Grid size of 1', function() {

            it('should create a single dead cell in a 1x1 grid', function() {
            	const gridSize = 1;
            	const grid = new Grid(gridSize);
            	const [row] = grid.dom;  
            	const { cells } = grid; 
            	const { tagName, classList, children } = row;
            	const [cell] = children;            	
              assert.equal(grid.dom.length, 1);
              assert.equal(tagName.toLowerCase(), 'div');
              assert.equal(classList, 'row');
              assert.equal(children.length, 1);
              assert.equal(cell.tagName.toLowerCase(), 'span');
              assert.equal(cell.classList.contains('cell'), true);
              assert.equal(cell.classList.contains('alive'), false);
              assert.equal(cell.children.length, 0);
              assert.equal(cells.length, 1);
              assert.equal(cells[0].classList.contains('alive'), false);
            });

            it('should create a single live cell in a 1x1 grid', function() {
            	const gridSize = 1;
            	const seed = { 0: 1 };
            	const grid = new Grid(gridSize, seed);
            	const [row] = grid.dom;  
            	const { cells } = grid;           	
            	const [cell] = row.children;  
            	const { tagName, classList, children } = cell;          	
              assert.equal(cell.classList.contains('alive'), true);
              assert.equal(cell.children.length, 0);
              assert.equal(cells.length, 1);
              assert.equal(cells[0].classList.contains('alive'), true);
            });

        });

        describe('Grid size of 2', function() {

            it('should create four dead cells in a 2x2 grid', function() {
            	const gridSize = 2;
            	const grid = new Grid(gridSize);
            	const [row1, row2] = grid.dom;
            	const { cells } = grid;   
            	const [cell1, cell2] = row1.children;
            	const [cell3, cell4] = row2.children;
              assert.equal(grid.dom.length, 2);
              assert.equal(row1.children.length, 2);
              assert.equal(row2.children.length, 2);
              assert.equal(cell1.classList.contains('alive'), false);
              assert.equal(cell2.classList.contains('alive'), false);
              assert.equal(cell3.classList.contains('alive'), false);
              assert.equal(cell4.classList.contains('alive'), false);
              assert.equal(cells.length, 4);
              assert.equal(cells[0].classList.contains('alive'), false);
              assert.equal(cells[1].classList.contains('alive'), false);
              assert.equal(cells[2].classList.contains('alive'), false);
              assert.equal(cells[3].classList.contains('alive'), false);
            });

            it('should create four live cells in a 2x2 grid', function() {
            	const gridSize = 2;
            	const seed = { 0: 1, 1: 1, 2: 1, 3: 1 };
            	const grid = new Grid(gridSize, seed);
            	const [row1, row2] = grid.dom;
            	const { cells } = grid;   
            	const [cell1, cell2] = row1.children;
            	const [cell3, cell4] = row2.children;
              assert.equal(grid.dom.length, 2);
              assert.equal(row1.children.length, 2);
              assert.equal(row2.children.length, 2);
              assert.equal(cell1.classList.contains('alive'), true);
              assert.equal(cell2.classList.contains('alive'), true);
              assert.equal(cell3.classList.contains('alive'), true);
              assert.equal(cell4.classList.contains('alive'), true);
              assert.equal(cells.length, 4);
              assert.equal(cells[0].classList.contains('alive'), true);
              assert.equal(cells[1].classList.contains('alive'), true);
              assert.equal(cells[2].classList.contains('alive'), true);
              assert.equal(cells[3].classList.contains('alive'), true);
            });

        });

        describe('Grid size of 3', function() {

            it('should create nine dead cells in a 3x3 grid', function() {
            	const gridSize = 3;
            	const grid = new Grid(gridSize);
            	const [row1, row2, row3] = grid.dom;
            	const { cells } = grid;  
            	const [cell1, cell2, cell3] = row1.children;
            	const [cell4, cell5, cell6] = row2.children;
            	const [cell7, cell8, cell9] = row3.children;
              assert.equal(grid.dom.length, 3);
              assert.equal(row1.children.length, 3);
              assert.equal(row2.children.length, 3);
              assert.equal(row3.children.length, 3);
              assert.equal(cell1.classList.contains('alive'), false);
              assert.equal(cell2.classList.contains('alive'), false);
              assert.equal(cell3.classList.contains('alive'), false);
              assert.equal(cell4.classList.contains('alive'), false);
              assert.equal(cell5.classList.contains('alive'), false);
              assert.equal(cell6.classList.contains('alive'), false);
              assert.equal(cell7.classList.contains('alive'), false);
              assert.equal(cell8.classList.contains('alive'), false);
              assert.equal(cell9.classList.contains('alive'), false);
              assert.equal(cells.length, 9);
              assert.equal(cells[0].classList.contains('alive'), false);
              assert.equal(cells[1].classList.contains('alive'), false);
              assert.equal(cells[2].classList.contains('alive'), false);
              assert.equal(cells[3].classList.contains('alive'), false);
              assert.equal(cells[4].classList.contains('alive'), false);
              assert.equal(cells[5].classList.contains('alive'), false);
              assert.equal(cells[6].classList.contains('alive'), false);
              assert.equal(cells[7].classList.contains('alive'), false);
              assert.equal(cells[8].classList.contains('alive'), false);
            });

            it('should create nine live cells in a 3x3 grid', function() {
            	const gridSize = 3;
            	const seed = { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1 };
            	const grid = new Grid(gridSize, seed);
            	const [row1, row2, row3] = grid.dom;
            	const { cells } = grid;  
            	const [cell1, cell2, cell3] = row1.children;
            	const [cell4, cell5, cell6] = row2.children;
            	const [cell7, cell8, cell9] = row3.children;
              assert.equal(grid.dom.length, 3);
              assert.equal(row1.children.length, 3);
              assert.equal(row2.children.length, 3);
              assert.equal(row3.children.length, 3);
              assert.equal(cell1.classList.contains('alive'), true);
              assert.equal(cell2.classList.contains('alive'), true);
              assert.equal(cell3.classList.contains('alive'), true);
              assert.equal(cell4.classList.contains('alive'), true);
              assert.equal(cell5.classList.contains('alive'), true);
              assert.equal(cell6.classList.contains('alive'), true);
              assert.equal(cell7.classList.contains('alive'), true);
              assert.equal(cell8.classList.contains('alive'), true);
              assert.equal(cell9.classList.contains('alive'), true);
              assert.equal(cells.length, 9);
              assert.equal(cells[0].classList.contains('alive'), true);
              assert.equal(cells[1].classList.contains('alive'), true);
              assert.equal(cells[2].classList.contains('alive'), true);
              assert.equal(cells[3].classList.contains('alive'), true);
              assert.equal(cells[4].classList.contains('alive'), true);
              assert.equal(cells[5].classList.contains('alive'), true);
              assert.equal(cells[6].classList.contains('alive'), true);
              assert.equal(cells[7].classList.contains('alive'), true);
              assert.equal(cells[8].classList.contains('alive'), true);
            });

            it('should create scattered live cells in a 3x3 grid', function() {
            	const gridSize = 3;
            	const seed = { 0: 1, 3: 1, 6: 1, 7: 1 };
            	const grid = new Grid(gridSize, seed);
            	const [row1, row2, row3] = grid.dom;
            	const { cells } = grid;  
            	const [cell1, cell2, cell3] = row1.children;
            	const [cell4, cell5, cell6] = row2.children;
            	const [cell7, cell8, cell9] = row3.children;
              assert.equal(grid.dom.length, 3);
              assert.equal(row1.children.length, 3);
              assert.equal(row2.children.length, 3);
              assert.equal(row3.children.length, 3);
              assert.equal(cell1.classList.contains('alive'), true);
              assert.equal(cell2.classList.contains('alive'), false);
              assert.equal(cell3.classList.contains('alive'), false);
              assert.equal(cell4.classList.contains('alive'), true);
              assert.equal(cell5.classList.contains('alive'), false);
              assert.equal(cell6.classList.contains('alive'), false);
              assert.equal(cell7.classList.contains('alive'), true);
              assert.equal(cell8.classList.contains('alive'), true);
              assert.equal(cell9.classList.contains('alive'), false);
              assert.equal(cells.length, 9);
              assert.equal(cells[0].classList.contains('alive'), true);
              assert.equal(cells[1].classList.contains('alive'), false);
              assert.equal(cells[2].classList.contains('alive'), false);
              assert.equal(cells[3].classList.contains('alive'), true);
              assert.equal(cells[4].classList.contains('alive'), false);
              assert.equal(cells[5].classList.contains('alive'), false);
              assert.equal(cells[6].classList.contains('alive'), true);
              assert.equal(cells[7].classList.contains('alive'), true);
              assert.equal(cells[8].classList.contains('alive'), false);
            });

        });

    });

});