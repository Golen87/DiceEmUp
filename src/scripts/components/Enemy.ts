import { GameScene } from "../scenes/GameScene";
import { Grid, Coord, Cell } from "./Grid";
// import { Bullet } from "./Bullet";
// import { EnemyBullet } from "./EnemyBullet";
// import { interpolateColor } from "../utils";
// import { EnemyMovement, EnemyMovementProps, EnemyShotPattern, EnemyPatterns, BulletParams } from "../interfaces";

// const STUNNED_DURATION = 1.5;

// interface Pattern {
// 	generator: EnemyShotPattern;
// 	queuedBullet: BulletParams | null;
// 	swapDayTime: boolean;
// }


export class Enemy extends Phaser.GameObjects.Container {
	public scene: GameScene;

	// Graphics
	public sprite: Phaser.GameObjects.Sprite;
	public text: Phaser.GameObjects.Text;
	// protected light: Phaser.GameObjects.PointLight;
	// protected graphics: Phaser.GameObjects.Graphics;

	public coord: Coord | null;

	public maxHealth: number;
	public health: number;
	private hurtTimer: number;
	private deathTimer: number;
	private deathDuration;

	// // Movement
	// protected movementFunction: EnemyMovement;
	// protected movementProps: EnemyMovementProps;

	// // Shooting
	// protected patterns: Pattern[];
	// protected phases: any[];
	// protected phaseIndex: number;
	// protected stunnedTimer: number;

	// // public start: Phaser.Math.Vector2;
	// public velocity: Phaser.Math.Vector2;
	// protected border: { [key: string]: number };

	// // Collision
	// protected bodyAreas: Phaser.Geom.Circle[];


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
		this.sprite = scene.add.sprite(0, 0, Phaser.Math.RND.pick(["enemy"]), 0);
		this.sprite.setOrigin(0.5, 0.65);
		// this.sprite.setScale(0.25);
		this.add(this.sprite);

		this.text = scene.createText(0, 0, 25, "#007", this.health.toString());
		this.text.setOrigin(0.5);
		this.text.setStroke("#FFFFFF", 5);
		this.add(this.text);


		// // Light
		// this.light = scene.add.pointlight(0, 0, 0xffeeaa, 65, 0.35, 0.04);
		// this.add(this.light);
		// this.sendToBack(this.light);

		// // Debug graphics
		// this.graphics = scene.add.graphics();
		// // this.graphics.setVisible(false);
		// this.add(this.graphics);

		// // Movement
		// // this.start = new Phaser.Math.Vector2(this.x, this.y);
		// this.velocity = new Phaser.Math.Vector2(0, 0);
		// this.facing.set(0, 1);
		// this.border = {
		// 	left: 0.2*scene.W + size/2,
		// 	right: 0.8*scene.W + size/2,
		// 	top: size/2,
		// 	bottom: scene.H - size/2,
		// };

		// this.phases = [];
		// this.phaseIndex = 0;
		// this.stunnedTimer = 0;

		// this.maxHealth = 200;
		// this.health = this.maxHealth;

		// this.bodyAreas = [ new Phaser.Geom.Circle( 0, 0, 80) ];

		// this.movementFunction = movement;
		// this.movementProps = {
		// 	spawnTime,
		// 	originX: x,
		// 	originY: y,
		// 	// facing: { x: facing.x, y: facing.y },
		// 	// speed: speed,
		// 	// angle: this.facing.angle()
		// };

		// this.patterns = [];
		// for (let patternGenerator of patterns.easy) {
		// 	this.patterns.push({
		// 		generator: patternGenerator(),
		// 		queuedBullet: null,
		// 		swapDayTime: true
		// 	});
		// }
		// for (let patternGenerator of patterns.hard) {
		// 	this.patterns.push({
		// 		generator: patternGenerator(),
		// 		queuedBullet: null,
		// 		swapDayTime: false
		// 	});
		// }
	}

	update(timeMs: number, deltaMs: number) {
		super.update(timeMs, deltaMs);

		this.sprite.setFrame(Math.floor(timeMs/400) % 2);

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

	move(coord: Coord, cell: Cell) {
		this.sprite.setScale(cell.width / this.sprite.height);
		this.setDepth(10 + cell.y);
		this.coord = coord;

		this.scene.tweens.add({
			targets: this,
			x: { from: this.x, to: cell.cx },
			y: { from: this.y, to: cell.cy },
			ease: 'Cubic.Out',
			duration: 1000
		});
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
