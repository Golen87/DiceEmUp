import { BaseScene } from "./BaseScene";
import { RoundRectangle } from "../components/RoundRectangle";
import { Music } from "./../components/Music";


const creditsLeft = `GMTK Game Jam 2022

@Golenchu
@ArcticFqx
@LuxxArt
@KonixKun
@MatoCookies
Kiu
Lumie
Wilon`;

const creditsRight = `

code
code
art
art
music
sound
art
concept`;


export class MenuScene extends BaseScene {
	public bg: Phaser.GameObjects.Image;
	public dragon: Phaser.GameObjects.Image;
	public roof: Phaser.GameObjects.Image;
	public hands: Phaser.GameObjects.Image;
	public diceBlue: Phaser.GameObjects.Image;
	public diceGreen: Phaser.GameObjects.Image;
	public diceRed: Phaser.GameObjects.Image;
	public knights: Phaser.GameObjects.Image;

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


		// this.bg = this.add.image(this.CX, this.CY, "CoverArtBg");
		// this.containToScreen(this.bg);
		// this.imp = this.add.image(this.CX+80, this.CY-60, "CoverArtImp");
		// this.imp.setAlpha(0);
		// this.containToScreen(this.imp);
		// this.angel = this.add.image(this.CX-90, this.CY-50, "CoverArtAngel");
		// this.angel.setAlpha(0);
		// this.containToScreen(this.angel);
		// this.dragon = this.add.image(this.CX-40, this.CY+70, "CoverArtdragon");


		this.bg = this.add.image(this.CX, this.CY, "cover_background_orange");
		this.containToScreen(this.bg);
		this.dragon = this.add.image(this.CX, this.CY, "cover_body");
		this.containToScreen(this.dragon);
		this.roof = this.add.image(this.CX, this.CY, "cover_roof");
		this.containToScreen(this.roof);
		this.hands = this.add.image(this.CX, this.CY, "cover_hands");
		this.containToScreen(this.hands);
		this.diceBlue = this.add.image(this.CX, this.CY, "cover_dice_blue");
		this.containToScreen(this.diceBlue);
		this.diceGreen = this.add.image(this.CX, this.CY, "cover_dice_green");
		this.containToScreen(this.diceGreen);
		this.diceRed = this.add.image(this.CX, this.CY, "cover_dice_red");
		this.containToScreen(this.diceRed);
		this.knights = this.add.image(this.CX, this.CY, "cover_knights");
		this.containToScreen(this.knights);

		this.dragon.setVisible(false);
		this.dragon.setAlpha(0);
		this.diceGreen.setAlpha(0);
		this.diceBlue.setAlpha(0);
		this.diceRed.setAlpha(0);
		this.dragon.y += 300;
		this.roof.y += 50;
		this.hands.y += 50;


		this.title = this.createText(this.CX, this.H-75, 60, "#000", "Fire and Dice");
		this.title.setOrigin(0.5, 1.0);
		this.title.setStroke("#FFF", 8);
		this.title.setVisible(false);
		this.title.setAlpha(0);

		this.subtitle = this.createText(this.CX, this.H-50, 35, "#000", "Tap to start");
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
			this.musicTitle = new Music(this, "m_main_menu", { volume: 0.25 });
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
		if (this.dragon.visible) {
			this.dragon.y		+= 0.02 * (this.CY - this.dragon.y);
			this.roof.y		+= 0.025 * (this.CY - this.roof.y);
			this.hands.y		+= 0.025 * (this.CY - this.hands.y);

			this.roof.x		+= 0.01 * ((this.CX + 6 * Math.cos(1*0.4*time/1000)) - this.roof.x);
			this.hands.x		+= 0.01 * ((this.CX + 7 * Math.cos(1*0.4*time/1000)) - this.hands.x);

			this.diceBlue.x		+= 0.03 * ((this.CX + 5 * Math.sin(time/1000+Math.PI/4)) - this.diceBlue.x);
			this.diceGreen.x	+= 0.03 * ((this.CX - 5 * Math.sin(time/1000)) - this.diceGreen.x);
			this.diceRed.x		+= 0.03 * ((this.CX - 7 * Math.sin(time/1000+Math.PI/3)) - this.diceGreen.x);
			this.diceBlue.y		+= 0.03 * ((this.CY + 10 * Math.sin(0.6*time/1000+Math.PI/4)) - this.diceBlue.y);
			this.diceGreen.y	+= 0.03 * ((this.CY - 10 * Math.sin(0.6*time/1000)) - this.diceGreen.y);
			this.diceRed.y		+= 0.03 * ((this.CY - 7 * Math.sin(0.6*time/1000+Math.PI/3)) - this.diceGreen.y);

			this.knights.x		+= 0.01 * ((this.CX + 15 * Math.cos(4*0.4*time/1000)) - this.knights.x);

			this.dragon.alpha += 0.03 * (1 - this.dragon.alpha);
			this.diceGreen.alpha += 0.02 * (1 - this.diceGreen.alpha);
			this.diceBlue.alpha += 0.02 * (1 - this.diceBlue.alpha);
			this.diceRed.alpha += 0.02 * (1 - this.diceRed.alpha);

			this.title.alpha += 0.02 * ((this.title.visible ? 1 : 0) - this.title.alpha);
			this.subtitle.alpha += 0.02 * ((this.subtitle.visible ? 1 : 0) - this.subtitle.alpha);

			if (this.credits.visible) {
				this.credits.alpha += 0.01 * (1 - this.credits.alpha);
			}
		}
		else {
			this.tap.alpha += 0.01 * (1 - this.tap.alpha);

			if (this.musicTitle.seek > 0) {
				this.dragon.setVisible(true);
				this.tap.setVisible(false);
			}
		}


		this.subtitle.setScale(1.0 + 0.02*Math.sin(5*time/1000));

		if (this.isStarting) {
			this.subtitle.setAlpha(0.6 + 0.4*Math.sin(50*time/1000));
		}
	}

	progress() {
		if (!this.dragon.visible) {
			this.onBar(1);
		}
		else if (!this.subtitle.visible) {
			this.title.setVisible(true);
			this.title.setAlpha(1);
			this.subtitle.setVisible(true);
			this.subtitle.setAlpha(1);
		}

		else if (!this.isStarting) {
			this.sound.play("m_slice", { volume: 0.3 });
			this.sound.play("u_attack_button", { volume: 0.5 });
			// this.select2.play();
			this.isStarting = true;
			if (this.musicTitle.seek < 16.520) {
				this.musicTitle.setSeek(16.520);
				this.musicTitle.setVolume(this.musicTitle.volume / 2);
			}
			this.flash(3000, 0xFFFFFF, 0.6);

			this.addEvent(1000, () => {
				this.fade(true, 1000, 0x000000);
				this.addEvent(1050, () => {
					this.musicTitle.stop();
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