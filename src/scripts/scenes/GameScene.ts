import { BaseScene } from "./BaseScene";
import { RoundRectangle } from "../components/RoundRectangle";
import { Grid } from "./../components/Grid";
import { Music } from "./../components/Music";
// import { Background } from "../components/Background";
import { UI } from "../components/UI";
import { Particles } from "../components/Particles";
import { Player } from "../components/Player";
import { Enemy, EnemyKinds, EnemyType } from "../components/Enemy";
import { Dice } from "../components/Dice";
import { Button } from "../components/Button";
import { MiniButton } from "../components/MiniButton";
import { Dragon } from "../components/Dragon";
import { interpolateColor } from "../utils";
import { GrayScalePostFilter } from "../pipelines/GrayScalePostFilter";

import level from "../components/Levels";
import { MUSIC_ON, SCALEDOWN } from "../constants";


enum State {
	MoveDice,
	DamagePhase,
	MovementPhase,
	AttackPhase,
	GameOverPhase,
}


export class GameScene extends BaseScene {
	public state: State;

	// Background
	// public background: Background;
	public bg_shadow: Phaser.GameObjects.Image;
	public grid: Grid;
	public dices: Dice[];
	public enemies: Enemy[];
	public dragon: Dragon;
	public button: Button;
	public musicButton: MiniButton;
	public audioButton: MiniButton;

	// UI texts
	private ui: UI;
	public overlayText: Phaser.GameObjects.Text;

	// Enemies
	// private enemies: Enemy[];

	// Particles
	public particles: Particles;

	// public sounds: Map<string, Phaser.Sound.BaseSound>;
	// public sounds: {[key: string]: Phaser.Sound.WebAudioSound};
	public music: Music;
	public music_light: Music;
	public music_isFull: Boolean;
	public ambience: Music;

	// Score
	public score: number;
	public highscore: number;
	public initialHighscore: number;
	public highscoreFanfarePlayed: boolean;

	public round: number;


	constructor() {
		super({key: "GameScene"});
	}

	init(data): void {
	}

	create(): void {
		this.fade(false, 1000, 0x000000);

		this.state = State.MoveDice;
		this.initAnimations();

		this.cameras.main.resetPostPipeline();

		// Backgrounds
		// this.background = new Background(this);
		// this.background.setDepth(BACKGROUND_LAYER);
		let bg = this.add.image(this.CX, this.CY, 'bg');
		this.containToScreen(bg);
		this.bg_shadow = this.add.image(this.CX, this.CY, 'bgs');
		this.containToScreen(this.bg_shadow);
		let fg = this.add.image(this.CX, this.CY, 'fg');
		this.containToScreen(fg);
		fg.setDepth(1000);

		this.dragon = new Dragon(this, -(4/SCALEDOWN), this.CY);
		this.dragon.setDepth(10);
		this.dragon.on('throw', this.onDragonThrow, this);
		this.dragon.on('death', this.onDragonDeath, this);

		// Grid
		this.grid = new Grid(this);

		this.dices = [];
		this.enemies = [];

		this.button = new Button(this, this.grid.left+this.grid.width*(this.grid.rows+1)/2, this.grid.top - (120/SCALEDOWN));
		this.button.on('click', this.onAttack, this);

		const bsize = 70/SCALEDOWN;
		this.musicButton = new MiniButton(this, this.W-2.5*bsize, 0.8*bsize, 'music');
		this.musicButton.on('click', (active: boolean) => {
			this.musicButton.toggle();
			this.music.volume 			= (this.musicButton.active ? (this.music_isFull ? 0.25 : 0.0001) : 0);
			this.music_light.volume = (this.musicButton.active ? (this.music_isFull ? 0.0001 : 0.25) : 0);
			this.ambience.volume = (this.musicButton.active ? 0.35 : 0);
		}, this);
		this.audioButton = new MiniButton(this, this.W-bsize, 0.8*bsize, 'audio');
		this.audioButton.on('click', (active: boolean) => {
			this.audioButton.toggle();
			this.sound.mute = !this.audioButton.active;
		}, this);



		// UI
		this.ui = new UI(this);
		this.ui.setDepth(10000);

		this.overlayText = this.createText(this.W/2 + 0.5, this.H/2 + 0.5, 64/SCALEDOWN, "#fff", "Overlay");
		this.overlayText.setOrigin(0.5);
		this.overlayText.setStroke("#000", 10/SCALEDOWN);
		this.overlayText.setDepth(20);
		this.overlayText.setAlpha(0);

		// Characters
		// this.player = new Player(this, this.CX, this.CY);
		// this.player.setDepth(PLAYER_LAYER);

		// this.enemies = [];

		this.particles = new Particles(this);
		this.particles.setDepth(1000);


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
			for (let dice of this.dices) {
				if (dice.dragging) {
					dice.onRelease();
				}
			}
			// if (touchId == pointer.id && touchButton == pointer.button) {
			// 	// this.ui.debug.setText(`${new Date().getTime()} - id:${pointer.id} button:${pointer.button}`);
			// 	this.player.touchEnd(pointer.x, pointer.y);
			// }
		});

		// this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).on('down', this.onDayToggle, this);


		// Sounds

		// this.loadSounds();
		this.music = new Music(this, 'm_main_music', { volume: 0.00001 });
		this.music_light = new Music(this, 'm_main_music_light', { volume: 0.25 });
		this.ambience = new Music(this, 'm_city_ambience', { volume: 0.35 });
		if (MUSIC_ON) {
			this.music.play();
			this.music_light.play();
			this.ambience.play();
		}
		this.music_isFull = true;


		this.score = 0;
		this.highscore = 0;
		this.highscoreFanfarePlayed = false;
		this.loadHighscore();
		this.onNewRound();
	}

	update(timeMs: number, deltaMs: number) {
		this.dragon.update(timeMs, deltaMs);
		for (const dice of this.dices) {
			dice.update(timeMs, deltaMs);
		}
		for (const enemy of this.enemies) {
			enemy.update(timeMs, deltaMs);
		}
		this.button.update(timeMs, deltaMs);
		this.musicButton.update(timeMs, deltaMs);
		this.audioButton.update(timeMs, deltaMs);
		this.particles.update(timeMs/1000, deltaMs/1000);
		this.ui.update(timeMs/1000, deltaMs/1000);
		this.grid.update(timeMs/1000, deltaMs/1000);

		// Camera shake
		if (this.cameraShakeValue > 0) {
			this.cameras.main.x = this.cameraShakeValue*Math.sin(0.1*timeMs);
		}
		else {
			this.cameras.main.x = 0;
		}

		// Game over text flash
		if (this.state == State.GameOverPhase) {
			// this.overlayText.setTint(interpolateColor(0xFF7777, 0XFFFFFF, Math.sin(0.005*timeMs)*0.5+0.5));
		}
	}


	initAnimations() {
		this.anims.create({
			key: 'dragon_idle',
			frames: [
				{ key: 'dragon', frame: 0, duration: 600 },
				{ key: 'dragon', frame: 1, duration: 400 },
				{ key: 'dragon', frame: 2, duration: 600 },
				{ key: 'dragon', frame: 1, duration: 400 },
			],
			repeat: -1
		});
		this.anims.create({
			key: 'dragon_throw',
			frames: [
				{ key: 'dragon', frame: 4, duration: 300 },
				{ key: 'dragon', frame: 5, duration: 400 },
			],
		});
		this.anims.create({
			key: 'dragon_return',
			frames: [
				{ key: 'dragon', frame: 6, duration: 500 },
				{ key: 'dragon', frame: 7, duration: 300 },
				{ key: 'dragon', frame: 8, duration: 200 },
			],
		});
		this.anims.create({
			key: 'dragon_hurt',
			frames: [
				{ key: 'dragon', frame: 3, duration: 1500 },
			],
			repeat: -1
		});

		this.anims.create({
			key: 'enemy_idle',
			frames: [
				{ key: 'enemy', frame: 0, duration: 500 },
				{ key: 'enemy', frame: 1, duration: 500 },
			],
			repeat: -1
		});
		this.anims.create({
			key: 'enemy_walk',
			frames: [
				{ key: 'enemy', frame: 2, duration: 100 },
				{ key: 'enemy', frame: 0, duration: 100 },
			],
			repeat: -1
		});
		this.anims.create({
			key: 'enemy_attack',
			frames: [
				{ key: 'enemy', frame: 0, duration: 100 },
				{ key: 'enemy', frame: 2, duration: 100 },
				{ key: 'enemy', frame: 3, duration: 100 },
			],
			repeat: -1
		});

		this.anims.create({
			key: 'tank_idle',
			frames: [
				{ key: 'tank', frame: 0, duration: 500 },
				{ key: 'tank', frame: 1, duration: 500 },
			],
			repeat: -1
		});
		this.anims.create({
			key: 'tank_walk',
			frames: [
				{ key: 'tank', frame: 2, duration: 100 },
				{ key: 'tank', frame: 0, duration: 100 },
			],
			repeat: -1
		});
		this.anims.create({
			key: 'tank_attack',
			frames: [
				{ key: 'tank', frame: 0, duration: 100 },
				{ key: 'tank', frame: 2, duration: 100 },
				{ key: 'tank', frame: 3, duration: 60 },
				{ key: 'tank', frame: 4, duration: 120 },
			],
			repeat: -1
		});

		this.anims.create({
			key: 'trojan_idle',
			frames: [
				{ key: 'trojan', frame: 0, duration: 500 },
				{ key: 'trojan', frame: 1, duration: 500 },
			],
			repeat: -1
		});
		this.anims.create({
			key: 'trojan_walk',
			frames: [
				{ key: 'trojan', frame: 2, duration: 100 },
				{ key: 'trojan', frame: 0, duration: 100 },
			],
			repeat: -1
		});
		this.anims.create({
			key: 'trojan_walk',
			frames: [
				{ key: 'trojan', frame: 2, duration: 100 },
				{ key: 'trojan', frame: 1, duration: 100 },
				{ key: 'trojan', frame: 0, duration: 100 },
			],
			repeat: -1
		});

		this.anims.create({
			key: 'peasant_idle',
			frames: [
				{ key: 'peasant', frame: 0, duration: 500 },
				{ key: 'peasant', frame: 1, duration: 500 },
			],
			repeat: -1
		});
		this.anims.create({
			key: 'peasant_walk',
			frames: [
				{ key: 'peasant', frame: 2, duration: 100 },
				{ key: 'peasant', frame: 0, duration: 100 },
			],
			repeat: -1
		});
		this.anims.create({
			key: 'peasant_attack',
			frames: [
				{ key: 'peasant', frame: 1, duration: 100 },
				{ key: 'peasant', frame: 2, duration: 100 },
				{ key: 'peasant', frame: 3, duration: 100 },
			],
			repeat: -1
		});
	}


	addDice() {
		const dice = new Dice(this, (600/SCALEDOWN), this.CY)
		this.dices.push(dice);

		const coord = this.grid.getRandomFree();
		if (coord) {
			this.grid.addDice(coord, dice);
		}

		dice.on('drag', (x: number, y: number) => {
			this.grid.snap(x, y, dice);
		});
	}

	addEnemy(kind: EnemyType) {
		console.log(`Spawn kind ${kind} (${EnemyType[kind]})`)
		let spawner = EnemyKinds.get(kind);
		if( spawner != null ) {
			const spawned = spawner.spawn(this, this.grid);
			this.enemies.push(...spawned);
			return spawned;
		}
		return [];
	}

	onAttack() {
		this.sound.play("u_attack_button", {volume: 0.5});

		this.state = State.DamagePhase;
		this.button.setVisible(false);

		// Cache damage grid
		const damageGrid = this.grid.getDamageGrid();

		// Explode dice
		this.flash(3000, 0xFF9977, 0.6);
		this.shake(500, 4, 0);
		this.grid.explodeGrid();
		for (const dice of this.dices) {
			// this.particles.createExplosion(dice.x, dice.y, 0.8, 1.0);
			this.grid.clear(dice.coord);
			dice.destroy();
		}
		this.grid.updateGrid();
		this.dices = [];

		// this.addEvent(200, () => {
		for (const enemy of this.enemies) {
			if (enemy.coord) {
				const dmg = damageGrid[enemy.coord.j][enemy.coord.i];
				if (dmg > 0) {
					enemy.damage(dmg);
				}
			}
		}
		// });


		this.addEvent(1000, this.onMove);
	}

	onMove() {
		this.state = State.MovementPhase;

		for (const enemy of this.enemies) {
			if (!enemy.alive) {
				this.addScore(enemy.behaviour.score);
				enemy.destroy();
			}
		}
		this.enemies = this.enemies.filter(enemy => enemy.alive);

		let playScatterSound = false;
		let switchDelay = 1000;
		if (this.enemies.length > 0) {
			this.grid.moveEnemies();
			this.sound.play("e_advance", {
				volume: this.enemies.length == 1 ? 0.3 : 0.5
			});
		} else {
			if(level.length <= this.round) {
				this.addScore(100);
				this.overlayText.setColor("#fd0");
				this.overlayText.setText("Perfect Clear!");
				this.dragon.heal(1);
				this.sound.play("m_sparkle", { volume: 0.7, pan: -0.2 });
				this.tweens.add({
					targets: this.overlayText,
					duration: 200,
					ease: "Cubic.Out",
					alpha: { from: 0, to: 1 },
					scale: { from: 2, to: 1 },
				})
				this.tweens.add({
					targets: this.overlayText,
					delay: 1400,
					duration: 800,
					ease: "Linear",
					alpha: { from: 1, to: 0 }
				})
			}
			switchDelay = 1500;
			playScatterSound = true;
		}
		for (let enemy of this.enemies) {
			enemy.playWalk();
		}
		this.addEvent(switchDelay || 1000, () => {
			playScatterSound && this.sound.play("m_scatter", { volume: 0.5, delay: 0.2 });
			this.onEnemyAttack();
		});
	}

	onEnemyAttack() {
		let attackingEnemies = this.enemies.filter(enemy => enemy.coord && enemy.coord.i == 0);

		for (let enemy of this.enemies) {
			enemy.playIdle();
		}

		if (attackingEnemies.length > 0) {

			for (let enemy of attackingEnemies) {
				enemy.playAttack();
			}

			this.addEvent(500, () => {
				this.dragon.damage(attackingEnemies.length);
			});

			this.addEvent(1000, () => this.dragon.alive && this.onNewRound());
		}
		else {
			this.onNewRound();
		}
	}

	onNewRound() {


		this.state = State.MoveDice;

		this.button.setVisible(false);

		do {
			const roundData = level[this.round++];
			if(roundData) {
				if(roundData.event) roundData.event(this);
				roundData.group.forEach( type => {
					this.addEnemy(type);
				})
			} else {
				let type = Phaser.Math.Between(EnemyType.SQUIRE, EnemyType.SPAWNABLE_COUNT-1);

				if (type == EnemyType.PEASANT) {
					console.log("spawn 1-4 peasants");
					for (let i = Phaser.Math.Between(1,4); i >= 0; i--) {
						this.addEnemy(type);
					}
				}
				else if (type == EnemyType.SQUIRE) {
					console.log("spawn 1-3 squires");
					for (let i = Phaser.Math.Between(1,3); i >= 0; i--) {
						this.addEnemy(type);
					}
				}
				else {
					console.log("spawn 1", type);
					this.addEnemy(type);

					if (Math.random() < 0.3) {
						console.log("+ peasant");
						this.addEnemy(EnemyType.PEASANT);
					}
					if (Math.random() < 0.3) {
						console.log("+ squire");
						this.addEnemy(EnemyType.SQUIRE);
					}
				}

			}
		} while (this.enemies.filter(enemy => enemy.alive).length < 1);

		for (let enemy of this.enemies) {
			enemy.playIdle();
		}

		if (this.grid.needMoreEnemies()) {
			this.addEvent(600, this.onMove);
		}
		else {
			this.dragon.throw();
			// Animation -> this.onDragonThrow
		}
	}

	onDragonThrow() {
		// Throwing animation finished

		this.sound.play(
			`m_whoosh_${Phaser.Math.RND.pick(["hard", "medium"])}_${Phaser.Math.Between(1, 4)}`,
			{ volume: 0.35, pan: -0.3, rate: 1.28 }
		)
		for (let i = 0; i < 3; i++) {
			this.addDice();
		}

		this.shake(300, 2, 0);

		// Show attack button after a while
		this.addEvent(1800, () => {
			this.tweens.add({
				targets: this.button.fire,
				scaleY: { from: 0, to: (1.2/SCALEDOWN) },
				duration: 200,
				ease: "Cubic.Out"
			});
			this.button.setVisible(true);
			this.sound.play(`m_fire_ignite_${Phaser.Math.Between(1, 3)}`, {volume: 0.85});
		});
	}

	onDragonDeath() {
		for (let enemy of this.enemies) {
			enemy.playIdle();
		}

		this.state = State.GameOverPhase;
		// this.overlayText.setColor("#fff");
		// this.overlayText.setText("Game Over");
		// this.tweens.add({
		// 	targets: this.overlayText,
		// 	duration: 400,
		// 	ease: "Elastic.Out",
		// 	alpha: { from: 0, to: 1 },
		// 	scale: { from: 0, to: 1 },
		// })

		// this.music_isFull = false;
		// if (this.musicButton.active) {
		// 	this.music.volume = 0.001;
		// 	this.music_light.volume = 0.25;
		// }

		this.cameras.main.setPostPipeline(GrayScalePostFilter);
		this.music.stop();
		this.music_light.stop();

		this.addEvent(2000, () => {
			this.fade(true, 1000, 0x000000);
			this.addEvent(1050, () => {
				this.ambience.stop();
				this.scene.start("GameoverScene");
			});
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

	loadHighscore() {
		try {
			let data = JSON.parse(localStorage.getItem("DiceSaveData")!);
			if (data) {

				if (data.highscore && !isNaN(parseInt(data.highscore))) {
					this.highscore = Phaser.Math.Clamp(data.highscore, 0, 99999999);
					this.initialHighscore = this.highscore;
					this.ui.setScore(this.score, this.highscore);
				}
			}
		} catch (error) {}
	}

	saveHighscore() {
		// Crashes in incognito
		try {
			localStorage.setItem("DiceSaveData", JSON.stringify({
				version: 1,
				highscore: this.highscore,
			}));
		} catch (error) {}
	}

	addScore(value: number) {
		this.score += value;
		this.highscore = Math.max(this.highscore, this.score);
		this.ui.setScore(this.score, this.highscore);

		this.saveHighscore();
		if (this.score > this.highscore && !this.highscoreFanfarePlayed && this.initialHighscore > 10) {
			this.sound.play("j_trumpet", { volume: 0.5 });
			this.highscoreFanfarePlayed = true;
		}
	}

	setStageName(name: string) {
		console.log("Stage:", name);
		this.sound.play("j_timpani", { volume: 0.9, pan: -0.2 });
		this.overlayText.setColor("#0df");
		this.overlayText.setText(name);
		this.tweens.add({
			targets: this.overlayText,
			duration: 200,
			ease: "Cubic.Out",
			alpha: { from: 0, to: 1 },
			scale: { from: 2, to: 1 },
		})
		this.tweens.add({
			targets: this.overlayText,
			delay: 3000,
			duration: 800,
			ease: "Linear",
			alpha: { from: 1, to: 0 }
		})
		if (name != "Move the dice to attack") {
			this.music_isFull = true;
			if (this.musicButton.active) {
				this.music.volume = 0.25;
				this.music_light.volume = 0;
				// The code below freezes the game
				/* this.tweens.add({
					target: this.music,
					duration: 1000,
					volume: { from: 0, to: 0.25 }
				})
				this.tweens.add({
					target: this.music_light,
					duration: 1000,
					volume: { from: 0.25, to: 0 }
				}) */
			}
		}
	}
}
