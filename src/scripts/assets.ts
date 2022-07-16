/* Interface */

interface Asset {
	key: string;
	path: string;
}

interface SpriteSheet {
	key: string;
	path: string;
	width: number;
	height: number;
}

interface Audio {
	key: string;
	path: string;
	volume: number;
	rate?: number;
}


/* Images */

import background from "../assets/images/background.png";
import dragon from "../assets/images/dragon.png";
import concept from "../assets/images/dragon_concept2.png";
import enemy from "../assets/images/enemy.png";
import enemy2 from "../assets/images/enemy2.png";
import d6 from "../assets/images/d6.png";
import d6_roll from "../assets/images/d6_roll.png";
import button from "../assets/images/button.png";

const images: Asset[] = [
	{ key: "background",	path: background },
	{ key: "dragon",		path: dragon },
	{ key: "concept",		path: concept },
	{ key: "enemy",			path: enemy },
	{ key: "enemy2",		path: enemy2 },
	{ key: "d6",			path: d6 },
	{ key: "d6_roll",		path: d6_roll },
	{ key: "button",		path: button },
];


/* Spritesheets */

// import player from "../assets/images/characters/player.png";

import explosion from "../assets/images/explosion.png";

const spritesheets: SpriteSheet[] = [
	// { key: "player",	path: player,			width: 256,	height: 256 },

	{ key: "explosion",	path: explosion,		width: 200,	height: 282 },
];


/* Sounds */

/* Tray */
import t_place_multiple_1 from "../assets/sounds/tray/Place multiple 1.mp3";
import t_place_multiple_2 from "../assets/sounds/tray/Place multiple 2.mp3";
import t_place_multiple_3 from "../assets/sounds/tray/Place multiple 3.mp3";
import t_place_multiple_4 from "../assets/sounds/tray/Place multiple 4.mp3";
import t_place_multiple_5 from "../assets/sounds/tray/Place multiple 5.mp3";
import t_place_single_long_1 from "../assets/sounds/tray/Place single long 1.mp3";
import t_place_single_long_2 from "../assets/sounds/tray/Place single long 2.mp3";
import t_place_single_long_3 from "../assets/sounds/tray/Place single long 3.mp3";
import t_place_single_long_4 from "../assets/sounds/tray/Place single long 4.mp3";
import t_place_single_long_5 from "../assets/sounds/tray/Place single long 5.mp3";
import t_place_single_short_1 from "../assets/sounds/tray/Place single short 1.mp3";
import t_place_single_short_2 from "../assets/sounds/tray/Place single short 2.mp3";
import t_place_single_short_3 from "../assets/sounds/tray/Place single short 3.mp3";
import t_place_single_short_4 from "../assets/sounds/tray/Place single short 4.mp3";
import t_place_single_short_5 from "../assets/sounds/tray/Place single short 5.mp3";
import t_slide_multiple_1 from "../assets/sounds/tray/Slide multiple 1.mp3";
import t_slide_multiple_2 from "../assets/sounds/tray/Slide multiple 2.mp3";
import t_slide_multiple_3 from "../assets/sounds/tray/Slide multiple 3.mp3";
import t_slide_single_1 from "../assets/sounds/tray/Slide single 1.mp3";
import t_slide_single_2 from "../assets/sounds/tray/Slide single 2.mp3";
import t_slide_single_3 from "../assets/sounds/tray/Slide single 3.mp3";
import t_slide_single_4 from "../assets/sounds/tray/Slide single 4.mp3";
import t_slide_single_5 from "../assets/sounds/tray/Slide single 5.mp3";
import t_sweep_multiple_1 from "../assets/sounds/tray/Sweep multiple 1.mp3";
import t_sweep_multiple_2 from "../assets/sounds/tray/Sweep multiple 2.mp3";
import t_sweep_multiple_3 from "../assets/sounds/tray/Sweep multiple 3.mp3";
import t_sweep_single_1 from "../assets/sounds/tray/Sweep single 1.mp3";
import t_sweep_single_2 from "../assets/sounds/tray/Sweep single 2.mp3";
import t_sweep_single_3 from "../assets/sounds/tray/Sweep single 3.mp3";
import t_sweep_single_4 from "../assets/sounds/tray/Sweep single 4.mp3";
import t_sweep_single_5 from "../assets/sounds/tray/Sweep single 5.mp3";
import t_sweep_single_6 from "../assets/sounds/tray/Sweep single 6.mp3";
import t_take_multiple_1 from "../assets/sounds/tray/Take multiple 1.mp3";
import t_take_multiple_2 from "../assets/sounds/tray/Take multiple 2.mp3";
import t_take_multiple_3 from "../assets/sounds/tray/Take multiple 3.mp3";
import t_take_multiple_4 from "../assets/sounds/tray/Take multiple 4.mp3";
import t_take_multiple_5 from "../assets/sounds/tray/Take multiple 5.mp3";

/* Throw */
import t_throw_cardboard_multiple_1 from "../assets/sounds/throw/Throw cardboard multiple 1.mp3";
import t_throw_cardboard_multiple_2 from "../assets/sounds/throw/Throw cardboard multiple 2.mp3";
import t_throw_cardboard_multiple_3 from "../assets/sounds/throw/Throw cardboard multiple 3.mp3";
import t_throw_cardboard_multiple_4 from "../assets/sounds/throw/Throw cardboard multiple 4.mp3";
import t_throw_cardboard_single_long_1 from "../assets/sounds/throw/Throw cardboard single long 1.mp3";
import t_throw_cardboard_single_long_2 from "../assets/sounds/throw/Throw cardboard single long 2.mp3";
import t_throw_cardboard_single_long_3 from "../assets/sounds/throw/Throw cardboard single long 3.mp3";
import t_throw_cardboard_single_medium_1 from "../assets/sounds/throw/Throw cardboard single medium 1.mp3";
import t_throw_cardboard_single_medium_2 from "../assets/sounds/throw/Throw cardboard single medium 2.mp3";
import t_throw_cardboard_single_medium_3 from "../assets/sounds/throw/Throw cardboard single medium 3.mp3";
import t_throw_cardboard_single_short_1 from "../assets/sounds/throw/Throw cardboard single short 1.mp3";
import t_throw_cardboard_single_short_2 from "../assets/sounds/throw/Throw cardboard single short 2.mp3";
import t_throw_cardboard_single_short_3 from "../assets/sounds/throw/Throw cardboard single short 3.mp3";
import t_throw_desk_multiple_1 from "../assets/sounds/throw/Throw desk multiple 1.mp3";
import t_throw_desk_multiple_2 from "../assets/sounds/throw/Throw desk multiple 2.mp3";
import t_throw_desk_multiple_3 from "../assets/sounds/throw/Throw desk multiple 3.mp3";
import t_throw_desk_multiple_4 from "../assets/sounds/throw/Throw desk multiple 4.mp3";
import t_throw_desk_multiple_5 from "../assets/sounds/throw/Throw desk multiple 5.mp3";
import t_throw_desk_single_1 from "../assets/sounds/throw/Throw desk single 1.mp3";
import t_throw_desk_single_2 from "../assets/sounds/throw/Throw desk single 2.mp3";
import t_throw_desk_single_3 from "../assets/sounds/throw/Throw desk single 3.mp3";
import t_throw_desk_single_4 from "../assets/sounds/throw/Throw desk single 4.mp3";
import t_throw_desk_single_5 from "../assets/sounds/throw/Throw desk single 5.mp3";
import t_throw_felt_single_1 from "../assets/sounds/throw/Throw felt single 1.mp3";
import t_throw_felt_single_2 from "../assets/sounds/throw/Throw felt single 2.mp3";
import t_throw_felt_single_3 from "../assets/sounds/throw/Throw felt single 3.mp3";
import t_throw_felt_single_4 from "../assets/sounds/throw/Throw felt single 4.mp3";
import t_throw_felt_single_5 from "../assets/sounds/throw/Throw felt single 5.mp3";
import t_throw_felt_to_desk_1 from "../assets/sounds/throw/Throw felt to_desk 1.mp3";
import t_throw_felt_to_desk_2 from "../assets/sounds/throw/Throw felt to_desk 2.mp3";

/* Hand */
import h_fondle_hard_1 from "../assets/sounds/hand/Fondle hard 1.mp3";
import h_fondle_hard_2 from "../assets/sounds/hand/Fondle hard 2.mp3";
import h_fondle_hard_3 from "../assets/sounds/hand/Fondle hard 3.mp3";
import h_fondle_medium_1 from "../assets/sounds/hand/Fondle medium 1.mp3";
import h_fondle_medium_2 from "../assets/sounds/hand/Fondle medium 2.mp3";
import h_fondle_medium_3 from "../assets/sounds/hand/Fondle medium 3.mp3";
import h_fondle_soft_1 from "../assets/sounds/hand/Fondle soft 1.mp3";
import h_fondle_soft_2 from "../assets/sounds/hand/Fondle soft 2.mp3";
import h_fondle_soft_3 from "../assets/sounds/hand/Fondle soft 3.mp3";
import h_shake_hand_closed_1x from "../assets/sounds/hand/Shake hand closed 1x.mp3";
import h_shake_hand_closed_2x from "../assets/sounds/hand/Shake hand closed 2x.mp3";
import h_shake_hand_closed_3x from "../assets/sounds/hand/Shake hand closed 3x.mp3";
import h_shake_hand_closed_4x from "../assets/sounds/hand/Shake hand closed 4x.mp3";
import h_shake_hand_open_1x from "../assets/sounds/hand/Shake hand open 1x.mp3";
import h_shake_hand_open_2x from "../assets/sounds/hand/Shake hand open 2x.mp3";
import h_shake_hand_open_3x from "../assets/sounds/hand/Shake hand open 3x.mp3";
import h_shake_hand_open_4x from "../assets/sounds/hand/Shake hand open 4x.mp3";
import h_swirl_hand_closed_1 from "../assets/sounds/hand/Swirl hand closed 1.mp3";
import h_swirl_hand_closed_2 from "../assets/sounds/hand/Swirl hand closed 2.mp3";
import h_swirl_hand_closed_3 from "../assets/sounds/hand/Swirl hand closed 3.mp3";
import h_swirl_hand_open_1 from "../assets/sounds/hand/Swirl hand open 1.mp3";
import h_swirl_hand_open_2 from "../assets/sounds/hand/Swirl hand open 2.mp3";
import h_swirl_hand_open_3 from "../assets/sounds/hand/Swirl hand open 3.mp3";

/* Dice */
import d_dice_tap_long_1 from "../assets/sounds/dice/Dice tap long 1.mp3";
import d_dice_tap_long_2 from "../assets/sounds/dice/Dice tap long 2.mp3";
import d_dice_tap_long_3 from "../assets/sounds/dice/Dice tap long 3.mp3";
import d_dice_tap_long_4 from "../assets/sounds/dice/Dice tap long 4.mp3";
import d_dice_tap_long_5 from "../assets/sounds/dice/Dice tap long 5.mp3";
import d_dice_tap_short_1 from "../assets/sounds/dice/Dice tap short 1.mp3";
import d_dice_tap_short_2 from "../assets/sounds/dice/Dice tap short 2.mp3";
import d_dice_tap_short_3 from "../assets/sounds/dice/Dice tap short 3.mp3";
import d_dice_tap_short_4 from "../assets/sounds/dice/Dice tap short 4.mp3";
import d_dice_tap_short_5 from "../assets/sounds/dice/Dice tap short 5.mp3";
import d_fall_down_and_hit_steel_leg_of_an_ikea_desk from "../assets/sounds/dice/Fall down and hit steel leg of an ikea desk.mp3";

/* Cup */
import c_cup_put_multiple_1 from "../assets/sounds/cup/Cup put multiple 1.mp3";
import c_cup_put_multiple_2 from "../assets/sounds/cup/Cup put multiple 2.mp3";
import c_cup_put_multiple_3 from "../assets/sounds/cup/Cup put multiple 3.mp3";
import c_cup_put_single_1 from "../assets/sounds/cup/Cup put single 1.mp3";
import c_cup_put_single_2 from "../assets/sounds/cup/Cup put single 2.mp3";
import c_cup_put_single_3 from "../assets/sounds/cup/Cup put single 3.mp3";
import c_cup_take_multiple_1 from "../assets/sounds/cup/Cup take multiple 1.mp3";
import c_cup_take_multiple_2 from "../assets/sounds/cup/Cup take multiple 2.mp3";
import c_cup_take_multiple_3 from "../assets/sounds/cup/Cup take multiple 3.mp3";
import c_cup_take_single_1 from "../assets/sounds/cup/Cup take single 1.mp3";
import c_cup_take_single_2 from "../assets/sounds/cup/Cup take single 2.mp3";
import c_cup_take_single_3 from "../assets/sounds/cup/Cup take single 3.mp3";
import c_shake_cup_multiple_hard_1 from "../assets/sounds/cup/Shake cup multiple hard 1.mp3";
import c_shake_cup_multiple_hard_2 from "../assets/sounds/cup/Shake cup multiple hard 2.mp3";
import c_shake_cup_multiple_hard_3 from "../assets/sounds/cup/Shake cup multiple hard 3.mp3";
import c_shake_cup_multiple_medium_1 from "../assets/sounds/cup/Shake cup multiple medium 1.mp3";
import c_shake_cup_multiple_medium_2 from "../assets/sounds/cup/Shake cup multiple medium 2.mp3";
import c_shake_cup_multiple_medium_3 from "../assets/sounds/cup/Shake cup multiple medium 3.mp3";
import c_shake_cup_multiple_soft_1 from "../assets/sounds/cup/Shake cup multiple soft 1.mp3";
import c_shake_cup_multiple_soft_2 from "../assets/sounds/cup/Shake cup multiple soft 2.mp3";
import c_shake_cup_multiple_soft_3 from "../assets/sounds/cup/Shake cup multiple soft 3.mp3";
import c_shake_cup_single_long_1 from "../assets/sounds/cup/Shake cup single long 1.mp3";
import c_shake_cup_single_long_2 from "../assets/sounds/cup/Shake cup single long 2.mp3";
import c_shake_cup_single_long_3 from "../assets/sounds/cup/Shake cup single long 3.mp3";
import c_shake_cup_single_short_1 from "../assets/sounds/cup/Shake cup single short 1.mp3";
import c_shake_cup_single_short_2 from "../assets/sounds/cup/Shake cup single short 2.mp3";
import c_shake_cup_single_short_3 from "../assets/sounds/cup/Shake cup single short 3.mp3";
import c_swirl_cup_multiple_1 from "../assets/sounds/cup/swirl cup multiple 1.mp3";
import c_swirl_cup_multiple_2 from "../assets/sounds/cup/swirl cup multiple 2.mp3";
import c_swirl_cup_multiple_3 from "../assets/sounds/cup/swirl cup multiple 3.mp3";
import c_swirl_cup_multiple_4 from "../assets/sounds/cup/swirl cup multiple 4.mp3";
import c_swirl_cup_multiple_long_1 from "../assets/sounds/cup/swirl cup single long 1.mp3";
import c_swirl_cup_multiple_long_2 from "../assets/sounds/cup/swirl cup single long 2.mp3";
import c_swirl_cup_multiple_long_3 from "../assets/sounds/cup/swirl cup single long 3.mp3";
import c_swirl_cup_single_short_1 from "../assets/sounds/cup/swirl cup single short 1.mp3";
import c_swirl_cup_single_short_2 from "../assets/sounds/cup/swirl cup single short 2.mp3";
import c_swirl_cup_single_short_3 from "../assets/sounds/cup/swirl cup single short 3.mp3";

const audios: Audio[] = [
	// { key: "music_day", path: music_day, volume: 0.25 },

	// { key: "dog", path: g_dog, volume: 0.5 },
];


/* Export */

export {
	images,
	spritesheets,
	audios
};