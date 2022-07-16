import { GameScene } from "../scenes/GameScene";

export class Button extends Phaser.GameObjects.Container {
	public scene: GameScene;

	public sprite: Phaser.GameObjects.Sprite;
	public text: Phaser.GameObjects.Text;

	public enabled: boolean;

	constructor(scene: GameScene, x: number, y: number) {
		super(scene, x, y);
		this.scene = scene;
		scene.add.existing(this);

		this.enabled = true;

		this.sprite = scene.add.sprite(0, 0, 'button');
		this.sprite.setScale(0.4);
		this.sprite.setTint(0xFFCCCC);
		this.add(this.sprite);

		this.text = scene.createText(0, 0, 25, "#000", "Attack");
		this.text.setOrigin(0.5);
		this.text.setStroke("#FFFFFF", 5);
		this.add(this.text);

		this.sprite.setInteractive({ hitArea: this.sprite, useHandCursor: this.enabled })
		this.sprite.input.hitArea.setTo(-20, -20, this.sprite.width+2*20, this.sprite.height+2*20);
		this.sprite.on('pointerover', () => { this.sprite.setTint(0xFFEEEE); });
		this.sprite.on('pointerout', () => { this.sprite.setTint(0xFFCCCC); });
		this.sprite.on('pointerdown', () => { this.enabled ? this.emit('click') : this.scene.sound.play("u_disabled"); });
	}
}
