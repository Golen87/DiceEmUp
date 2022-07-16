import { GameScene } from "../scenes/GameScene";
import { Grid, Coord, Cell } from "./Grid";
import { audios } from "../assets";

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

	public shadow: Phaser.GameObjects.Sprite;
	public sprite: Phaser.GameObjects.Sprite;
	public text: Phaser.GameObjects.Text;
	public style: DiceStyle;
	public value: number;

	public dragging: boolean;
	public coord: Coord | null;
	public lastDragSound: number;

	private bounceValue: number;

	constructor(scene: GameScene, x: number, y: number) {
		super(scene, x, y);
		this.scene = scene;
		scene.add.existing(this);

		this.style = Phaser.Math.RND.pick(diceStyles);
		this.value = Phaser.Math.Between(1, this.style.sides);
		this.bounceValue = 0;

		this.shadow = scene.add.sprite(0, 0, 'shadow');
		this.shadow.setOrigin(0.5, 0.6);
		this.add(this.shadow);

		this.sprite = scene.add.sprite(0, 0, 'd6');
		this.sprite.setOrigin(0.5, 0.6);
		this.sprite.setTint(this.style.tint);
		this.add(this.sprite);

		this.text = scene.createText(0, 0, 25, "#000", this.value.toString());
		this.text.setOrigin(0.5);
		this.text.setStroke("#FFFFFF", 5);
		this.add(this.text);

		this.lastDragSound = Date.now();

		const padding = 10;
		this.sprite.setInteractive({ hitArea: this.sprite, useHandCursor: true, draggable: true })
			.on('pointerdown', () => {
				this.dragging = true;
				this.emit('dragstart');
				this.scene.sound.play(`h_fondle_hard_${Phaser.Math.Between(1,3)}`);
			}, this)
			.on('pointerup', () => {
				this.dragging = false;
				this.emit('dragend');
				this.scene.sound.play(`t_place_single_short_${Phaser.Math.Between(1,5)}`); // Phaser.Math.RND.pick(["long", "short"])
			}, this)
			.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
				this.emit('drag', pointer.x, pointer.y);
			}, this)
			.on('pointerover', () => {
				this.scene.sound.play(`d_dice_tap_short_${Phaser.Math.Between(1,5)}`);
			}, this);
		// this.sprite.input.hitArea.setTo(-padding, -padding, this.sprite.width+2*padding, this.sprite.height+2*padding);
		// this.scene.input.enableDebug(this.sprite);
	}

	update(timeMs: number, deltaMs: number) {
		super.update(timeMs, deltaMs);

		this.sprite.setOrigin(0.5, 0.6 + 2.0 * this.bounceValue);
		this.shadow.setAlpha(0.5 - 0.2 * this.bounceValue);
	}

	async throw(coord: Coord, cell: Cell) {
		this.sprite.setScale(0.8 * cell.width / this.sprite.width);
		this.shadow.setScale(0.8 * cell.width / this.sprite.width);
		this.sprite.setTexture('d6_roll');
		this.setDepth(10 + cell.y + 0.01*cell.x);

		this.coord = coord;

		const duration = Phaser.Math.RND.between(1200, 1600);

		// Movement animation
		this.scene.tweens.add({
			targets: this,
			x: { from: this.x, to: cell.cx },
			y: { from: this.y, to: cell.cy },
			ease: 'Cubic.Out',
			duration: duration,
			onComplete: () => {
				this.sprite.setTexture('d6');
			},
		});

		// Bounce animation
		this.scene.tweens.add({
			targets: this,
			bounceValue: { from: 0, to: 1 },
			ease: 'Cubic.Out',
			duration: 0.25 * duration,

			// At peak of throw
			onComplete: () => {
				this.scene.tweens.add({
					targets: this,
					bounceValue: { from: 1, to: 0 },
					ease: 'Bounce.Out',
					duration: 0.75 * duration
				});
			}
		});

		// Dice rolling audio
		this.scene.addEvent(0.6 * duration, () => {
			this.scene.sound.play(`t_throw_desk_multiple_${Phaser.Math.Between(1,5)}`);
		});

		return true;
	}

	move(coord: Coord, cell: Cell) {
		this.setDepth(10 + cell.y + 0.01*cell.x);

		this.coord = coord;

		// Dice dragging audio
		const now = Date.now()
		if (now - this.lastDragSound > 170) { // Some basic debouncing
			this.scene.sound.play(`t_sweep_single_${Phaser.Math.Between(1,6)}`);
			this.lastDragSound = now;
		}

		this.scene.tweens.add({
			targets: this,
			x: { from: this.x, to: cell.cx },
			y: { from: this.y, to: cell.cy },
			ease: 'Cubic.Out',
			duration: 100
		});
	}
}
