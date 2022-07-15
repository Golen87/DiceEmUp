import { GameScene } from "../scenes/GameScene";
import { interpolateColor } from "../utils";

const EDGE = 0.235;


export class Background extends Phaser.GameObjects.Container {
	public scene: GameScene;

	private dayImages: any[];
	private nightImages: any[];

	private stars: Phaser.GameObjects.TileSprite;
	private sun: Phaser.GameObjects.Image;
	private moon: Phaser.GameObjects.Image;
	private clouds: Phaser.GameObjects.TileSprite[];
	private cloudCont: Phaser.GameObjects.Container;
	// private face: Phaser.GameObjects.Image;


	constructor(scene: GameScene) {
		super(scene);
		this.scene = scene;
		scene.add.existing(this);

		const cx = scene.CX;
		const cy = scene.CY;

		const tsx = EDGE * scene.W;
		const tsy = 0;
		const tsw = (1 - 2*EDGE) * scene.W;
		const tsh = scene.H;

		this.dayImages = [];
		this.nightImages = [];


		// Day

		let day = scene.add.image(cx, cy, "bg_day");
		day.setBlendMode(Phaser.BlendModes.ADD);
		this.dayImages.push(day)
		scene.containToScreen(day);
		this.add(day);

		let night = scene.add.image(cx, cy, "bg_night");
		night.setBlendMode(Phaser.BlendModes.ADD);
		this.nightImages.push(night);
		scene.containToScreen(night);
		this.add(night);

		this.stars = scene.add.tileSprite(cx, cy, scene.W, scene.H, "bg_night_stars");
		this.stars.setBlendMode(Phaser.BlendModes.ADD);
		this.stars.tileScaleX = 0.5;
		this.stars.tileScaleY = 0.5;
		this.nightImages.push(this.stars);
		this.add(this.stars);

		let light = scene.add.image(cx, cy, "bg_night_light");
		light.setBlendMode(Phaser.BlendModes.ADD);
		light.setScale(0.5);
		this.nightImages.push(light);
		this.add(light);


		const sx = 0.25 * scene.W;
		const sx2 = (1-0.25) * scene.W;
		const sy = 0.11 * cy;

		this.sun = scene.add.image(sx, sy, "bg_day_sun");
		this.sun.setScale(0.5);
		this.dayImages.push(this.sun)
		this.add(this.sun);

		this.moon = scene.add.image(sx2, sy, "bg_night_moon");
		this.moon.setScale(0.5);
		this.nightImages.push(this.moon);
		this.add(this.moon);


		// Clouds

		this.cloudCont = scene.add.container(cx, cy);
		this.clouds = [];
		for (let i = 0; i < 4; i++) {
			let cloud = scene.add.tileSprite(0, 0, (1-2*EDGE)*scene.W, scene.H, "bg_clouds");
			cloud.setBlendMode(Phaser.BlendModes.SCREEN);

			cloud.setAlpha(0.15 + 0.03*i);
			cloud.tileScaleX = 1.2 - 0.2*i;
			cloud.tileScaleY = 1.2 - 0.2*i;
			cloud.setData("dx", 0);
			cloud.setData("dy", -800 + 200*i);

			this.clouds.push(cloud);
			this.cloudCont.add(cloud);
		}

		// this.face = scene.add.image(cx, cy, "face");
		// this.face.setAlpha(0);
		// scene.containToScreen(this.face);
	}


	update(time: number, delta: number, dayTimeSmooth: number) {
		// this.face.alpha -= delta;
		this.cloudCont.setAlpha(dayTimeSmooth);

		// Change alpha depending on day time
		this.dayImages.forEach((image: Phaser.GameObjects.Image, index: number) => {
			image.setAlpha(dayTimeSmooth);
		});
		this.nightImages.forEach((image: Phaser.GameObjects.Image, index: number) => {
			image.setAlpha(1 - dayTimeSmooth);
		});

		// Rotate sun and moon
		this.sun.angle = 5 * time;
		this.moon.angle = 5 * time;

		// TileSprite
		this.stars.tilePositionX = 2 * time;
		this.stars.tilePositionY = 15 * time;

		for (let cloud of this.clouds) {
			cloud.tilePositionX = cloud.getData("dx") * time;
			cloud.tilePositionY = cloud.getData("dy") * time;
		}
	}

	// boom() {
	// 	this.face.alpha = 1;
	// 	this.scene.sounds.boom.play();
	// }
}
