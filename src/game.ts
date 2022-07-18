import "phaser";
import { PreloadScene } from "./scripts/scenes/PreloadScene";
import { MenuScene } from "./scripts/scenes/MenuScene";
import { GameoverScene } from "./scripts/scenes/GameoverScene";
import { OverworldScene } from "./scripts/scenes/OverworldScene";
import { GameScene } from "./scripts/scenes/GameScene";
import { SCALEDOWN } from "./scripts/constants";

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.WEBGL,
	width: 1920/SCALEDOWN,
	height: 1080/SCALEDOWN,
	// pixelArt: true,
	// disableContextMenu: true,
	scale: {
		mode: Phaser.Scale.FIT
	},
	scene: [
		PreloadScene,
		MenuScene,
		OverworldScene,
		GameScene,
		GameoverScene,
	],
	plugins: {
		global: [
		]
	}
};

const game = new Phaser.Game(config);