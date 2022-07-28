import { GameScene } from "../scenes/GameScene";
import { BaseButton } from "./BaseButton";

export class AttackButton extends BaseButton {
	public scene: GameScene;

	public fire: Phaser.GameObjects.Sprite;
	public sprite: Phaser.GameObjects.Sprite;
	public text: Phaser.GameObjects.Text;

	public enabled: boolean;

	constructor(scene: GameScene, x: number, y: number) {
		super(scene, x, y);
		this.scene = scene;
		scene.add.existing(this);

		this.enabled = true;

		this.fire = scene.add.sprite(0, -30, 'attack_button_fire', 0);
		this.fire.setScale(0.6);
		this.add(this.fire);

		this.sprite = scene.add.sprite(0, 0, 'attack_button', 0);
		this.sprite.setScale(0.3);
		// this.sprite.setTint(0xFFCCCC);
		this.bindInteractive(this.sprite, false);
		this.add(this.sprite);

		this.text = scene.createText(0.5, 0.5, 20, "#FFF", "Attack"); // Subpixel blur fix
		this.text.setOrigin(0.5);
		this.text.setStroke("#000", 4);
		this.add(this.text);

		/*
		this.sprite.setInteractive({ hitArea: this.sprite, useHandCursor: this.enabled })
		this.sprite.input.hitArea.setTo(-20, -20, this.sprite.width+2*20, this.sprite.height+2*20);
		this.sprite.on('pointerover', () => {
			// this.sprite.setTint(0xFFEEEE);
			this.sprite.setFrame(1);
			this.scene.sound.play("u_hover", { volume: 0.25 });
		});
		this.sprite.on('pointerout', () => {
			// this.sprite.setTint(0xFFCCCC);
			this.sprite.setFrame(0);
		});
		this.sprite.on('pointerdown', () => {
			this.enabled ? this.emit('click') : this.scene.sound.play("u_disabled");
		});
		*/
	}

	update(timeMs: number, deltaMs: number) {
		this.sprite.setScale(0.3 - 0.02 * this.holdSmooth);
		this.fire.setFrame(Math.floor(10*timeMs/1000) % 8);
		this.sprite.setFrame(this.hold ? 1 : 0);
	}
}
