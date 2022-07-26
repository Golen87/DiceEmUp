import { GameScene } from "../scenes/GameScene";
import { Enemy } from "../components/Enemy";
import { Dice } from "../components/Dice";
import { interpolateColor } from "../utils";

export interface Coord {
	i: number;
	j: number;
}

export interface Cell {
	x: number;
	y: number;
	cx: number;
	cy: number;
	width: number;
	height: number;
}

export class Grid extends Phaser.GameObjects.Container {
	public scene: GameScene;
	public graphics: Phaser.GameObjects.Graphics;

	public cols: number = 6;
	public rows: number = 5;
	public left: number = 400;
	public top: number = 190;
	public width: number = 80;
	public height: number = 62;
	public wPad: number = 2;
	public hPad: number = 2;

	public bg: Phaser.GameObjects.Image;
	public grid: any[][];
	public gridTiles: Phaser.GameObjects.Image[][];
	public gridHighlights: Phaser.GameObjects.Rectangle[][];
	public gridText: Phaser.GameObjects.Text[][];

	constructor(scene: GameScene) {
		super(scene, 0, 0);
		this.scene = scene;
		this.scene.add.existing(this);


		this.bg = this.scene.add.image(this.left-9, this.top-9, 'ui_board_border');
		this.bg.setOrigin(0);
		// this.bg.setScale((this.width*this.cols + 22) / this.bg.width);
		this.add(this.bg);

		// Debug graphics
		// this.graphics = this.scene.add.graphics();
		// this.graphics.setVisible(false);
		// this.add(this.graphics);

		this.grid = [];
		this.gridText = [];
		this.gridTiles = [];
		this.gridHighlights = [];
		for (let j = 0; j < this.rows; j++) {
			this.grid.push([]);
			this.gridText.push([]);
			this.gridTiles.push([]);
			this.gridHighlights.push([]);
			for (let i = 0; i < this.cols; i++) {
				this.newCell(i, j);
			}
		}
		this.newCell(this.cols, 0);

		this.updateGrid();
	}

	newCell(i: number, j: number) {
		this.grid[j].push(null);

		let cell = this.getCell({i, j});

		let tile = this.scene.add.image(cell.cx, cell.cy, 'ui_board_tile');
		tile.setScale(cell.width / tile.width);
		this.add(tile);
		this.gridTiles[j][i] = tile;

		let tile2 = this.scene.add.rectangle(cell.cx, cell.cy, cell.width, cell.height+1, 0xFFFF99, 1.0);
		this.add(tile2);
		this.gridHighlights[j][i] = tile2;

		const text = this.scene.createText(cell.x+cell.width, cell.y, 18, "#B71C1C", "")
		text.setStroke("#FFFFFF", 3);
		text.setOrigin(1.05, 0.15);
		this.add(text);
		this.gridText[j][i] = text;
	}

	update(time: number, delta: number) {
		for (let j = 0; j < this.rows; j++) {
			for (let i = 0; i < this.cols; i++) {
				this.gridHighlights[j][i].setAlpha(0);
				if (this.getHighlight({ i, j })) {
					this.gridHighlights[j][i].setAlpha( 0.4 + 0.1 * Math.sin(10*time) );
				}
			}
		}

		this.gridHighlights[0][this.cols].setAlpha(0);
		// if (this.getHighlight({ i:this.cols, j:0 })) {
			// this.gridHighlights[0][this.cols].setAlpha( 0.4 + 0.1 * Math.sin(10*time) );
		// }
	}

	getCell(coord: Coord): Cell {
		let x = this.left + coord.i * this.width + this.wPad;
		let y = this.top + coord.j * this.height + this.hPad;
		// Storage tile
		if (coord.i == this.cols) {
			x = this.left - 1.5 * this.width + this.wPad;
			y = this.top;
		}

		const width = this.width - 2*this.wPad;
		const height = this.height - 2*this.hPad;
		const cx = x + width/2;
		const cy = y + height/2;
		return {
			x,
			y,
			cx,
			cy,
			width,
			height,
		};
	}

	// getClosest(coord: Coord):Coord {
	// 	const x = Math.floor((coord.i-this.left)/this.width);
	// 	const y = Math.floor((coord.j-this.top)/this.height);
	// 	const minmax = (n, min, max) => Math.max(Math.min(n, max), min);
	// 	return {i: minmax(x, 0, this.cols), j: minmax(y, 0, this.rows)};
	// }

	getClosestCoord(x: number, y: number, dice?: Dice): Coord | null {
		let winner: Coord | null = null;
		let record = Infinity;

		const check = (coord: Coord, cell: Cell, slot: any) => {
			const dist = Math.abs(x-cell.cx) + Math.abs(y-cell.cy);
			if (dist < record && (!slot || slot == dice)) {
				record = dist;
				winner = coord;
			}
		};

		for (let j = 0; j < this.rows; j++) {
			for (let i = 0; i < this.cols; i++) {
				const coord: Coord = {i, j};
				check(coord, this.getCell(coord), this.grid[j][i]);
			}
		}

		const storage: Coord = {i:this.cols, j:0};
		check(storage, this.getCell(storage), this.grid[0][this.cols]);

		return winner;
	}

	getRandomFree(): Coord | null {
		let free: Coord[] = [];
		for (let j = 0; j < this.rows; j++) {
			for (let i = 0; i < this.cols; i++) {
				if (!this.grid[j][i]) {
					free.push({ i, j });
				}
			}
		}

		if (free.length > 0) {
			return Phaser.Math.RND.pick(free);
		}
		return null;
	}

	getRandomRightFree(y?: number): Coord | null {
		let free: Coord[] = [];
		for (let j = 0; j < this.rows; j++) {
			if (!this.grid[j][this.cols-1] && (y == j || y === undefined)) {
				free.push({ i: this.cols-1, j });
			}
		}

		if (free.length > 0) {
			return Phaser.Math.RND.pick(free);
		}
		return null;
	}

	getHighlight(coord: Coord) {
		for (let j = 0; j < this.rows; j++) {
			for (let i = 0; i < this.cols; i++) {
				if (this.grid[j][i] instanceof Dice) {
					if (this.grid[j][i].style.pattern(coord, i, j)) {
						if (this.grid[j][i].hovering || this.grid[j][i].dragging) {
							return true;
						}
					}
				}
			}
		}
		return false;
	}

	getDamage(coord: Coord) {
		let sum = 0;
		for (let j = 0; j < this.rows; j++) {
			for (let i = 0; i < this.cols; i++) {
				if (this.grid[j][i] instanceof Dice) {
					if (this.grid[j][i].style.pattern(coord, i, j)) {
						sum += this.grid[j][i].value;
					}
				}
			}
		}
		return sum;
	}

	getDamageGrid() {
		let grid: number[][] = [];
		for (let j = 0; j < this.rows; j++) {
			grid.push([]);
			for (let i = 0; i < this.cols; i++) {
				grid[j].push(this.getDamage({ i, j }));
			}
		}
		return grid;
	}

	updateGrid() {
		// this.graphics.clear();

		// this.graphics.fillStyle(0x000000, 0.5);
		// this.graphics.fillRect(
		// 	this.left,
		// 	this.top,
		// 	this.cols*this.width,
		// 	this.rows*this.height);

		for (let j = 0; j < this.rows; j++) {
			for (let i = 0; i < this.cols; i++) {

				const cell = this.getCell({i, j});
				const damage = this.getDamage({i, j});
				const scaledDamage = ((damage > 0 ? 2 : 0) + Math.min(damage, 8)) / 10;

				// this.graphics.fillStyle(interpolateColor(0xFFFFFF, 0xFF0000, scaledDamage), 0.7);
				// this.graphics.fillRect(
				// 	cell.x,
				// 	cell.y,
				// 	cell.width,
				// 	cell.height);

				this.gridText[j][i].setText(damage.toString());
				this.gridText[j][i].setVisible(damage > 0);

				this.gridTiles[j][i].setTint(interpolateColor(0xFFFFFF, 0xFF0000, scaledDamage));
			}
		}
	}

	explodeGrid() {
		for (let j = 0; j < this.rows; j++) {
			for (let i = 0; i < this.cols; i++) {

				const cell = this.getCell({i, j});
				const damage = this.getDamage({i, j});
				const scaledDamage = Math.min(damage, 10) / 10;

				if (damage > 0) {
					this.scene.particles.createExplosion(cell.cx, cell.cy, 0.3 + 0.3 * scaledDamage, 0.6 + 0.3 * scaledDamage);
				}
			}
		}
	}

	needMoreEnemies() {
		for (let j = 0; j < this.rows; j++) {
			for (let i = 0; i < this.cols-1; i++) {
				if (this.grid[j][i] instanceof Enemy) {
					return false;
				}
			}
		}
		return true;
	}


	addDice(coord: Coord, dice: Dice) {
		this.grid[coord.j][coord.i] = dice;
		dice.throw(coord, this.getCell(coord));
		this.updateGrid();
	}

	addEnemy(coord: Coord, enemy: Enemy, moveRight: boolean=true) {
		// Place enemy right of screen
		if (moveRight) {
			const cell = this.getCell(coord);
			enemy.x = this.scene.W + 20;
			enemy.y = cell.cy;
		}

		this.grid[coord.j][coord.i] = enemy;
		enemy.move(coord, this.getCell(coord));
		this.updateGrid();
	}

	clear(coord: Coord | null) {
		if (coord) {
			this.grid[coord.j][coord.i] = null;
		}
	}

	snap(x: number, y: number, dice: Dice) {
		const coord = this.getClosestCoord(x, y, dice);

		if (coord && dice.coord) {
			const cell = this.getCell(coord);
			if (dice.coord.i != coord.i || dice.coord.j != coord.j) {

				this.grid[coord.j][coord.i] = dice;
				this.grid[dice.coord.j][dice.coord.i] = null;
				this.updateGrid();

				dice.move(coord, cell, this.isStorage(coord));
			}
		}
	}

	isStorage(coord: Coord) {
		return (coord.i == this.cols && coord.j == 0);
	}

	moveEnemies() {
		for (let i = 1; i < this.cols; i++) {
			for (let j = 0; j < this.rows; j++) {
				if (this.grid[j][i] instanceof Enemy) {
					const enemy = this.grid[j][i];
					const next = enemy.getNextMove({i: i, j: j});
					if (!this.grid[next.j][next.i]) {
						this.grid[next.j][next.i] = enemy;
						this.grid[j][i] = null;
						enemy.move(next, this.getCell(next));
					}
				}
			}
		}
	}
}
