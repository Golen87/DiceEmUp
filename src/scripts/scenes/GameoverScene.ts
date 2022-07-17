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


export class GameoverScene extends BaseScene {
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
		super({key: "GameoverScene"});
	}

	create(): void {
		this.fade(false, 200, 0x000000);


		this.bg = this.add.image(this.CX, this.CY, "gameover");
		this.containToScreen(this.bg);


		this.title = this.createText(this.CX, this.CY-45, 60, "#000", "Game Over");
		this.title.setOrigin(0.5, 1.0);
		this.title.setStroke("#FFF", 8);
		// this.title.setVisible(false);
		// this.title.setAlpha(0);

		this.subtitle = this.createText(this.CX, this.CY-20, 35, "#000", "Tap to try again");
		this.subtitle.setOrigin(0.5);
		this.subtitle.setStroke("#FFF", 4);
		// this.subtitle.setVisible(false);
		// this.subtitle.setAlpha(0);

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
		this.sound.play('j_defeat', { volume: 0.4 });
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
		this.subtitle.setScale(1.0 + 0.02*Math.sin(5*time/1000));
	}

	progress() {
		// if (!this.dragon.visible) {
			// this.onBar(1);
		// }
		// else if (!this.subtitle.visible) {
			// this.title.setVisible(true);
			// this.title.setAlpha(1);
			// this.subtitle.setVisible(true);
			// this.subtitle.setAlpha(1);
		// }

		// else if (!this.isStarting) {
		// this.sound.play("m_slice", { volume: 0.3 });
		this.sound.play("u_attack_button", { volume: 0.5 });
		// this.select2.play();
		this.isStarting = true;
		this.musicTitle.stop();
		// if (this.musicTitle.seek < 16.520) {
			// this.musicTitle.setSeek(16.520);
			// this.musicTitle.setVolume(this.musicTitle.volume / 2);
		// }
		this.flash(3000, 0xFFFFFF, 0.6);

		this.addEvent(1000, () => {
			this.fade(true, 1000, 0x000000);
			this.addEvent(1050, () => {
				this.musicTitle.stop();
				this.scene.start("MenuScene");
			});
		});
		// }
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