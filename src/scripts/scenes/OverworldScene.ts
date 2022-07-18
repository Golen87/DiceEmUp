import { BaseScene } from "./BaseScene";
import { RoundRectangle } from "../components/RoundRectangle";
import BendWaves2 from "../pipelines/BendWavesPostFX2";
import { SCALEDOWN } from "../constants";


export interface Point {
	x: number;
	y: number;
	radius: number;
}


export class OverworldScene extends BaseScene {
	level: number;

	clouds1: Phaser.GameObjects.Image;
	clouds2: Phaser.GameObjects.Image;
	volcano: Phaser.GameObjects.Image;
	player: Phaser.GameObjects.Image;
	points: any;
	curves: any;
	graphics: Phaser.GameObjects.Graphics;
	victory: Phaser.GameObjects.Text;
	title: Phaser.GameObjects.Text;
	desc: Phaser.GameObjects.Text;

	introPlaying: boolean;
	myTweens: Phaser.Tweens.Tween[];

	constructor() {
		super({key: "OverworldScene"});
	}

	init(data: any) {
		this.level = data.level;
	}

	create(): void {
		this.fade(false, (this.level == 0) ? 2000 : 500, 0xFFFFFF);
		this.cameras.main.setBackgroundColor(0x7bb7e7);

		this.introPlaying = false;
		this.myTweens = [];


		// Images

		this.clouds1 = this.add.image(0, 0, "bg_clouds");
		this.clouds2 = this.add.image(0, 0, "bg_clouds");
		this.clouds1.setOrigin(0);
		this.clouds2.setOrigin(0);
		this.volcano = this.add.image(this.CX, this.CY, "bg_day");
		this.fitToScreen(this.clouds1);
		this.fitToScreen(this.clouds2);
		this.fitToScreen(this.volcano);

		this.player = this.add.image(this.CX, this.CY, "mapplayer", 0);
		this.player.setOrigin(0.5, 0.7);
		this.player.setDepth(10);

		this.graphics = this.add.graphics();
		// this.graphics.setBlendMode(Phaser.BlendModes.ADD);
		this.graphics.lineStyle(1, 0xEEEEDD, 1.0);
		this.graphics.fillStyle(0xEEEEDD, 1.0);


		this.title = this.createText(this.CX, 0.43*this.H, 3*40*2/SCALEDOWN, "#FA4", "Fire and Dice").setOrigin(0.5).setStroke("#732", 12/SCALEDOWN);
		this.title.setPostPipeline(BendWaves2);
		this.title.setVisible(false);

		this.desc = this.createText(this.CX, 0.65*this.H, 3*18*2/SCALEDOWN, "#FFF").setOrigin(0.5);
		this.desc.setText("Tap to play");
		this.desc.setVisible(false);


		let levels = [
			{ x:2*80, y:2*77 },
			{ x:2*43, y:2*60 },
			{ x:2*107, y:2*45 },
			{ x:2*79, y:2*19 },
		];
		this.points = {};
		this.curves = {};

		levels.forEach((point: any, index: number) => {
			this.points[index] = [];

			// Large level dot
			if (this.level > 0)
				this.points[index].push({ x: point.x, y: point.y, radius: 5 });

			// Smaller path dots
			if (index > 0) {
				let other = levels[index-1];
				let curve = new Phaser.Curves.CubicBezier(
					new Phaser.Math.Vector2(point.x, point.y),
					new Phaser.Math.Vector2(point.x, point.y+60),
					new Phaser.Math.Vector2(other.x, other.y-60),
					new Phaser.Math.Vector2(other.x, other.y)
				);
				this.curves[index] = curve;
				// curve.draw(this.graphics);

				let L = curve.getLength();
				let ls = curve.getLengths(1000);
				let ps = curve.getPoints(1000);
				let t = 12;
				for (let i=0; i<ls.length; i++) {
					let fac = ls[i];
					if (fac > t) {
						this.points[index].push({
							x: Math.floor(ps[i].x),
							y: Math.floor(ps[i].y),
							radius: 2
						});
						t += 12;
					}
				}
			}

			this.points[index].reverse();
		});


		if (this.level > 0) {
			this.player.x = levels[this.level-1].x;
			this.player.y = levels[this.level-1].y;
		}
		else {
			this.player.x = levels[this.level].x;
			this.player.y = levels[this.level].y + 40;
		}

		// Instantly draw
		for (let i=0; i<this.level; i++) {
			// let flag = this.add.image(levels[i].x, levels[i].y, "mapflag")
			// flag.setOrigin(0.5, 0.8);

			this.points[i].forEach((point: any, index: number) => {
				this.graphics.fillCircle(point.x, point.y, point.radius);
			});
		}

		// Animate
		if (this.level == 0) {
			this.showIntroAnimation();
		}
		else
		{
			this.addEvent(1000, this.showStageAnimation, this);
		}

		// Skip
		this.input.keyboard.on("keydown-ESC", () => {
			this.skip();
			if (this.level < 4) {
				this.scene.start("GameScene", { level: this.level });
			}
		}, this);

		this.input.keyboard.on("keydown-SPACE", this.skip, this);
		this.input.on('pointerdown', this.skip, this);
	}

	update(time: number, delta: number) {
		const anim = Math.sin(10*time/1000) > 0;

		this.clouds1.x = (20 * time/1000) % this.W;
		this.clouds2.x = this.clouds1.x - this.W;

		this.player.setFrame(anim ? 0: 1);

		if (this.victory) {
			this.victory.setScale(1.0 + 0.1*Math.sin(5*time/1000));
		}
			// flag.setFrame(anim ? 0 : 1);
		// });
	}

	showIntroAnimation() {
		this.introPlaying = true;

		this.clouds1.y += 80;
		this.clouds2.y += 80;
		this.volcano.y += 300;

		this.myTweens.push(this.tweens.add({
			targets: [this.clouds1, this.clouds2],
			y: "-=80",
			ease: 'Cubic.InOut',
			duration: 5000,
			delay: 0,
		}));

		let vtween = this.tweens.add({
			targets: [this.volcano],
			y: "-=300",
			ease: 'Cubic.InOut',
			duration: 5000,
			delay: 0,
		});
		this.myTweens.push(vtween);

		vtween.on("stop", this.revealTitle, this);
		vtween.on("complete", this.revealTitle, this);
	}

	revealTitle() {
		this.flash(1000, 0xFFFFFF);
		this.title.setVisible(true);
		this.desc.setVisible(true);
		this.introPlaying = false;
	}

	showStageAnimation() {
		if (this.level > 3) {
			this.flash(1000, 0xFFFFFF);
			this.victory = this.createText(this.CX, this.CY, 120/SCALEDOWN, "#F00", "VICTORY").setOrigin(0.5).setStroke("#FF0", 12/SCALEDOWN);
			return;
		}

		this.points[this.level].forEach((point: any, index: number) => {
			this.addEvent(200*index, () => {
				this.graphics.fillCircle(point.x, point.y, point.radius);
			})
		});

		const wait = 200 * this.points[this.level].length;

		let curve = this.curves[this.level];
		if (curve) {

			// Animate player
			let tween = this.tweens.add({
				targets: this,
				timer: { from: 0, to: 1 },
				duration: wait,
				delay: wait,
			});

			// Move player
			tween.on('update', (tween, key, target, current, previous) => {
				let p = curve.getPoint(1-current);
				this.player.x = p.x;
				this.player.y = p.y;
			}, this);

			// Trigger next level
			tween.on('complete', this.progress, this);
		}
		else {
			// Animate player
			let tween = this.tweens.add({
				targets: this.player,
				y: "-=40",
				duration: 1000,
				delay: wait + 500,
			});
			tween.on('complete', this.progress, this);
		}
	}

	skip() {
		if (this.introPlaying) {
			this.myTweens.forEach((tween: Phaser.Tweens.Tween) => {
				tween.stop(1);
			});
		}
		else if (this.title.visible) {
			this.title.setVisible(false);
			this.desc.setVisible(false);
			this.showStageAnimation();
		}

		this.cameras.main.fadeEffect.reset();
	}

	progress() {
		this.addEvent(500, () => {
			this.fade(true, 1000, 0x000000);
			this.addEvent(550, () => {
				this.scene.start("GameScene", { level: this.level });
			});
		});
	}
}