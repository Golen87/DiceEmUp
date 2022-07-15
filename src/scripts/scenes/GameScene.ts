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
// import { Minion } from "../components/Minion";
// import { Boss } from "../components/Boss";
// import { Bullet } from "../components/Bullet";
// import { PlayerBullet } from "../components/PlayerBullet";
// import { EnemyBullet } from "../components/EnemyBullet";
// import { audios } from "../assets";
// import { levelData } from "../levels";
// import { interpolateColor } from "../utils";
// import { EnemyParams, BulletParams } from "../interfaces";


export class GameScene extends BaseScene {
	// Background
	// public background: Background;
	public grid: Grid;
	public dices: Dice[];
	public enemies: Enemy[];

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

		// Backgrounds
		// this.background = new Background(this);
		// this.background.setDepth(BACKGROUND_LAYER);
		let bg = this.add.image(this.CX, this.CY, 'background');
		this.containToScreen(bg);

		// Grid
		this.grid = new Grid(this);

		this.dices = [];
		this.enemies = [];

		for (let i = 0; i < 2; i++) {
			this.addEnemy();
		}
		for (let i = 0; i < 4; i++) {
			this.addDice();
		}


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
		// for (const dice of this.dices) {
			// if (dice.dragging) {
			// }
		// }
	}


	addDice() {
		const dice = new Dice(this, 200, 500)
		this.dices.push(dice);

		const coord = this.grid.getRandomFree();
		if (coord) {
			this.grid.addDice(coord, dice);
		}

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
