import { BaseScene } from "../scenes/BaseScene";

export class RoundRectangle extends Phaser.GameObjects.Container {
	public scene: BaseScene;

	private context: Phaser.GameObjects.Graphics;
	private polygon: Phaser.GameObjects.Polygon;
	private radius: number;
	private color: number;
	private origin: Phaser.Math.Vector2;
	private points: any;

	constructor(scene: BaseScene, x: number, y: number, width: number, height: number, radius: number, color: number, alpha: number=1.0) {
		super(scene, x, y);
		scene.add.existing(this);

		this.scene = scene;
		this.radius = radius;
		this.width = Math.max(width, 2*radius);
		this.height = Math.max(height, 2*radius);
		this.color = color;
		this.origin = new Phaser.Math.Vector2(0.5, 0.5);
		this.setAlpha(alpha);

		this.context = this.scene.add.graphics({x: 0, y: 0});
		this.add(this.context);

		this.updatePolygon();
	}

	setWidth(value: number) {
		this.width = Math.max(value, 2*this.radius);
		this.updatePolygon();
	}

	setHeight(value: number) {
		this.height = Math.max(value, 2*this.radius);
		this.updatePolygon();
	}

	setRadius(value: number) {
		this.radius = value;
		this.updatePolygon();
	}

	setColor(value: number) {
		this.color = value;
		this.updatePolygon(false);
	}

	setOrigin(x: number, y?: number) {
		if (y === undefined) {
			y = x;
		}
		this.origin.x = x; // NOT WORKING ATM
		this.origin.y = y;
		this.updatePolygon();
	}

	updatePolygon(sizeChange: boolean=true) {
		if (sizeChange) {
			let points:any=[], t=16;
			for (let j = 0; j < 4; j++) {
				let sx = Math.sign(Math.cos(j*Math.PI/2+0.1));
				let sy = Math.sign(Math.sin(j*Math.PI/2+0.1));
				for (let i = 0; i < t; i++) {
					let px = Math.cos(j*Math.PI/2 + i/(t-1)*Math.PI/2);
					let py = Math.sin(j*Math.PI/2 + i/(t-1)*Math.PI/2);
					points.push({
						x: ((0.5 - this.origin.x) * this.width) + sx * (this.width/2-this.radius) + this.radius*px,
						y: ((0.5 - this.origin.y) * this.height) + sy * (this.height/2-this.radius) + this.radius*py
					});
				}
			}
			this.points = points;
		}

		this.context.clear();
		this.context.fillStyle(this.color, 1.0);
		this.context.fillPoints(this.points, true, true);
	}
}