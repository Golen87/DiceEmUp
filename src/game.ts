import "phaser";
import { PreloadScene } from "./scripts/scenes/PreloadScene";
import { MenuScene } from "./scripts/scenes/MenuScene";
import { OverworldScene } from "./scripts/scenes/OverworldScene";
import { GameScene } from "./scripts/scenes/GameScene";

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.WEBGL,
	width: 1920/2,
	height: 1080/2,
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
	],
	plugins: {
		global: [
		]
	}
};

const game = new Phaser.Game(config);