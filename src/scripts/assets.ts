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
import enemy from "../assets/images/enemy.png";
import enemy2 from "../assets/images/enemy2.png";
import d6 from "../assets/images/d6.png";
import d6_roll from "../assets/images/d6_roll.png";

const images: Asset[] = [
	{ key: "background",	path: background },
	{ key: "concept",		path: concept },
	{ key: "enemy",			path: enemy },
	{ key: "enemy2",		path: enemy2 },
	{ key: "d6",			path: d6 },
	{ key: "d6_roll",		path: d6_roll },
];


/* Spritesheets */

// import player from "../assets/images/characters/player.png";

import explosion from "../assets/images/explosion.png";

const spritesheets: SpriteSheet[] = [
	// { key: "player",	path: player,			width: 256,	height: 256 },

	{ key: "explosion",	path: explosion,		width: 200,	height: 282 },
];


/* Sounds */

// import a_boom from "../assets/sounds/memes/a_boom.ogg";
// import c_bruh from "../assets/sounds/memes/c_bruh.ogg";
// import d_bong from "../assets/sounds/memes/d_bong.ogg";
// import e_skull from "../assets/sounds/memes/e_skull.ogg";
// import f_clap from "../assets/sounds/memes/f_clap.ogg";
// import g_dog from "../assets/sounds/memes/g_dog.ogg";
// import h_alien from "../assets/sounds/memes/h_alien.ogg";
// import i_bell from "../assets/sounds/memes/i_bell.ogg";
// import j_anger from "../assets/sounds/memes/j_anger.ogg";
// import k_steam from "../assets/sounds/memes/k_steam.ogg";
// import l_stop from "../assets/sounds/memes/l_stop.ogg";
// import m_phone from "../assets/sounds/memes/m_phone.ogg";
// import n_sunrise from "../assets/sounds/memes/n_sunrise.ogg";
// import o_whatsapp from "../assets/sounds/memes/o_whatsapp.ogg";
// import p_bonk from "../assets/sounds/memes/p_bonk.ogg";
// import q_alarm from "../assets/sounds/memes/q_alarm.ogg";
// import r_exclamation from "../assets/sounds/memes/r_exclamation.ogg";
// import s_crab from "../assets/sounds/memes/s_crab.ogg";
// import t_e from "../assets/sounds/memes/t_e.ogg";
// import u_pizza from "../assets/sounds/memes/u_pizza.ogg";
// import v_swan from "../assets/sounds/memes/v_swan.ogg";
// import w_explosion from "../assets/sounds/memes/w_explosion.ogg";
// import x_americano from "../assets/sounds/memes/x_americano.ogg";
// import a_smw_coin from "../assets/sounds/memes/a_smw_coin.ogg";
// import b_smw_1up from "../assets/sounds/memes/b_smw_1up.ogg";
// import c_smw_spinjump from "../assets/sounds/memes/c_smw_spinjump.ogg";
// import d_smw_stomp2 from "../assets/sounds/memes/d_smw_stomp2.ogg";
// import e_smw_kick from "../assets/sounds/memes/e_smw_kick.ogg";
// import f_smw_stomp from "../assets/sounds/memes/f_smw_stomp.ogg";
// import g_smw_yoshi from "../assets/sounds/memes/g_smw_yoshi.ogg";
// import h_mariopaint_flower from "../assets/sounds/memes/h_mariopaint_flower.ogg";
// import i_mariopaint_car from "../assets/sounds/memes/i_mariopaint_car.ogg";
// import j_mariopaint_dog from "../assets/sounds/memes/j_mariopaint_dog.ogg";
// import k_mariopaint_cat from "../assets/sounds/memes/k_mariopaint_cat.ogg";
// import l_mariopaint_baby from "../assets/sounds/memes/l_mariopaint_baby.ogg";
// import a_shaker from "../assets/sounds/memes/a_shaker.ogg";
// import b_drums from "../assets/sounds/memes/b_drums.ogg";
// import c_hammer from "../assets/sounds/memes/c_hammer.ogg";
// import d_sidestick from "../assets/sounds/memes/d_sidestick.ogg";
// import e_ride2 from "../assets/sounds/memes/e_ride2.ogg";
// import f_buttonpop from "../assets/sounds/memes/f_buttonpop.ogg";
// import g_otto_on from "../assets/sounds/memes/g_otto_on.ogg";
// import h_otto_off from "../assets/sounds/memes/h_otto_off.ogg";
// import i_otto_happy from "../assets/sounds/memes/i_otto_happy.ogg";
// import j_otto_stress from "../assets/sounds/memes/j_otto_stress.ogg";
// import k_skipshot from "../assets/sounds/memes/k_skipshot.ogg";
// import l_samurai from "../assets/sounds/memes/l_samurai.ogg";
// import m_tab_sounds from "../assets/sounds/memes/m_tab_sounds.ogg";
// import n_tab_rows from "../assets/sounds/memes/n_tab_rows.ogg";
// import o_tab_actions from "../assets/sounds/memes/o_tab_actions.ogg";
// import p_tab_rooms from "../assets/sounds/memes/p_tab_rooms.ogg";
// import q_tonk from "../assets/sounds/memes/q_tonk.ogg";
// import r_adofaikick from "../assets/sounds/memes/r_adofaikick.ogg";
// import s_midspin from "../assets/sounds/memes/s_midspin.ogg";
// import t_cowbell from "../assets/sounds/memes/t_cowbell.ogg";
// import u_karateman_throw from "../assets/sounds/memes/u_karateman_throw.ogg";
// import v_karateman_hit from "../assets/sounds/memes/v_karateman_hit.ogg";
// import w_ook from "../assets/sounds/memes/w_ook.ogg";
// import x_star from "../assets/sounds/memes/x_star.ogg";
// import yb_fnf_left from "../assets/sounds/memes/yb_fnf_left.ogg";
// import yc_fnf_down from "../assets/sounds/memes/yc_fnf_down.ogg";
// import yd_fnf_up from "../assets/sounds/memes/yd_fnf_up.ogg";
// import ye_fnf_right from "../assets/sounds/memes/ye_fnf_right.ogg";
// import yf_fnf_death from "../assets/sounds/memes/yf_fnf_death.ogg";
// import y_gun from "../assets/sounds/memes/y_gun.ogg";
// import z_gnome from "../assets/sounds/memes/z_gnome.ogg";
// import za_disc from "../assets/sounds/memes/za_disc.ogg";
// import zb_party from "../assets/sounds/memes/zb_party.ogg";
// import zc_violin from "../assets/sounds/memes/zc_violin.ogg";
// import zd_slip from "../assets/sounds/memes/zd_slip.ogg";
// import ze_hehehehaw from "../assets/sounds/memes/ze_hehehehaw.ogg";
// import a_necoarc from "../assets/sounds/memes/a_necoarc.ogg";
// import b_megalovania from "../assets/sounds/memes/b_megalovania.ogg";
// import c_undertale_encounter from "../assets/sounds/memes/c_undertale_encounter.ogg";
// import d_undertale_hit from "../assets/sounds/memes/d_undertale_hit.ogg";
// import e_undertale_crack from "../assets/sounds/memes/e_undertale_crack.ogg";
// import ea_gaster from "../assets/sounds/memes/ea_gaster.ogg";
// import eb_yahoo from "../assets/sounds/memes/eb_yahoo.ogg";
// import f_bup from "../assets/sounds/memes/f_bup.ogg";
// import ff_thwomp from "../assets/sounds/memes/ff_thwomp.ogg";
// import g_amongus from "../assets/sounds/memes/g_amongus.ogg";
// import h_amongdrip from "../assets/sounds/memes/h_amongdrip.ogg";
// import i_amogus from "../assets/sounds/memes/i_amogus.ogg";
// import j_gdcrash from "../assets/sounds/memes/j_gdcrash.ogg";
// import k_gdcrash_orbs from "../assets/sounds/memes/k_gdcrash_orbs.ogg";
// import l_gd_coin from "../assets/sounds/memes/l_gd_coin.ogg";
// import m_gd_orbs from "../assets/sounds/memes/m_gd_orbs.ogg";
// import n_gd_diamonds from "../assets/sounds/memes/n_gd_diamonds.ogg";
// import o_bwomp from "../assets/sounds/memes/o_bwomp.ogg";
// import q_isaac_hurt from "../assets/sounds/memes/q_isaac_hurt.ogg";
// import r_isaac_dead from "../assets/sounds/memes/r_isaac_dead.ogg";
// import ra_isaac_mantle from "../assets/sounds/memes/ra_isaac_mantle.ogg";
// import s_oof from "../assets/sounds/memes/s_oof.ogg";
// import sa_subaluwa from "../assets/sounds/memes/sa_subaluwa.ogg";
// import t_yoda from "../assets/sounds/memes/t_yoda.ogg";
// import a_noteblock_harp from "../assets/sounds/memes/a_noteblock_harp.ogg";
// import b_noteblock_bass from "../assets/sounds/memes/b_noteblock_bass.ogg";
// import c_noteblock_snare from "../assets/sounds/memes/c_noteblock_snare.ogg";
// import d_noteblock_click from "../assets/sounds/memes/d_noteblock_click.ogg";
// import e_noteblock_bell from "../assets/sounds/memes/e_noteblock_bell.ogg";
// import f_noteblock_chime from "../assets/sounds/memes/f_noteblock_chime.ogg";
// import g_noteblock_banjo from "../assets/sounds/memes/g_noteblock_banjo.ogg";
// import h_noteblock_pling from "../assets/sounds/memes/h_noteblock_pling.ogg";
// import i_noteblock_xylophone from "../assets/sounds/memes/i_noteblock_xylophone.ogg";
// import j_noteblock_bit from "../assets/sounds/memes/j_noteblock_bit.ogg";
// import k_minecraft_explosion from "../assets/sounds/memes/k_minecraft_explosion.ogg";
// import l_minecraft_bell from "../assets/sounds/memes/l_minecraft_bell.ogg";

// import death from "../assets/sounds/Death.ogg";

// import music_day from "../assets/music/Game_Day.ogg";

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