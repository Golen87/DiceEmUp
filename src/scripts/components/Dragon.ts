import { GameScene } from "../scenes/GameScene";
import { interpolateColor } from "../utils";


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

	private healthCont: Phaser.GameObjects.Container;
	private healthBox: Phaser.GameObjects.Image;
	private healthBg: Phaser.GameObjects.Rectangle;
	private healthBar: Phaser.GameObjects.Rectangle;
	private healthFlash: number;

	constructor(scene: GameScene, x: number, y: number) {
		super(scene, x, y);
		this.scene = scene;
		scene.add.existing(this);

		this.maxHealth = 6;
		this.health = this.maxHealth;
		this.hurtTimer = 0;
		this.deathTimer = 0;
		this.deathDuration = 1000;

		// Create player sprite
		this.sprite = scene.add.sprite(0, 0, 'dragon_idle', 0);
		this.sprite.setOrigin(0.0, 0.5);
		scene.containToScreen(this.sprite);
		this.add(this.sprite);

		this.text = scene.createText(0, 0, 25, "#000", "");
		this.text.setOrigin(0.5);
		this.text.setStroke("#FFFFFF", 5);
		this.text.setVisible(false);
		this.add(this.text);


		this.sprite.play({ key: 'dragon_idle' });
		this.sprite.on('animationcomplete', () => {
			if (this.sprite.anims.currentAnim.key == 'dragon_prepare') {
				this.emit('throw');
				this.sprite.play({ key: 'dragon_throw' });
			}
			else if (this.sprite.anims.currentAnim.key == 'dragon_throw') {
				this.sprite.play({ key: 'dragon_idle' });
			}
		});


		// Health bar

		this.healthCont = scene.add.container();
		this.healthCont.setVisible(false);
		this.add(this.healthCont);

		const cx = 0.2 * this.scene.W;
		const cy = -0.44 * this.scene.H;

		this.healthBox = scene.add.image(cx, cy, "healthbar");
		this.healthBox.setScale(0.4);
		this.healthCont.add(this.healthBox);

		const w = this.healthBox.displayWidth - 5;
		const h = this.healthBox.displayHeight - 5;

		this.healthBg = scene.add.rectangle(this.healthBox.x - w/2, this.healthBox.y - h/2, w, h, 0);
		this.healthBg.setOrigin(0);
		this.healthBg.setAlpha(0.6);
		this.healthCont.add(this.healthBg);

		this.healthBar = scene.add.rectangle(this.healthBox.x - w/2, this.healthBox.y - h/2, w, h, 0);
		this.healthBar.setOrigin(0);
		this.healthCont.add(this.healthBar);

		this.healthCont.bringToTop(this.healthBox);

		this.healthFlash = 0;
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
			this.sprite.setOrigin(0.0, 0.5 + deathEase2 * 0.03 * Math.sin(100*timeMs));
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


		// Health

		// if (this.boss) {
			// this.healthBar.width = (this.health / this.maxHealth) * (this.healthBox.displayWidth - 5);
			// Moved below
		// }

		this.healthFlash += -0.3 * this.healthFlash;

		this.healthBox.setTint( 0x112233 );
		this.healthBar.fillColor = interpolateColor( 0xd81b60, 0xFFFFFF, this.healthFlash );
		this.healthBg.fillColor = 0;
	}

	throw() {
		this.sprite.play({ key: 'dragon_prepare' });
	}

	damage(amount: number=1) {
		this.healthCont.setVisible(true);
		this.health -= amount;
		this.health = Math.max(this.health, 0);
		this.hurtTimer = 1000;
		this.healthFlash = 1;
		this.sprite.play({ key: 'dragon_hurt' });
		this.scene.sound.play("d_damage");

		this.scene.tweens.add({
			targets: this.healthBar,
			duration: 200,
			ease: "Cubic.Out",
			width: {
				from: this.healthBar.width,
				to: Math.max( // Prevent it from spilling out the box from the left
					(this.health / this.maxHealth) * (this.healthBox.displayWidth - 5) - 5,
					this.healthBox.getBounds().left
				)
			}
		});

		this.text.setText(this.health.toString());

		if (this.health <= 0) {
			this.emit("death");
			this.healthCont.setVisible(false);
			this.scene.tweens.add({
				targets: this.scene.bg_shadow,
				delay: 300,
				duration: 700,
				alpha: { from: 1, to: 0 }
			})
		}
	}

	heal(amount: number=1) {
		this.health += amount;
		this.health = Math.min(this.health, this.maxHealth);
		this.healthFlash = 1;

		this.scene.tweens.add({
			targets: this.healthBar,
			duration: 200,
			ease: "Cubic.Out",
			width: {
				from: this.healthBar.width,
				to: Math.max( // Prevent it from spilling out the box from the left
					(this.health / this.maxHealth) * (this.healthBox.displayWidth - 5),
					this.healthBox.getBounds().left
				)
			}
		});

		this.text.setText(this.health.toString());
	}

	get alive() {
		return this.health > 0;
	}
}
