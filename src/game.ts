import "phaser";
import { PreloadScene } from "./scripts/scenes/PreloadScene";
import { MenuScene } from "./scripts/scenes/MenuScene";
import { GameoverScene } from "./scripts/scenes/GameoverScene";
import { OverworldScene } from "./scripts/scenes/OverworldScene";
import { GameScene } from "./scripts/scenes/GameScene";

import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SafeAreaController } from '@aashu-dubey/capacitor-statusbar-safe-area';

/* Android specific features */
if ( Capacitor.getPlatform() != 'web' ) {
	StatusBar.setOverlaysWebView({ overlay: true });
	StatusBar.setStyle({ style: Style.Dark });
	SafeAreaController.injectCSSVariables();
}

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
		GameoverScene,
	],
	plugins: {
		global: [
		]
	}
};

const game = new Phaser.Game(config);