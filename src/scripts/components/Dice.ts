import { GameScene } from "../scenes/GameScene";
import { Grid, Coord, Cell } from "./Grid";

interface DiceStyle {
	sides: number;
	tint: number;
	pattern: (coord:Coord, x:number, y:number) => boolean;
}

const diceStyles: DiceStyle[] = [
	{
		sides: 6,
		tint: 0xFF7777,
		pattern: (coord, x, y) => {
			return Math.abs(coord.i - x) + Math.abs(coord.j - y) <= 1;
		}
	},
	{
		sides: 6,
		tint: 0x77FF77,
		pattern: (coord, x, y) => {
			return coord.j == y;
		}
	},
	{
		sides: 6,
		tint: 0x7777FF,
		pattern: (coord, x, y) => {
			return coord.i == x;
		}
	}
];

export class Dice extends Phaser.GameObjects.Container {
	public scene: GameScene;

	public sprite: Phaser.GameObjects.Sprite;
	public text: Phaser.GameObjects.Text;
	public style: DiceStyle;
	public value: number;

	public dragging: boolean;
	public coord: Coord | null;

	constructor(scene: GameScene, x: number, y: number) {
		super(scene, x, y);
		this.scene = scene;
		scene.add.existing(this);

		this.style = Phaser.Math.RND.pick(diceStyles);
		this.value = Phaser.Math.Between(1, this.style.sides);

		this.sprite = scene.add.sprite(0, 0, 'd6');
		this.sprite.setOrigin(0.5, 0.6);
		this.sprite.setTint(this.style.tint);
		this.add(this.sprite);

		this.text = scene.createText(0, 0, 25, "#000", this.value.toString());
		this.text.setOrigin(0.5);
		this.text.setStroke("#FFFFFF", 5);
		this.add(this.text);

		const padding = 10;
		this.sprite.setInteractive({ hitArea: this.sprite, useHandCursor: true, draggable: true })
			.on('pointerdown', () => {
				this.dragging = true;
				this.emit('dragstart');
			}, this)
			.on('pointerup', () => {
				this.dragging = false;
				this.emit('dragend');
			}, this)
			.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
				this.emit('drag', pointer.x, pointer.y);
			}, this);
		// this.sprite.input.hitArea.setTo(-padding, -padding, this.sprite.width+2*padding, this.sprite.height+2*padding);
		// this.scene.input.enableDebug(this.sprite);
	}

	throw(coord: Coord, cell: Cell) {
		this.sprite.setScale(0.8 * cell.width / this.sprite.width);
		this.sprite.setTexture('d6_roll');
		this.setDepth(10 + cell.y + 0.01*cell.x);

		this.coord = coord;

		this.scene.tweens.add({
			targets: this,
			x: { from: this.x, to: cell.cx },
			y: { from: this.y, to: cell.cy },
			ease: 'Cubic.Out',
			duration: 1000,
			onComplete: () => {
				this.sprite.setTexture('d6');
			},
		});
	}

	move(coord: Coord, cell: Cell) {
		this.setDepth(10 + cell.y + 0.01*cell.x);

		this.coord = coord;

		this.scene.tweens.add({
			targets: this,
			x: { from: this.x, to: cell.cx },
			y: { from: this.y, to: cell.cy },
			ease: 'Cubic.Out',
			duration: 100
		});
	}
}
