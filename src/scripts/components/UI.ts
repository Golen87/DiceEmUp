import { GameScene } from "../scenes/GameScene";
import { RoundRectangle } from "./RoundRectangle";
import { interpolateColor } from "../utils";
// import { Boss } from "./Boss";
import BendWaves2 from "../pipelines/BendWavesPostFX2";

const EDGE = 0.235;
const PAD = 13;
const FONT_SIZE = 24;
const STROKE = 3;


export class UI extends Phaser.GameObjects.Container {
	public scene: GameScene;

	// private background: Phaser.GameObjects.Image;

	// private outlineNight: Phaser.GameObjects.Image;
	// private outlineDay: Phaser.GameObjects.Image;

	// private clockBg: RoundRectangle;
	// private clock: Phaser.GameObjects.Sprite;

	// private health: Phaser.GameObjects.Container;
	// private healthBox: Phaser.GameObjects.Image;
	// private healthBg: Phaser.GameObjects.Rectangle;
	// private healthBar: Phaser.GameObjects.Rectangle;
	// private healthFlash: number;

	// private heartsBg: RoundRectangle;
	// private hearts: Phaser.GameObjects.Image[];

	// public debug: Phaser.GameObjects.Text;
	// public world: Phaser.GameObjects.Text;
	// public stage: Phaser.GameObjects.Text;

	public highscore: Phaser.GameObjects.Text;
	public score: Phaser.GameObjects.Text;
	public scoreBounce: number;

	// public endScreen: Phaser.GameObjects.Container;
	// public endText: Phaser.GameObjects.Text;
	// public playAgain: Phaser.GameObjects.Text;

	// private playerHitbox: Phaser.GameObjects.Ellipse;

	// private boss?: Boss;


	constructor(scene: GameScene) {
		super(scene);
		this.scene = scene;
		scene.add.existing(this);

		// const cx = scene.CX;
		// const cy = scene.CY;

		// const rx = (1-EDGE)*scene.W + PAD;
		// const lx = EDGE*scene.W - PAD;
		// let rrw = 0.92 * EDGE*scene.W;

		// this.background = scene.add.image(cx, cy, "ui_bg");
		// scene.containToScreen(this.background);
		// this.add(this.background);

		// this.outlineDay = scene.add.image(0, cy, "america_outline2");
		// this.outlineDay.setOrigin(0, 0.5);
		// // this.outlineDay.setBlendMode(Phaser.BlendModes.ADD);
		// this.outlineDay.setScale(0.5);
		// this.add(this.outlineDay);

		// this.outlineNight = scene.add.image(0, cy, "owl_outline2");
		// this.outlineNight.setOrigin(0, 0.5);
		// // this.outlineNight.setBlendMode(Phaser.BlendModes.ADD);
		// this.outlineNight.setScale(0.5);
		// this.add(this.outlineNight);


		// // Clock

		// this.clock = scene.add.sprite((1-EDGE/2)*scene.W, 0.55 * scene.H, "ui_clock", 0);
		// this.clock.setScale(0.5);
		// this.add(this.clock);

		// this.clockBg = new RoundRectangle(scene, this.clock.x, this.clock.y, rrw, this.clock.displayHeight+PAD, 10, 0x3a3a3a);
		// this.add(this.clockBg);
		// this.moveDown(this.clockBg);


		// // Boss health

		// this.health = scene.add.container();
		// this.health.setVisible(false);
		// this.add(this.health);

		// this.healthBox = scene.add.image(cx, 0.06*cy, "ui_healthbar");
		// this.healthBox.setScale(0.5);
		// this.health.add(this.healthBox);

		// const w = this.healthBox.displayWidth - 5;
		// const h = this.healthBox.displayHeight - 5;

		// this.healthBg = scene.add.rectangle(this.healthBox.x - w/2, this.healthBox.y - h/2, w, h, 0);
		// this.healthBg.setOrigin(0);
		// this.healthBg.setAlpha(0.6);
		// this.health.add(this.healthBg);

		// this.healthBar = scene.add.rectangle(this.healthBox.x - w/2, this.healthBox.y - h/2, w, h, 0);
		// this.healthBar.setOrigin(0);
		// this.health.add(this.healthBar);

		// this.health.bringToTop(this.healthBox);

		// this.healthFlash = 0;


		// // Hearts

		// let hx = (1 - EDGE/2) * scene.W;
		// let hy = 0.9 * scene.H;

		// this.heartsBg = new RoundRectangle(scene, hx, hy, rrw, 86, 10, 0x3a3a3a);
		// this.add(this.heartsBg);

		// this.hearts = [];
		// for (let i = 0; i < 5; i++) {
		// 	let x = hx - 2*35 + 35*i;
		// 	let y = hy + 16 * (i%2 == 0 ? -1 : 1);

		// 	let heartBg = scene.add.image(x, y, "ui_heart_empty");
		// 	heartBg.setScale(0.4);
		// 	this.add(heartBg);

		// 	let heart = scene.add.image(x, y, "ui_heart");
		// 	heart.setScale(0.4);
		// 	this.add(heart);
		// 	this.hearts.push(heart);
		// }

		// let livesLabel = scene.createText(hx, hy - 50, FONT_SIZE, "#000", "Lives");
		// livesLabel.setOrigin(0.5, 1);
		// livesLabel.setStroke("#FFFFFF", STROKE);
		// this.add(livesLabel);


		// // Text

		// this.world = scene.createText(lx/2, 4*PAD, 1.4*FONT_SIZE, "#000", "");
		// this.world.setOrigin(0.5);
		// this.world.setStroke("#FFFFFF", 1.4*STROKE);
		// this.add(this.world);
		// this.setWorld(1);

		// this.stage = scene.createText(lx/2, 7*PAD, 0.75*FONT_SIZE, "#000", "");
		// this.stage.setOrigin(0.5);
		// this.stage.setStroke("#FFFFFF", 0.85*STROKE);
		// this.add(this.stage);
		// this.setStage(1);


		let hx = 0.021 * scene.W;
		let swidth = 230;
		let ty = 0.83 * scene.H;

		let scoreBg = new RoundRectangle(scene, hx-5-3, ty+20, swidth+6, 1.4*FONT_SIZE+6, 17, 0x593929);
		scoreBg.setOrigin(0, 0.5);
		this.add(scoreBg);
		let scoreBg2 = new RoundRectangle(scene, hx-5, ty+20, swidth, 1.4*FONT_SIZE, 14, 0xcba17f);
		scoreBg2.setOrigin(0, 0.5);
		this.add(scoreBg2);

		let sLabel = scene.createText(hx+70, ty+3, FONT_SIZE, "#000", "Score");
		sLabel.setOrigin(0.5, 0);
		sLabel.setStroke("#FFFFFF", STROKE);
		this.add(sLabel);

		// ty += 1.2 * FONT_SIZE;
		this.score = scene.createText(hx + 140, ty+5, FONT_SIZE, "#FFF", "0");
		this.score.setOrigin(0, 0);
		// this.score.setStroke("#FFFFFF", STROKE);
		this.add(this.score);

		ty += 1.8 * FONT_SIZE;
		let highscoreBg = new RoundRectangle(scene, hx-5-3, ty+20, swidth+6, 1.4*FONT_SIZE+6, 14, 0x593929);
		highscoreBg.setOrigin(0, 0.5);
		this.add(highscoreBg);
		let highscoreBg2 = new RoundRectangle(scene, hx-5, ty+20, swidth, 1.4*FONT_SIZE, 14, 0xcba17f);
		highscoreBg2.setOrigin(0, 0.5);
		this.add(highscoreBg2);

		let hsLabel = scene.createText(hx+70, ty+3, FONT_SIZE, "#000", "High score");
		hsLabel.setOrigin(0.5, 0);
		hsLabel.setStroke("#FFFFFF", STROKE);
		this.add(hsLabel);

		this.highscore = scene.createText(hx + 140, ty+5, FONT_SIZE, "#FFF", "0");
		this.highscore.setOrigin(0, 0);
		// this.highscore.setStroke("#FFFFFF", STROKE);
		this.add(this.highscore);

		// // this.score.x += 4 +this.score.width/2;
		// // this.score.y += 4 +this.score.height/2;
		// // this.highscore.x += 4 +this.highscore.width/2;
		// // this.highscore.y += 4 +this.highscore.height/2;

		this.scoreBounce = 0;


		// this.debug = scene.createText(0, 0, FONT_SIZE/2, "#FFF", "LMAO");
		// this.debug.setOrigin(0, 0);
		// // this.debug.setStroke("#FFFFFF", STROKE);
		// this.add(this.debug);


		// this.endScreen = scene.add.container(cx, cy);
		// this.endScreen.setVisible(false);
		// this.endScreen.setAlpha(0);
		// this.add(this.endScreen);

		// this.endText = scene.createText(0, -2*PAD, 2.7*FONT_SIZE, "#FFF", "");
		// this.endText.setOrigin(0.5);
		// this.endText.setStroke("#000", 8);
		// this.endScreen.add(this.endText);

		// this.playAgain = scene.createText(0, 3*PAD, FONT_SIZE, "#000", "Tap to play again");
		// this.playAgain.setOrigin(0.5);
		// this.playAgain.setStroke("#FFFFFF", STROKE);
		// this.endScreen.add(this.playAgain);


		// /* Player hitbox */

		// this.playerHitbox = this.scene.add.ellipse(0, 0, 8, 8, 0xE91E63);
		// this.add(this.playerHitbox);
		// this.sendToBack(this.playerHitbox);


		this.setScore(0, 0);
	}

	update(time: number, delta: number) {

		// Score
		this.scoreBounce += 10 * (0 - this.scoreBounce) * delta;
		this.score.setScale(1 + 0.15 * this.scoreBounce, 1 - 0.05 * this.scoreBounce);
		// this.highscore.setScale(1 + 0.15 * this.scoreBounce, 1 - 0.05 * this.scoreBounce);
	}

	setScore(score: number, highscore: number) {
		this.score.setText(score.toString().padStart(0, '0'));
		this.highscore.setText(highscore.toString().padStart(0, '0'));
		this.scoreBounce = 1;
	}
}
