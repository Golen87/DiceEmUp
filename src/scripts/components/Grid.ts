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
	public height: number = 57;
	public wPad: number = 2;
	public hPad: number = 2;

	public grid: any[][];
	public gridText: Phaser.GameObjects.Text[][];

	constructor(scene: GameScene) {
		super(scene, 0, 0);
		this.scene = scene;
		scene.add.existing(this);


		// Debug graphics
		this.graphics = scene.add.graphics();
		this.add(this.graphics);

		this.grid = [];
		this.gridText = [];
		for (let j = 0; j < this.rows; j++) {
			this.grid.push([]);
			this.gridText.push([]);
			for (let i = 0; i < this.cols; i++) {
				this.grid[j].push(null);

				let cell = this.getCell({i, j});
				const text = scene.createText(cell.x, cell.y, 20, "#000", "")
				text.setStroke("#FFFFFF", 3);
				text.setOrigin(-0.1, 0.1);
				this.add(text);
				this.gridText[j][i] = text;
			}
		}

		this.updateGrid();
	}

	getCell(coord: Coord): Cell {
		const x = this.left + coord.i * this.width + this.wPad;
		const y = this.top + coord.j * this.height + this.hPad;
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

	getRandomRightFree(): Coord | null {
		let free: Coord[] = [];
		for (let j = 0; j < this.rows; j++) {
			if (!this.grid[j][this.cols-1]) {
				free.push({ i: this.cols-1, j });
			}
		}

		if (free.length > 0) {
			return Phaser.Math.RND.pick(free);
		}
		return null;
	}

	getDamage(coord: Coord) {

		const patternCheck = [
			(i, j) => {
				return Math.abs(coord.i - i) + Math.abs(coord.j - j) <= 1;
			},
			(i, j) => {
				return coord.j == j;
			},
			(i, j) => {
				return coord.i == i;
			},
		];

		if (this.grid[coord.j][coord.i] instanceof Dice) {
			return 0;
		}

		let sum = 0;
		for (let j = 0; j < this.rows; j++) {
			for (let i = 0; i < this.cols; i++) {
				if (this.grid[j][i] instanceof Dice) {
					if (patternCheck[this.grid[j][i].pattern](i, j)) {
						sum += this.grid[j][i].value;
					}
				}
			}
		}
		return sum;
	}

	updateGrid() {
		this.graphics.clear();

		this.graphics.fillStyle(0x000000, 0.5);
		this.graphics.fillRect(
			this.left,
			this.top,
			this.cols*this.width,
			this.rows*this.height);

		for (let j = 0; j < this.rows; j++) {
			for (let i = 0; i < this.cols; i++) {

				const cell = this.getCell({i, j});
				const damage = this.getDamage({i, j});

				this.graphics.fillStyle(interpolateColor(0xFFFFFF, 0xFF0000, Math.min(damage/10, 1)), 0.7);
				this.graphics.fillRect(
					cell.x,
					cell.y,
					cell.width,
					cell.height);

				this.gridText[j][i].setText(damage.toString());
				this.gridText[j][i].setVisible(damage > 0);
			}
		}
	}


	addDice(coord: Coord, dice: Dice) {
		this.grid[coord.j][coord.i] = dice;
		dice.throw(this.getCell(coord));
		this.updateGrid();
	}

	addEnemy(coord: Coord, enemy: Enemy) {
		this.grid[coord.j][coord.i] = enemy;
		enemy.move(this.getCell(coord));
		this.updateGrid();
	}

	snap(x: number, y: number, dice: Dice) {
		let closest: any = null;
		let record = Infinity;
		for (let j = 0; j < this.rows; j++) {
			for (let i = 0; i < this.cols; i++) {
				const cell = this.getCell({i, j});
				const dist = Math.abs(x-cell.cx) + Math.abs(y-cell.cy);
				if (dist < record) {
					record = dist;
					closest = { x: cell.cx, y: cell.cy };
				}
			}
		}

		dice.x = closest.x;
		dice.y = closest.y;
	}
}
