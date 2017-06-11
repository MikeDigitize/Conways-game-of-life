# Conway's Game Of Life

Had an opportunity to build the game as part of a coding Kata. There's a basic UI implementation to see the game in action.

## Installing

```
npm i
// or

yarn

// then 
npm run dev
yarn run dev

// to just run tests
npm test
yarn run test
```
## Usage

Modify `app.js` file to configure the game.

```javascript
const game = new Game(gridSize, seed);
```
The `Game` class takes two arguments. The first is the grid size which can either be a single number or an Array of x and y sizes.

```javascript
let gridSize = 3; // produces a 3x3 grid
// or
gridSize = [10, 3]; // produces a 10 x 3 grid
```
The second is a seed object, defining which cells will start the game as alive, with the key as the cell index and the value as 1 to set to alive (will automatically set to 0 if a seed is not found).

```javascript
let seed = {
  3: 1,
  5: 1,
  8: 1
};  // sets cells with index of 3, 5 and 8 as alive
```
Call the `append` method on your game instance to append the grid to the page. The `append` method takes a HTML element as a target to append to but defaults to the `document.body` if no arguments are received.

```javascript
const game = new Game(gridSize, seed);
game.append();
```
To play a move of the game call the `tick` method on your game instance.

```javascript
game.tick();
```
To have the game autoplay call the `play` method to start and `stop` method to stop autoplaying.

```javascript
game.play();

// some time later
game.stop();
```
