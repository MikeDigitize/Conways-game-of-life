import assert from 'assert';
import Game from '../src/game';

describe('Game of life', function() {

    describe('Should initialise a grid', function() {

        it('should initialise with specified live cells in a grid size of 3', function() {
            const seed = {
                0: 1,
                1: 1
            };
            const game = new Game(3, seed);
            game.tick();
            assert.equal(game.grid.length, 9);
            assert.equal(game.grid[0].state, 1);
            assert.equal(game.grid[1].state, 1);
            assert.equal(game.grid[2].state, 0);
            assert.equal(game.grid[5].state, 0);
        });

    });

});