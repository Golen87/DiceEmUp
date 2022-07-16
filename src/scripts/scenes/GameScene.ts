import { BaseScene } from "./BaseScene";
import { RoundRectangle } from "../components/RoundRectangle";
import { Grid } from "./../components/Grid";
// import { Music } from "./../components/Music";
// import { Background } from "../components/Background";
// import { UI } from "../components/UI";
// import { Particles } from "../components/Particles";
import { Player } from "../components/Player";
import { Enemy } from "../components/Enemy";
import { Dice } from "../components/Dice";
import { Button } from "../components/Button";
import { Dragon } from "../components/Dragon";
// import { Minion } from "../components/Minion";
// import { Boss } from "../components/Boss";
// import { Bullet } from "../components/Bullet";
// import { PlayerBullet } from "../components/PlayerBullet";
// import { EnemyBullet } from "../components/EnemyBullet";
// import { audios } from "../assets";
// import { levelData } from "../levels";
// import { interpolateColor } from "../utils";
// import { EnemyParams, BulletParams } from "../interfaces";


enum State {
	MoveDice,
	DamagePhase,
	MovementPhase,
}


export class GameScene extends BaseScene {
	public state: State;

	// Background
	// public background: Background;
	public grid: Grid;
	public dices: Dice[];
	public enemies: Enemy[];
	public dragon: Dragon;
	public button: Button;

	// UI texts
	// private ui: UI;

	// Enemies
	// private enemies: Enemy[];

	// Particles
	// public particles: Particles;

	// public sounds: Map<string, Phaser.Sound.BaseSound>;
	// public sounds: {[key: string]: Phaser.Sound.WebAudioSound};
	// public music: Music;

	// Score
	public score: number;
	public highscore: number;


	constructor() {
		super({key: "GameScene"});
	}

	init(data): void {
	}

	create(): void {
		this.fade(false, 1000, 0x000000);

		this.state = State.MoveDice;

		// Backgrounds
		// this.background = new Background(this);
		// this.background.setDepth(BACKGROUND_LAYER);
		let bg = this.add.image(this.CX, this.CY, 'background');
		this.containToScreen(bg);

		this.dragon = new Dragon(this, 0, this.CY);
		this.dragon.on('throw', this.onDragonThrow, this);

		// Grid
		this.grid = new Grid(this);

		this.dices = [];
		this.enemies = [];

		this.button = new Button(this, this.grid.left+this.grid.width*(this.grid.rows+1)/2, this.grid.top - 50);
		this.button.on('click', this.onAttack, this);


		this.onNewRound();

		// UI
		// this.ui = new UI(this);
		// this.ui.setDepth(UI_LAYER);

		// Characters
		// this.player = new Player(this, this.CX, this.CY);
		// this.player.setDepth(PLAYER_LAYER);

		// this.enemies = [];

		// this.particles = new Particles(this);
		// this.particles.setDepth(9);


		// Touch controls
		this.input.addPointer(2);

		this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			// if (!this.player.isTouched) {
			// 	this.player.touchStart(pointer.x, pointer.y);
			// 	touchId = pointer.id;
			// 	touchButton = pointer.button;
			// }
			// else if (this.player.isTouched && !this.player.isTapped) { // Allow second touch to toggle
			// 	this.onDayToggle();
			// }
		});
		this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
			// if (touchId == pointer.id) {
			// 	this.player.touchDrag(pointer.x, pointer.y);
			// }
		});
		this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
			// if (touchId == pointer.id && touchButton == pointer.button) {
			// 	// this.ui.debug.setText(`${new Date().getTime()} - id:${pointer.id} button:${pointer.button}`);
			// 	this.player.touchEnd(pointer.x, pointer.y);
			// }
		});

		// this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).on('down', this.onDayToggle, this);


		// Sounds

		// this.loadSounds();
		// this.musicDay.play();


		// this.score = 0;
		// this.highscore = 0;
		// this.loadHighscore();
	}

	update(timeMs: number, deltaMs: number) {
		this.dragon.update(timeMs, deltaMs);
		for (const dice of this.dices) {
			dice.update(timeMs, deltaMs);
		}
		for (const enemy of this.enemies) {
			enemy.update(timeMs, deltaMs);
		}
	}


	addDice() {
		const dice = new Dice(this, 300, this.CY)
		this.dices.push(dice);

		const coord = this.grid.getRandomFree();
		if (coord) {
			this.grid.addDice(coord, dice);
		}

		dice.on('dragstart', () => {
			// this.grid.clear(dice.coord);
			// dice.coord = null;
		});
		dice.on('dragend', () => {
			// const coord = this.grid.getClosestCoord(dice.x, dice.y);
			// if (coord) {
				// this.grid.addDice(coord, dice);
			// }
		});
		dice.on('drag', (x: number, y: number) => {
			this.grid.snap(x, y, dice);
		});
	}

	addEnemy() {
		const enemy = new Enemy(this, 900, 300)
		this.enemies.push(enemy);
		const coord = this.grid.getRandomRightFree();
		if (coord) {
			this.grid.addEnemy(coord, enemy);
		}

		// enemy.on('destroy', () => {
			// this.grid.clear(enemy.coord);
			// this.enemies.splice(this.enemies.indexOf(enemy), 1);
		// });
	}

	onAttack() {
		this.sound.play("u_attack_button", {volume: 0.5});

		this.state = State.DamagePhase;
		this.button.setVisible(false);

		this.addEvent(200, () => {
			for (const enemy of this.enemies) {
				if (enemy.coord) {
					enemy.damage( this.grid.getDamage(enemy.coord) );
				}
			}

			this.addEvent(1000, this.onMove);
		});
	}

	onMove() {
		this.state = State.MovementPhase;

		for (const enemy of this.enemies) {
			if (!enemy.alive) {
				this.grid.clear(enemy.coord);
				enemy.destroy();
			}
		}
		this.enemies = this.enemies.filter(enemy => enemy.alive);

		for (const dice of this.dices) {
			this.grid.clear(dice.coord);
			dice.destroy();
		}
		this.grid.updateGrid();
		this.dices = [];

		if (this.enemies.length > 0) {
			this.grid.moveEnemies();
			this.sound.play("e_advance", {
				volume: this.enemies.length == 1 ? 0.3 : 0.5
			});
		}
		this.addEvent(1000, this.onNewRound);
	}

	onNewRound() {
		this.state = State.MoveDice;

		this.dragon.throw();
		// Animation -> this.onDragonThrow

		this.addEnemy();
	}

	onDragonThrow() {
		// Throwing animation finished
		for (let i = 0; i < 3; i++) {
			this.addDice();
		}

		// Show attack button after a while
		this.addEvent(1800, () => {
			this.button.setVisible(true);
		});
	}


	loadSounds() {
		// this.sounds = {};
		// for (let audio of audios) {
			// this.sounds[audio.key] = this.sound.add(audio.key, { volume: audio.volume, rate: audio.rate || 1 }) as Phaser.Sound.WebAudioSound;
		// }
	}

	onPlayerDeath() {
		// this.introPlaying = true;
		// this.sounds.playerDeath.play();

		// this.shake(1400, 8, 2);
	}


	// spawnEnemy(enemyParams: EnemyParams) {
	// }


	/* Score */

	// loadHighscore() {
	// 	// Crashes in incognito
	// 	try {
	// 		let data = JSON.parse(localStorage.getItem("TWSaveData")!);
	// 		if (data) {

	// 			if (data.highscore && !isNaN(parseInt(data.highscore))) {
	// 				this.highscore = Phaser.Math.Clamp(data.highscore, 0, 99999999);
	// 				this.ui.setScore(this.score, this.highscore);
	// 			}
	// 		}
	// 	} catch (error) {}
	// }

	// saveHighscore() {
	// 	// Crashes in incognito
	// 	try {
	// 		localStorage.setItem("TWSaveData", JSON.stringify({
	// 			version: 1,
	// 			highscore: this.highscore,
	// 		}));
	// 	} catch (error) {}
	// }

	// addScore(value: number) {
	// 	this.score += value;
	// 	this.highscore = Math.max(this.highscore, this.score);
	// 	this.ui.setScore(this.score, this.highscore);

	// 	if (value > 1000) {
	// 		this.saveHighscore();
	// 	}
	// }
}
