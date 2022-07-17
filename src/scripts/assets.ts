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
import concept from "../assets/images/dragon_concept2.png";

import d6 from "../assets/images/dice/d6.png";
import d6_roll from "../assets/images/dice/d6_roll.png";
import shadow from "../assets/images/shadow.png";

import ui_healthbar from "../assets/images/ui/ui_healthbar.png";

const images: Asset[] = [
	{ key: "background",	path: background },
	{ key: "concept",		path: concept },
	{ key: "d6",			path: d6 },
	{ key: "d6_roll",		path: d6_roll },
	{ key: "shadow",		path: shadow },

	// UI
	{ key: "ui_healthbar",	path: ui_healthbar },
];


/* Spritesheets */

// import player from "../assets/images/characters/player.png";

import explosion from "../assets/images/explosion.png";
import dragon from "../assets/images/dragon_spritesheet.png";
import enemy from "../assets/images/enemy.png";
import tank from "../assets/images/tank.png";
import enemy_trojan from "../assets/images/enemy_trojan.png";
import dice from "../assets/images/dice/dice.png"
import fire from "../assets/images/bad_fire.png"
import attack_button from "../assets/images/ui/button.png";
import fire_button from "../assets/images/ui/fire_button.png";

const spritesheets: SpriteSheet[] = [
	{ key: "dragon",	path: dragon,		width: 840/2,	height: 1080/2 },
	{ key: "enemy",		path: enemy,		width: 540,	height: 540 },
	{ key: "tank",		path: tank,			width: 540,	height: 540 },
	{ key: "trojan",	path: enemy_trojan,			width: 540,	height: 540 },
	{ key: "dice",		path: dice,			width: 512/2,	height: 512/2 },
	{ key: "fire",		path: fire,			width: 512,	height: 512 },
	{ key: "explosion",	path: explosion,	width: 200,	height: 282 },
	{ key: "attack_button",	path: attack_button,	width: 532,	height: 219  },
	{ key: "fire_button",	path: fire_button,	width: 512,	height: 256  },
];


/* Sounds */

/* UI */
import u_attack_button from "../assets/sounds/ui/Attack_Button.mp3";
import u_disabled from "../assets/sounds/ui/Disabled.mp3";

/* Enemy */
import e_advance from "../assets/sounds/enemy/Enemy_Advance.mp3";
import e_damage from "../assets/sounds/enemy/Enemy_Damage.mp3";

/* Dragon */

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
import t_throw_felt_to_desk_1 from "../assets/sounds/throw/Throw felt to desk 1.mp3";
import t_throw_felt_to_desk_2 from "../assets/sounds/throw/Throw felt to desk 2.mp3";

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
import c_swirl_cup_multiple_1 from "../assets/sounds/cup/Swirl cup multiple 1.mp3";
import c_swirl_cup_multiple_2 from "../assets/sounds/cup/Swirl cup multiple 2.mp3";
import c_swirl_cup_multiple_3 from "../assets/sounds/cup/Swirl cup multiple 3.mp3";
import c_swirl_cup_multiple_4 from "../assets/sounds/cup/Swirl cup multiple 4.mp3";
import c_swirl_cup_multiple_long_1 from "../assets/sounds/cup/Swirl cup single long 1.mp3";
import c_swirl_cup_multiple_long_2 from "../assets/sounds/cup/Swirl cup single long 2.mp3";
import c_swirl_cup_multiple_long_3 from "../assets/sounds/cup/Swirl cup single long 3.mp3";
import c_swirl_cup_single_short_1 from "../assets/sounds/cup/Swirl cup single short 1.mp3";
import c_swirl_cup_single_short_2 from "../assets/sounds/cup/Swirl cup single short 3.mp3";
import c_swirl_cup_single_short_3 from "../assets/sounds/cup/Swirl cup single short 1.mp3";

const audios: Audio[] = [
	{ key: "u_attack_button", path: u_attack_button, volume: 1 },
	{ key: "u_disabled", path: u_disabled, volume: 1 },

	{ key: "e_advance", path: e_advance, volume: 1 },
	{ key: "e_damage", path: e_damage, volume: 1 },

	{ key: "t_place_multiple_1", path: t_place_multiple_1, volume: 1 },
	{ key: "t_place_multiple_2", path: t_place_multiple_2, volume: 1 },
	{ key: "t_place_multiple_3", path: t_place_multiple_3, volume: 1 },
	{ key: "t_place_multiple_4", path: t_place_multiple_4, volume: 1 },
	{ key: "t_place_multiple_5", path: t_place_multiple_5, volume: 1 },
	{ key: "t_place_single_long_1", path: t_place_single_long_1, volume: 1 },
	{ key: "t_place_single_long_2", path: t_place_single_long_2, volume: 1 },
	{ key: "t_place_single_long_3", path: t_place_single_long_3, volume: 1 },
	{ key: "t_place_single_long_4", path: t_place_single_long_4, volume: 1 },
	{ key: "t_place_single_long_5", path: t_place_single_long_5, volume: 1 },
	{ key: "t_place_single_short_1", path: t_place_single_short_1, volume: 1 },
	{ key: "t_place_single_short_2", path: t_place_single_short_2, volume: 1 },
	{ key: "t_place_single_short_3", path: t_place_single_short_3, volume: 1 },
	{ key: "t_place_single_short_4", path: t_place_single_short_4, volume: 1 },
	{ key: "t_place_single_short_5", path: t_place_single_short_5, volume: 1 },
	{ key: "t_slide_multiple_1", path: t_slide_multiple_1, volume: 1 },
	{ key: "t_slide_multiple_2", path: t_slide_multiple_2, volume: 1 },
	{ key: "t_slide_multiple_3", path: t_slide_multiple_3, volume: 1 },
	{ key: "t_slide_single_1", path: t_slide_single_1, volume: 1 },
	{ key: "t_slide_single_2", path: t_slide_single_2, volume: 1 },
	{ key: "t_slide_single_3", path: t_slide_single_3, volume: 1 },
	{ key: "t_slide_single_4", path: t_slide_single_4, volume: 1 },
	{ key: "t_slide_single_5", path: t_slide_single_5, volume: 1 },
	{ key: "t_sweep_multiple_1", path: t_sweep_multiple_1, volume: 1 },
	{ key: "t_sweep_multiple_2", path: t_sweep_multiple_2, volume: 1 },
	{ key: "t_sweep_multiple_3", path: t_sweep_multiple_3, volume: 1 },
	{ key: "t_sweep_single_1", path: t_sweep_single_1, volume: 1 },
	{ key: "t_sweep_single_2", path: t_sweep_single_2, volume: 1 },
	{ key: "t_sweep_single_3", path: t_sweep_single_3, volume: 1 },
	{ key: "t_sweep_single_4", path: t_sweep_single_4, volume: 1 },
	{ key: "t_sweep_single_5", path: t_sweep_single_5, volume: 1 },
	{ key: "t_sweep_single_6", path: t_sweep_single_6, volume: 1 },
	{ key: "t_take_multiple_1", path: t_take_multiple_1, volume: 1 },
	{ key: "t_take_multiple_2", path: t_take_multiple_2, volume: 1 },
	{ key: "t_take_multiple_3", path: t_take_multiple_3, volume: 1 },
	{ key: "t_take_multiple_4", path: t_take_multiple_4, volume: 1 },
	{ key: "t_take_multiple_5", path: t_take_multiple_5, volume: 1 },
	{ key: "t_throw_cardboard_multiple_1", path: t_throw_cardboard_multiple_1, volume: 1 },
	{ key: "t_throw_cardboard_multiple_2", path: t_throw_cardboard_multiple_2, volume: 1 },
	{ key: "t_throw_cardboard_multiple_3", path: t_throw_cardboard_multiple_3, volume: 1 },
	{ key: "t_throw_cardboard_multiple_4", path: t_throw_cardboard_multiple_4, volume: 1 },
	{ key: "t_throw_cardboard_single_long_1", path: t_throw_cardboard_single_long_1, volume: 1 },
	{ key: "t_throw_cardboard_single_long_2", path: t_throw_cardboard_single_long_2, volume: 1 },
	{ key: "t_throw_cardboard_single_long_3", path: t_throw_cardboard_single_long_3, volume: 1 },
	{ key: "t_throw_cardboard_single_medium_1", path: t_throw_cardboard_single_medium_1, volume: 1 },
	{ key: "t_throw_cardboard_single_medium_2", path: t_throw_cardboard_single_medium_2, volume: 1 },
	{ key: "t_throw_cardboard_single_medium_3", path: t_throw_cardboard_single_medium_3, volume: 1 },
	{ key: "t_throw_cardboard_single_short_1", path: t_throw_cardboard_single_short_1, volume: 1 },
	{ key: "t_throw_cardboard_single_short_2", path: t_throw_cardboard_single_short_2, volume: 1 },
	{ key: "t_throw_cardboard_single_short_3", path: t_throw_cardboard_single_short_3, volume: 1 },
	{ key: "t_throw_desk_multiple_1", path: t_throw_desk_multiple_1, volume: 1 },
	{ key: "t_throw_desk_multiple_2", path: t_throw_desk_multiple_2, volume: 1 },
	{ key: "t_throw_desk_multiple_3", path: t_throw_desk_multiple_3, volume: 1 },
	{ key: "t_throw_desk_multiple_4", path: t_throw_desk_multiple_4, volume: 1 },
	{ key: "t_throw_desk_multiple_5", path: t_throw_desk_multiple_5, volume: 1 },
	{ key: "t_throw_desk_single_1", path: t_throw_desk_single_1, volume: 1 },
	{ key: "t_throw_desk_single_2", path: t_throw_desk_single_2, volume: 1 },
	{ key: "t_throw_desk_single_3", path: t_throw_desk_single_3, volume: 1 },
	{ key: "t_throw_desk_single_4", path: t_throw_desk_single_4, volume: 1 },
	{ key: "t_throw_desk_single_5", path: t_throw_desk_single_5, volume: 1 },
	{ key: "t_throw_felt_single_1", path: t_throw_felt_single_1, volume: 1 },
	{ key: "t_throw_felt_single_2", path: t_throw_felt_single_2, volume: 1 },
	{ key: "t_throw_felt_single_3", path: t_throw_felt_single_3, volume: 1 },
	{ key: "t_throw_felt_single_4", path: t_throw_felt_single_4, volume: 1 },
	{ key: "t_throw_felt_single_5", path: t_throw_felt_single_5, volume: 1 },
	{ key: "t_throw_felt_to_desk_1", path: t_throw_felt_to_desk_1, volume: 1 },
	{ key: "t_throw_felt_to_desk_2", path: t_throw_felt_to_desk_2, volume: 1 },
	{ key: "h_fondle_hard_1", path: h_fondle_hard_1, volume: 1 },
	{ key: "h_fondle_hard_2", path: h_fondle_hard_2, volume: 1 },
	{ key: "h_fondle_hard_3", path: h_fondle_hard_3, volume: 1 },
	{ key: "h_fondle_medium_1", path: h_fondle_medium_1, volume: 1 },
	{ key: "h_fondle_medium_2", path: h_fondle_medium_2, volume: 1 },
	{ key: "h_fondle_medium_3", path: h_fondle_medium_3, volume: 1 },
	{ key: "h_fondle_soft_1", path: h_fondle_soft_1, volume: 1 },
	{ key: "h_fondle_soft_2", path: h_fondle_soft_2, volume: 1 },
	{ key: "h_fondle_soft_3", path: h_fondle_soft_3, volume: 1 },
	{ key: "h_shake_hand_closed_1x", path: h_shake_hand_closed_1x, volume: 1 },
	{ key: "h_shake_hand_closed_2x", path: h_shake_hand_closed_2x, volume: 1 },
	{ key: "h_shake_hand_closed_3x", path: h_shake_hand_closed_3x, volume: 1 },
	{ key: "h_shake_hand_closed_4x", path: h_shake_hand_closed_4x, volume: 1 },
	{ key: "h_shake_hand_open_1x", path: h_shake_hand_open_1x, volume: 1 },
	{ key: "h_shake_hand_open_2x", path: h_shake_hand_open_2x, volume: 1 },
	{ key: "h_shake_hand_open_3x", path: h_shake_hand_open_3x, volume: 1 },
	{ key: "h_shake_hand_open_4x", path: h_shake_hand_open_4x, volume: 1 },
	{ key: "h_swirl_hand_closed_1", path: h_swirl_hand_closed_1, volume: 1 },
	{ key: "h_swirl_hand_closed_2", path: h_swirl_hand_closed_2, volume: 1 },
	{ key: "h_swirl_hand_closed_3", path: h_swirl_hand_closed_3, volume: 1 },
	{ key: "h_swirl_hand_open_1", path: h_swirl_hand_open_1, volume: 1 },
	{ key: "h_swirl_hand_open_2", path: h_swirl_hand_open_2, volume: 1 },
	{ key: "h_swirl_hand_open_3", path: h_swirl_hand_open_3, volume: 1 },
	{ key: "d_dice_tap_long_1", path: d_dice_tap_long_1, volume: 1 },
	{ key: "d_dice_tap_long_2", path: d_dice_tap_long_2, volume: 1 },
	{ key: "d_dice_tap_long_3", path: d_dice_tap_long_3, volume: 1 },
	{ key: "d_dice_tap_long_4", path: d_dice_tap_long_4, volume: 1 },
	{ key: "d_dice_tap_long_5", path: d_dice_tap_long_5, volume: 1 },
	{ key: "d_dice_tap_short_1", path: d_dice_tap_short_1, volume: 1 },
	{ key: "d_dice_tap_short_2", path: d_dice_tap_short_2, volume: 1 },
	{ key: "d_dice_tap_short_3", path: d_dice_tap_short_3, volume: 1 },
	{ key: "d_dice_tap_short_4", path: d_dice_tap_short_4, volume: 1 },
	{ key: "d_dice_tap_short_5", path: d_dice_tap_short_5, volume: 1 },
	{ key: "d_fall_down_and_hit_steel_leg_of_an_ikea_desk", path: d_fall_down_and_hit_steel_leg_of_an_ikea_desk, volume: 1 },
	{ key: "c_cup_put_multiple_1", path: c_cup_put_multiple_1, volume: 1 },
	{ key: "c_cup_put_multiple_2", path: c_cup_put_multiple_2, volume: 1 },
	{ key: "c_cup_put_multiple_3", path: c_cup_put_multiple_3, volume: 1 },
	{ key: "c_cup_put_single_1", path: c_cup_put_single_1, volume: 1 },
	{ key: "c_cup_put_single_2", path: c_cup_put_single_2, volume: 1 },
	{ key: "c_cup_put_single_3", path: c_cup_put_single_3, volume: 1 },
	{ key: "c_cup_take_multiple_1", path: c_cup_take_multiple_1, volume: 1 },
	{ key: "c_cup_take_multiple_2", path: c_cup_take_multiple_2, volume: 1 },
	{ key: "c_cup_take_multiple_3", path: c_cup_take_multiple_3, volume: 1 },
	{ key: "c_cup_take_single_1", path: c_cup_take_single_1, volume: 1 },
	{ key: "c_cup_take_single_2", path: c_cup_take_single_2, volume: 1 },
	{ key: "c_cup_take_single_3", path: c_cup_take_single_3, volume: 1 },
	{ key: "c_shake_cup_multiple_hard_1", path: c_shake_cup_multiple_hard_1, volume: 1 },
	{ key: "c_shake_cup_multiple_hard_2", path: c_shake_cup_multiple_hard_2, volume: 1 },
	{ key: "c_shake_cup_multiple_hard_3", path: c_shake_cup_multiple_hard_3, volume: 1 },
	{ key: "c_shake_cup_multiple_medium_1", path: c_shake_cup_multiple_medium_1, volume: 1 },
	{ key: "c_shake_cup_multiple_medium_2", path: c_shake_cup_multiple_medium_2, volume: 1 },
	{ key: "c_shake_cup_multiple_medium_3", path: c_shake_cup_multiple_medium_3, volume: 1 },
	{ key: "c_shake_cup_multiple_soft_1", path: c_shake_cup_multiple_soft_1, volume: 1 },
	{ key: "c_shake_cup_multiple_soft_2", path: c_shake_cup_multiple_soft_2, volume: 1 },
	{ key: "c_shake_cup_multiple_soft_3", path: c_shake_cup_multiple_soft_3, volume: 1 },
	{ key: "c_shake_cup_single_long_1", path: c_shake_cup_single_long_1, volume: 1 },
	{ key: "c_shake_cup_single_long_2", path: c_shake_cup_single_long_2, volume: 1 },
	{ key: "c_shake_cup_single_long_3", path: c_shake_cup_single_long_3, volume: 1 },
	{ key: "c_shake_cup_single_short_1", path: c_shake_cup_single_short_1, volume: 1 },
	{ key: "c_shake_cup_single_short_2", path: c_shake_cup_single_short_2, volume: 1 },
	{ key: "c_shake_cup_single_short_3", path: c_shake_cup_single_short_3, volume: 1 },
	{ key: "c_swirl_cup_multiple_1", path: c_swirl_cup_multiple_1, volume: 1 },
	{ key: "c_swirl_cup_multiple_2", path: c_swirl_cup_multiple_2, volume: 1 },
	{ key: "c_swirl_cup_multiple_3", path: c_swirl_cup_multiple_3, volume: 1 },
	{ key: "c_swirl_cup_multiple_4", path: c_swirl_cup_multiple_4, volume: 1 },
	{ key: "c_swirl_cup_multiple_long_1", path: c_swirl_cup_multiple_long_1, volume: 1 },
	{ key: "c_swirl_cup_multiple_long_2", path: c_swirl_cup_multiple_long_2, volume: 1 },
	{ key: "c_swirl_cup_multiple_long_3", path: c_swirl_cup_multiple_long_3, volume: 1 },
	{ key: "c_swirl_cup_single_short_1", path: c_swirl_cup_single_short_1, volume: 1 },
	{ key: "c_swirl_cup_single_short_2", path: c_swirl_cup_single_short_2, volume: 1 },
	{ key: "c_swirl_cup_single_short_3", path: c_swirl_cup_single_short_3, volume: 1 },
];


/* Export */

export {
	images,
	spritesheets,
	audios
};