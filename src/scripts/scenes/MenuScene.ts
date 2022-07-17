import { BaseScene } from "./BaseScene";
import { RoundRectangle } from "../components/RoundRectangle";
import { Music } from "./../components/Music";


const creditsLeft = `Global Game Jam 2022

@Golenchu
@KonixKun
@JolteonDude
@MatoCookies
Kiu
Lumie

Thanks to
Frassy, Neo, Squishy`;

const creditsRight = `

code
art
design
music
sound
patterns`;


export class MenuScene extends BaseScene {
	public imp: Phaser.GameObjects.Image;
	public angel: Phaser.GameObjects.Image;
	public bird: Phaser.GameObjects.Image;
	public bg: Phaser.GameObjects.Image;

	public credits: Phaser.GameObjects.Container;
	public title: Phaser.GameObjects.Text;
	public subtitle: Phaser.GameObjects.Text;
	public tap: Phaser.GameObjects.Text;

	public musicTitle: Phaser.Sound.WebAudioSound;
	public select: Phaser.Sound.WebAudioSound;
	public select2: Phaser.Sound.WebAudioSound;
	public wind: Phaser.Sound.WebAudioSound;

	public isStarting: boolean;


	constructor() {
		super({key: "MenuScene"});
	}

	create(): void {
		this.fade(false, 200, 0x000000);


		this.bg = this.add.image(this.CX, this.CY, "CoverArtBg");
		this.containToScreen(this.bg);
		this.imp = this.add.image(this.CX+80, this.CY-60, "CoverArtImp");
		this.imp.setAlpha(0);
		this.containToScreen(this.imp);
		this.angel = this.add.image(this.CX-90, this.CY-50, "CoverArtAngel");
		this.angel.setAlpha(0);
		this.containToScreen(this.angel);
		this.bird = this.add.image(this.CX-40, this.CY+70, "CoverArtBird");
		this.bird.setVisible(false);
		this.bird.setAlpha(0);
		this.containToScreen(this.bird);


		this.title = this.createText(this.W-50, this.H-100, 60, "#000", "Dice 'Em Up");
		this.title.setOrigin(1);
		this.title.setStroke("#FFF", 8);
		this.title.setVisible(false);
		this.title.setAlpha(0);

		this.subtitle = this.createText(this.W-160, this.H-60, 35, "#000", "Tap to start");
		this.subtitle.setOrigin(0.5);
		this.subtitle.setStroke("#FFF", 4);
		this.subtitle.setVisible(false);
		this.subtitle.setAlpha(0);

		this.tap = this.createText(this.CX, this.CY, 35, "#000", "Tap to focus");
		this.tap.setOrigin(0.5);
		this.tap.setAlpha(-1);
		this.tap.setStroke("#FFF", 4);

		this.credits = this.add.container(0, 0);
		this.credits.setVisible(false);
		this.credits.setAlpha(0);

		let credits1 = this.createText(7, 4, 14, "#c2185b", creditsLeft);
		credits1.setStroke("#FFF", 6);
		credits1.setLineSpacing(0);
		this.credits.add(credits1);

		let credits2 = this.createText(120, 4, 14, "#c2185b", creditsRight);
		credits2.setStroke("#FFF", 6);
		credits2.setLineSpacing(0);
		this.credits.add(credits2);


		// Music

		if (!this.musicTitle) {
			this.musicTitle = new Music(this, "m_city_ambience", { volume: 0.25 });
			this.musicTitle.on('bar', this.onBar, this);
			this.musicTitle.on('beat', this.onBeat, this);

			// this.select = this.sound.add("dayShift", { volume: 0.8, rate: 1.0 }) as Phaser.Sound.WebAudioSound;
			// this.select2 = this.sound.add("nightShift", { volume: 0.8, rate: 1.0 }) as Phaser.Sound.WebAudioSound;

			// this.wind = this.sound.add("wind", { volume: 0.5, rate: 1.0 }) as Phaser.Sound.WebAudioSound;
			// this.wind.setLoop(true);
			// this.wind.play();
		}
		this.musicTitle.play();


		// Input

		this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).on('down', this.progress, this);
		this.input.on('pointerdown', (pointer) => {
			if (pointer.button == 0) {
				this.progress();
			}
		}, this);
		this.isStarting = false;
	}

	update(time: number, delta: number) {
		if (this.bird.visible) {
			this.bird.x		+= 0.01 * ((this.CX + 30 * Math.cos(0.4*time/1000)) - this.bird.x);
			this.bird.y		+= 0.01 * ((this.CY) - this.bird.y);
			this.imp.x		+= 0.015 * ((this.CX + 5 * Math.sin(time/1000+Math.PI/4)) - this.imp.x);
			this.angel.x	+= 0.015 * ((this.CX - 5 * Math.sin(time/1000)) - this.angel.x);
			this.imp.y		+= 0.015 * ((this.CY + 10 * Math.sin(0.6*time/1000+Math.PI/4)) - this.imp.y);
			this.angel.y	+= 0.015 * ((this.CY - 10 * Math.sin(0.6*time/1000)) - this.angel.y);

			this.bird.alpha += 0.02 * (1 - this.bird.alpha);
			this.imp.alpha += 0.03 * (1 - this.imp.alpha);
			this.angel.alpha += 0.03 * (1 - this.angel.alpha);

			this.title.alpha += 0.02 * ((this.title.visible ? 1 : 0) - this.title.alpha);
			this.subtitle.alpha += 0.02 * ((this.subtitle.visible ? 1 : 0) - this.subtitle.alpha);

			if (this.credits.visible) {
				this.credits.alpha += 0.01 * (1 - this.credits.alpha);
			}
		}
		else {
			this.tap.alpha += 0.01 * (1 - this.tap.alpha);

			if (this.musicTitle.seek > 0) {
				this.bird.setVisible(true);
				this.tap.setVisible(false);
			}
		}


		this.subtitle.setScale(1.0 + 0.02*Math.sin(5*time/1000));

		if (this.isStarting) {
			this.subtitle.setAlpha(0.6 + 0.4*Math.sin(50*time/1000));
		}
	}

	progress() {
		if (!this.bird.visible) {
			this.onBar(1);
		}
		else if (!this.subtitle.visible) {
			this.title.setVisible(true);
			this.title.setAlpha(1);
			this.subtitle.setVisible(true);
			this.subtitle.setAlpha(1);
		}

		else if (!this.isStarting) {
			// this.select.play();
			// this.select2.play();
			this.isStarting = true;
			this.musicTitle.stop();
			this.flash(3000, 0xFFFFFF, 0.6);

			this.addEvent(1000, () => {
				this.fade(true, 1000, 0x000000);
				this.addEvent(1050, () => {
					this.scene.start("GameScene");
				});
			});
		}
	}


	onBar(bar) {
		if (bar >= 4) {
			this.title.setVisible(true);
		}
		if (bar >= 6) {
			this.subtitle.setVisible(true);
		}
		if (bar >= 8) {
			this.credits.setVisible(true);
		}
	}

	onBeat(time) {
		// this.select.play();
	}
}