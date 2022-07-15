import { GameScene } from "../scenes/GameScene";
import { Grid, Cell } from "./Grid";

export class Dice extends Phaser.GameObjects.Container {
	public scene: GameScene;

	public sprite: Phaser.GameObjects.Sprite;
	public text: Phaser.GameObjects.Text;
	public pattern: number;
	public value: number;

	public dragging: boolean;

	constructor(scene: GameScene, x: number, y: number) {
		super(scene, x, y);
		this.scene = scene;
		scene.add.existing(this);

		this.pattern = Phaser.Math.RND.pick([0, 1, 2]);
		this.value = Phaser.Math.RND.pick([1, 2, 3, 4, 5, 6]);

		this.sprite = scene.add.sprite(0, 0, 'd6');
		this.sprite.setOrigin(0.5, 0.6);
		this.sprite.setTint([0xFF7777, 0x77FF77, 0x7777FF][this.pattern]);
		this.add(this.sprite);

		this.text = scene.createText(0, 0, 25, "#000", this.value.toString());
		this.text.setOrigin(0.5);
		this.text.setStroke("#FFFFFF", 5);
		this.add(this.text);

		const padding = 10;
		this.sprite.setInteractive({ hitArea: this.sprite, useHandCursor: true, draggable: true })
			.on('pointerdown', () => {
				this.dragging = true;
			}, this)
			.on('pointerup', () => {
				this.dragging = false;
			}, this)
			.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
				this.emit('drag', pointer.x, pointer.y);
			}, this);
		// this.sprite.input.hitArea.setTo(-padding, -padding, this.sprite.width+2*padding, this.sprite.height+2*padding);
		this.scene.input.enableDebug(this.sprite);
	}

	throw(cell: Cell) {
		this.sprite.setScale(0.8 * cell.width / this.sprite.width);
		this.sprite.setTexture('d6_roll');
		this.setDepth(10 + cell.y + 0.01*cell.x);

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
}
