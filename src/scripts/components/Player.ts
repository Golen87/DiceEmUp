import { GameScene } from "../scenes/GameScene";
// import { Bullet } from "./Bullet";
// import { EnemyMovement, EnemyMovementProps, EnemyShotPattern, EnemyPatterns, BulletParams } from "../interfaces";
// import { playerMovement } from "../patterns/bulletMovement";
// import { interpolateColor } from "../utils";

// const ACCELERATION = 70;
// const MAX_SPEED = 200;
// const HURT_DURATION = 4.0;
// const TAPPING_TIMER = 0.2;
// const SHOOTING_TIMER = 0.09;
// const PLAYER_RADIUS = 4.8;
// let TOUCH_OFFSET = 50;

// // Hack to detect computer with mouse
// addEventListener("mousemove", e => {
// 	TOUCH_OFFSET = 0;
// });

// interface Pattern {
// 	generator: EnemyShotPattern;
// 	queuedBullet: BulletParams | null;
// 	swapDayTime: boolean;
// }


export class Player extends Phaser.GameObjects.Container {
	public scene: GameScene;

	/*
	// Input
	private keys: any;
	public isTouched: boolean;
	public isTapped: boolean;
	private tappedTimer: number;

	// Graphics
	private graphics: Phaser.GameObjects.Graphics;
	public sprite: Phaser.GameObjects.Sprite;
	private origScale: number = 0.3;

	// Movement
	private inputVec: Phaser.Math.Vector2; // Just used for keyboard -> vector
	private touchPos: Phaser.Math.Vector2;
	public velocity: Phaser.Math.Vector2;
	private border: { [key: string]: number }; 

	// Health
	public bodyArea: Phaser.Geom.Circle;

	// Shooting
	protected pattern: Pattern;
	public dayTimeSmooth: number;
	public shootTimer: number;
	*/

	constructor(scene: GameScene, x: number, y: number) {
		super(scene, x, y);

		// Graphics
		/*
		this.sprite = scene.add.sprite(0, 0, "player", 0);
		this.sprite.setScale(this.origScale);
		this.add(this.sprite);

		// Debug graphics
		this.graphics = scene.add.graphics();
		// this.graphics.setVisible(false);
		this.add(this.graphics);

		// Movement
		this.keys = scene.input.keyboard.addKeys({
			up: 'W',		up2: 'Up',
			down: 'S',		down2: 'Down',
			left: 'A',		left2: 'Left',
			right: 'D',		right2: 'Right',
		});

		// Input
		this.isTouched = false;
		this.isTapped = false;
		this.tappedTimer = 0;
		this.inputVec = new Phaser.Math.Vector2(0, 0);
		this.touchPos = new Phaser.Math.Vector2(0, 0);
		this.velocity = new Phaser.Math.Vector2(0, 0);
		this.facing.set(0, -1);
		this.border = {
			left: 0.26 * scene.W,
			right: 0.74 * scene.W,
			top: 0,
			bottom: scene.H - 10,
		};

		// Game
		this.bodyArea = new Phaser.Geom.Circle(0, PLAYER_RADIUS, PLAYER_RADIUS);
		this.maxHealth = 5;
		this.health = 5;
		this.dayTimeSmooth = this.dayTime ? 1 : 0;
		this.shootTimer = 0;
		this.deathDuration = 1.2;


		function* playerPattern(): EnemyShotPattern {
			let straightBullet = new BulletParams({
				radius: 14,
				speed: 1000,
				angle: -90,
				aimPlayer: false
			});

			let time = 0;
			let bullets = [
				playerMovement( 0),
				playerMovement(-60),
				playerMovement( 60),
			];

			while (true) {
				yield straightBullet.modify({ time, angle: -90, movement: bullets[0] });
				time += 1 / 16;
				yield straightBullet.modify({ time, angle: -90-2, movement: bullets[1] });
				yield straightBullet.modify({ time, angle: -90+2, movement: bullets[2] });
				time += 1 / 16;
			}
		}

		this.pattern = {
			generator: playerPattern(),
			queuedBullet: null,
			swapDayTime: true
		};


		// Intro
		this.y += 170;
		*/
	}

	update(time: number, delta: number) {
		super.update(time, delta);
	}
}
