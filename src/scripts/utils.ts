// Add path to beginning of each element's path
export function prependPath(path, array) {
	for (let obj of array) {
		obj.path = path + obj.path;
	}
	return array;
}

// Check if variable is Object
export function isPlainObject(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
}

// Add slight randomness to avoid zero values
export function jiggle() {
	return (Math.random() - 0.5) * 1e-2;
}


// General random-ish uuid
export function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

// Return interpolated color between two color1 and color2 at value (0-1)
export function interpolateColor(color1: number, color2: number, value: number): number {
	return Phaser.Display.Color.ObjectToColor(
		Phaser.Display.Color.Interpolate.ColorWithColor(
			Phaser.Display.Color.ValueToColor(color1),
			Phaser.Display.Color.ValueToColor(color2),
		255, value * 255)
	).color;
}

// Convert hsv values to color (hex)
export function HSVToRGB(h: number, s: number, v: number): number {
	let union = Phaser.Display.Color.HSVToRGB(h, s, v);
	return (<Phaser.Display.Color>union).color;
}

// Convert hex number color to hex string color
export function colorToString(color: number): string {
	let c = Phaser.Display.Color.ValueToColor(color);
	return Phaser.Display.Color.RGBToString(c.red, c.green, c.blue);
}

// Convert hex string color to hex number color
export function colorToNumber(color: string): number {
	return Phaser.Display.Color.HexStringToColor(color).color;
}