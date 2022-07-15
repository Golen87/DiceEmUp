import { GameScene } from "../scenes/GameScene";
import { Grid, Cell } from "./Grid";
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
	// protected light: Phaser.GameObjects.PointLight;
	// protected graphics: Phaser.GameObjects.Graphics;

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

		// Create player sprite
		this.sprite = scene.add.sprite(0, 0, Phaser.Math.RND.pick(["enemy", "enemy2"]));
		this.sprite.setOrigin(0.5, 0.65);
		// this.sprite.setScale(0.25);
		this.add(this.sprite);

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

	update(time: number, delta: number, barTime: number, barDelta: number) {
		super.update(time, delta);
	}

	move(cell: Cell) {
		this.sprite.setScale(cell.width / this.sprite.height);
		this.setDepth(10 + cell.y);

		this.scene.tweens.add({
			targets: this,
			x: { from: this.x, to: cell.cx },
			y: { from: this.y, to: cell.cy },
			ease: 'Cubic.Out',
			duration: 1000
		});
	}

	damage(amount: number=1) {
		// this.health -= amount;
		// this.hurtTimer = HURT_DURATION;
		// this.hurtEase = 0.25 * amount;

		// if (this.health <= 0) {
		// 	this.emit("death");
		// }
	}
}
