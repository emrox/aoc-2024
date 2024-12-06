const rawInput = await Deno.readTextFile(`${import.meta.dirname}/input`);
const inputLines = rawInput.split("\n");

let position = { x: 0, y: 0 };
for (let y = 0; y < inputLines.length; y++) {
	if (inputLines[y].includes("^")) {
		position = {
			x: inputLines[y].indexOf("^"),
			y
		};
		break;
	}
}

const mapWidth = inputLines[0].length;
const mapHeight = inputLines.length;

const map: Record<number, Record<number, "." | "#" | "^">> = {};
for (let y = 0; y < inputLines.length; y++) {
	const line = inputLines[y].split("");

	for (let x = 0; x < line.length; x++) {
		if (!map[x]) {
			map[x] = {};
		}

		map[x][y] = line[x] as "." | "#" | "^";
	}
}

let outOfArea = false;
let direction: "u" | "l" | "d" | "r" = "u";
const visitedPositions = new Set<string>();

do {
	let switchDirection: boolean = false;
	do {
		switchDirection = false;
		switch(direction) {
			case "u":
				if (map[position.x]?.[position.y - 1] === "#") {
					switchDirection = true;
					direction = "l";
				}
				break;
			case "l":
				if (map[position.x + 1]?.[position.y] === "#") {
					switchDirection = true;
					direction = "d";
				}
				break;
			case "d":
				if (map[position.x]?.[position.y + 1] === "#") {
					switchDirection = true;
					direction = "r";
				}
				break;
			case "r":
				if (map[position.x - 1]?.[position.y] === "#") {
					switchDirection = true;
					direction = "u";
				}
				break;
		}
	} while (switchDirection);

	switch(direction) {
		case "u":
			position.y--;
			break;
		case "l":
			position.x++;
			break;
		case "d":
			position.y++;
			break;
		case "r":
			position.x--;
			break;
	}

	// console.log(position, direction);

	if (
		position.x < 0 ||
		position.y < 0 ||
		position.x >= mapWidth ||
		position.y >= mapHeight
	) {
		outOfArea = true;
	} else {
		visitedPositions.add(`${position.x},${position.y}`);
	}
} while (!outOfArea);

console.log(visitedPositions.size);
