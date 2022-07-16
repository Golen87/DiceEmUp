import { GameScene } from "../scenes/GameScene";


export class Dragon extends Phaser.GameObjects.Container {
	public scene: GameScene;

	// Graphics
	public sprite: Phaser.GameObjects.Sprite;
	public text: Phaser.GameObjects.Text;

	public maxHealth: number;
	public health: number;
	private hurtTimer: number;
	private deathTimer: number;
	private deathDuration;

	constructor(scene: GameScene, x: number, y: number) {
		super(scene, x, y);
		this.scene = scene;
		scene.add.existing(this);

		this.maxHealth = Math.floor((3 + 13 * Math.random()));
		this.health = this.maxHealth;
		this.hurtTimer = 0;
		this.deathTimer = 0;
		this.deathDuration = 1000;

		// Create player sprite
		this.sprite = scene.add.sprite(0, 0, 'dragon', 0);
		this.sprite.setOrigin(0.0, 0.5);
		scene.containToScreen(this.sprite);
		this.add(this.sprite);

		this.text = scene.createText(0, 0, 25, "#000", "");
		this.text.setOrigin(0.5);
		this.text.setStroke("#FFFFFF", 5);
		this.add(this.text);

		this.scene.anims.create({
			key: 'dragon_idle',
			frames: [
				{ key: 'dragon', frame: 0, duration: 600 },
				{ key: 'dragon', frame: 1, duration: 400 },
				{ key: 'dragon', frame: 2, duration: 600 },
				{ key: 'dragon', frame: 1, duration: 400 },
			],
			repeat: -1
		});
		this.scene.anims.create({
			key: 'dragon_throw',
			frames: [
				{ key: 'dragon', frame: 0, duration: 200 },
				{ key: 'dragon', frame: 4, duration: 200 },
				{ key: 'dragon', frame: 5, duration: 200 },
			],
		});
		this.scene.anims.create({
			key: 'dragon_return',
			frames: [
				{ key: 'dragon', frame: 6, duration: 300 },
				{ key: 'dragon', frame: 7, duration: 700 },
			],
		});

		this.sprite.play({ key: 'dragon_idle' });
		this.sprite.on('animationcomplete', () => {
			if (this.sprite.anims.currentAnim.key == 'dragon_throw') {
				this.emit('throw');
				this.sprite.play({ key: 'dragon_return' });
			}
			else if (this.sprite.anims.currentAnim.key == 'dragon_return') {
				this.sprite.play({ key: 'dragon_idle' });
			}
		});
	}

	update(timeMs: number, deltaMs: number) {
		super.update(timeMs, deltaMs);

		// this.sprite.setFrame(Math.round(1 + Math.sin(2*timeMs/1000)));

		// Hurt animation
		this.hurtTimer -= deltaMs;
		if (this.hurtTimer > 0 || !this.alive) {
			let blink = (Math.sin(0.03*timeMs) > 0);
			this.sprite.setTint(blink ? 0xFF7777 : 0xFFFFFF);
			this.sprite.setAlpha(0.5);
			// this.sprite.setOrigin(0.5 + 0.01 * Math.sin(35*time), 0.5);
		}
		else {
			this.sprite.setTint(0xFFFFFF);
			this.sprite.setAlpha(1);
			// this.sprite.setOrigin(0.5, 0.5);
		}

		// Death animation
		if (!this.alive) {
			this.deathTimer += deltaMs;
			let deathFac = this.deathTimer / this.deathDuration; // 1 = dead
			let deathEase = Phaser.Math.Easing.Quintic.In(deathFac);
			let x = Math.max(0, 1-Math.abs(1-2.5*deathFac));
			let deathEase2 = Phaser.Math.Easing.Sine.Out(x);

			this.setScale(1 - deathEase);
			this.sprite.setOrigin(0.5 + deathEase2 * 0.15 * Math.sin(100*timeMs), 0.5);
			// this.setAlpha(1 - deathEase);

			let blink = (Math.sin(50*timeMs) > 0);
			this.sprite.setTint(blink ? 0xFFBBBB : 0xFFFFFF);

			// End prematurely
			if (this.deathTimer > 0.95 * this.deathDuration) {
				this.setVisible(false);
				// this.emit("destroy");
				// this.scene.particles.createExplosion(this.x, this.y, 1, 1.0);
				// this.destroy();
			}
		}
	}

	throw() {
		this.sprite.play({ key: 'dragon_throw' });
	}

	damage(amount: number=1) {
		this.health -= amount;
		this.hurtTimer = 1000;

		this.text.setText(this.health.toString());

		if (this.health <= 0) {
			this.emit("death");
		}
	}

	get alive() {
		return this.health > 0;
	}
}
