import { GameScene } from "../scenes/GameScene";
import { Grid, Coord, Cell } from "./Grid";

export enum EnemyType {
	SQUIRE,
	SQUIRE_WAVE,
	ENEMY_COUNT
}

interface EnemyBehaviour {
	type: EnemyType;
	move: (coord:Coord, moves: number) => Coord;
	spawn: (scene:GameScene, grid:Grid) => Enemy[];
	tint: number;
	minHealth: number;
	maxHealth: number;
};

export const EnemyKinds = new Map<EnemyType, EnemyBehaviour>();
EnemyKinds.set(EnemyType.SQUIRE, {
	type: EnemyType.SQUIRE,
	move: (coord, moves) => {
		return { i: coord.i-1, j: coord.j };
	},
	spawn: (scene, grid) => {
		const ret: Enemy[] = [];
		const coord = grid.getRandomRightFree();
		const kind = EnemyKinds.get(EnemyType.SQUIRE);
		if (coord && kind != null) {
			const enemy = new Enemy(scene, coord.i, coord.j, kind);
			grid.addEnemy(coord, enemy);
			ret.push(enemy);
		}
		return ret;
	},
	tint: 0xFFFFFF,
	minHealth: 3,
	maxHealth: 9
});

EnemyKinds.set(EnemyType.SQUIRE_WAVE, Object.assign({},
	EnemyKinds.get(EnemyType.SQUIRE), {
	spawn: (scene:GameScene, grid:Grid) => {
		const ret: Enemy[] = [];
		const kind = EnemyKinds.get(EnemyType.SQUIRE_WAVE);
		if(!kind) return ret;

		const right = grid.cols-1;

		for( let j = 0; j < grid.rows; j++) {
			if(!grid.grid[j][right]) {
				const enemy = new Enemy(scene, right, j, kind);
				grid.addEnemy({i: right, j: j}, enemy);
				ret.push(enemy);
			}
		}
		return ret;
	},
	maxHealth: 3
}));


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
	public moves: number;

	private hurtTimer: number;
	private deathTimer: number;
	private deathDuration;

	private behaviour: EnemyBehaviour;

	constructor(scene: GameScene, x: number, y: number, behaviour: EnemyBehaviour) {
		super(scene, x, y);
		this.scene = scene;
		scene.add.existing(this);

		this.maxHealth = Phaser.Math.Between(behaviour.minHealth, behaviour.maxHealth);
		this.health = this.maxHealth;
		this.hurtTimer = 0;
		this.deathTimer = 0;
		this.deathDuration = 1000;
		this.moves = 0;
		this.behaviour = behaviour;

		// Create player sprite
		this.sprite = scene.add.sprite(0, 0, "enemy", 0);
		this.sprite.setTint(behaviour.tint);
		this.sprite.setOrigin(0.6, 0.65);
		// this.sprite.setScale(0.25);
		this.add(this.sprite);

		this.text = scene.createText(0, 0, 25, "#007", this.health.toString());
		this.text.setOrigin(0.6);
		this.text.setStroke("#FFFFFF", 5);
		this.add(this.text);
	}

	update(timeMs: number, deltaMs: number) {
		super.update(timeMs, deltaMs);

		// this.sprite.setFrame(Math.floor(timeMs/400) % 2);

		// Hurt animation
		this.hurtTimer -= deltaMs;
		if (this.hurtTimer > 0 || !this.alive) {
			let blink = (Math.sin(0.03*timeMs) > 0);
			this.sprite.setTint(blink ? 0xFF7777 : this.behaviour.tint);
			this.sprite.setAlpha(0.5);
			this.sprite.setOrigin(0.6 + 0.05 * Math.sin(35*timeMs/1000), 0.65);
		}
		else {
			this.sprite.setTint(this.behaviour.tint);
			this.sprite.setAlpha(1);
			// this.sprite.setOrigin(0.6, 0.5);
		}

		// Death animation
		if (!this.alive) {
			this.deathTimer += deltaMs;
			let deathFac = this.deathTimer / this.deathDuration; // 1 = dead
			let deathEase = Phaser.Math.Easing.Quintic.In(deathFac);
			let x = Math.max(0, 1-Math.abs(1-2.5*deathFac));
			let deathEase2 = Phaser.Math.Easing.Sine.Out(x);

			this.setScale(1 - deathEase);
			this.sprite.setOrigin(0.6 + deathEase2 * 0.15 * Math.sin(100*timeMs/1000), 0.65);
			// this.setAlpha(1 - deathEase);

			let blink = (Math.sin(50*timeMs/1000) > 0);
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

	playIdle() {
		this.sprite.play({ key: 'enemy_idle' });
	}

	playWalk() {
		this.sprite.play({ key: 'enemy_walk' });
	}

	playAttack() {
		this.sprite.play({ key: 'enemy_attack' });
	}

	getNextMove(coord: Coord) {
		return this.behaviour.move(coord, this.moves);
	}

	move(coord: Coord, cell: Cell) {
		this.sprite.setScale(cell.width / this.sprite.height);
		this.setDepth(10 + cell.y/100);
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
		const previousHealth = this.health;
		const healthDifference = Math.abs(previousHealth - this.health);
		this.health -= amount;
		if (amount > 0) {
			this.hurtTimer = 1000;
			this.scene.sound.play("e_damage", {
				volume: 0.2,
				// https://www.desmos.com/calculator/lf1eosjjdd
				pan: (this.x / this.scene.W - 0.5) * 1.1 - 0.18,
				rate: Phaser.Math.RND.realInRange(0.95, 1.05),
				delay: Phaser.Math.RND.realInRange(0.0, 0.05)
			});
		}

		// this.text.setText(this.health.toString());
		this.scene.tweens.add({
			targets: this.text,
			text: { from: previousHealth, to: this.health },
			ease: 'Cubic.Out',
			duration: 500 + (healthDifference * 80),
			onUpdate: tween => {
				const tweenedHealth = parseFloat(this.text.text);
				this.text.setText(Math.floor(tweenedHealth).toString());
				if (tweenedHealth < 1) this.text.setColor("#700");
			}
		});

		if (this.health <= 0) {
			this.emit("death");
		}
	}

	get alive() {
		return this.health > 0;
	}
}
