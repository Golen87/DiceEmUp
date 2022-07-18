import { SCALEDOWN } from "../constants";
import { GameScene } from "../scenes/GameScene";
import { BaseButton } from "./BaseButton";

export class MiniButton extends BaseButton {
	public scene: GameScene;

	public outerCircle: Phaser.GameObjects.Ellipse;
	public circle: Phaser.GameObjects.Ellipse;
	public sprite: Phaser.GameObjects.Sprite;

	public active: boolean;

	constructor(scene: GameScene, x: number, y: number, key: string) {
		super(scene, x, y);
		this.scene = scene;
		scene.add.existing(this);

		const size = 70/SCALEDOWN;
		this.active = true;

		this.outerCircle = this.scene.add.ellipse(0, 0, size+(16/SCALEDOWN), size+(16/SCALEDOWN), 0x111111);
		this.bindInteractive(this.outerCircle, false);
		this.add(this.outerCircle);

		this.circle = this.scene.add.ellipse(0, 0, size+(8/SCALEDOWN), size+(8/SCALEDOWN), 0xf28198);
		this.add(this.circle);

		this.sprite = scene.add.sprite(0, 0, key, this.active ? 0 : 1);
		this.sprite.setScale(size / this.sprite.width);
		this.add(this.sprite);
	}

	update(timeMs: number, deltaMs: number) {
		this.setScale(1 - 0.1 * this.holdSmooth);
	}

	toggle() {
		this.active = !this.active;
		this.sprite.setFrame(this.active ? 0 : 1);
		this.circle.fillColor = this.active ? 0xf28198 : 0xB0BEC5;
	}
}
