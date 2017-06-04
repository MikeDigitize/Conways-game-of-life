import Game from './game';

const start1 = { length : 14, seed : { 33: 1, 49: 1, 60: 1, 61: 1, 64: 1, 65: 1, 66: 1 } };
const start2 = { length : 3, seed : { 3: 1, 4: 1, 5: 1 } };
const start3 = { length : 10, seed : { 11: 1, 12: 1, 21: 1, 22: 1, 33: 1, 34: 1, 43: 1, 44: 1 } };
const start4 = { length : 38, seed : { 
	63: 1, 
	99: 1, 101: 1, 
	127: 1, 128: 1, 135: 1, 136: 1, 149: 1, 150: 1,
	164: 1, 168: 1, 173: 1, 174: 1, 187: 1, 188: 1,
	191: 1, 192: 1, 201: 1, 207: 1, 211: 1, 212: 1,
	229: 1, 230: 1, 239: 1, 243: 1, 245: 1, 246: 1, 251: 1, 253: 1,
	277: 1, 283: 1, 291: 1,
	316: 1, 320: 1,
	355: 1, 356: 1} };

window.game = new Game(start4.length, start4.seed);
window.game.append();