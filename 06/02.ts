const rawInput = await Deno.readTextFile(`${import.meta.dirname}/input`);
const inputLines = rawInput.split("\n");

let initialPosition = { x: 0, y: 0 };
for (let y = 0; y < inputLines.length; y++) {
	if (inputLines[y].includes("^")) {
		initialPosition = {
			x: inputLines[y].indexOf("^"),
			y
		};
		break;
	}
}

const mapWidth = inputLines[0].length;
const mapHeight = inputLines.length;
const initialObstacles = new Set<string>();

for (let y = 0; y < inputLines.length; y++) {
	const line = inputLines[y].split("");

	for (let x = 0; x < line.length; x++) {
		if (line[x] === "#") {
			initialObstacles.add(`${x},${y}`);
		}
	}
}

const checkIfIsLoop: (workObstacles?: Set<string>) => [boolean, Set<string>] = (workObstacles) => {
	const obstacles = workObstacles ?? new Set<string>([...initialObstacles]);

	const position = { ...initialPosition };
	let outOfArea = false;
	let isLoop = false;
	let direction: "u" | "l" | "d" | "r" = "u";
	const visitedPositions = new Set<string>();

	do {
		let switchDirection: boolean = false;
		do {
			switchDirection = false;
			switch(direction) {
				case "u":
					if (obstacles.has(`${position.x},${position.y - 1}`)) {
						switchDirection = true;
						direction = "l";
					}
					break;
				case "l":
					if (obstacles.has(`${position.x + 1},${position.y}`)) {
						switchDirection = true;
						direction = "d";
					}
					break;
				case "d":
					if (obstacles.has(`${position.x},${position.y + 1}`)) {
						switchDirection = true;
						direction = "r";
					}
					break;
				case "r":
					if (obstacles.has(`${position.x - 1},${position.y}`)) {
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

		if (visitedPositions.has(`${position.x},${position.y},${direction}`)) {
			isLoop = true;
		}

		if (
			position.x < 0 ||
			position.y < 0 ||
			position.x >= mapWidth ||
			position.y >= mapHeight
		) {
			outOfArea = true;
		} else {
			visitedPositions.add(`${position.x},${position.y},${direction}`);
		}
	} while (!outOfArea && !isLoop);

	return [isLoop, visitedPositions] as [boolean, Set<string>];
}


const [_, visitedPositions] = checkIfIsLoop();

let loopCount = 0;
const checkObstacles = new Set<string>([...initialObstacles]);
for (const visitedPosition of visitedPositions) {
	const checkObstacle = visitedPosition.split(",").slice(0, 2).join(",");

	if (!checkObstacles.has(checkObstacle)) {
		checkObstacles.add(checkObstacle);
		const [isLoop, _] = checkIfIsLoop(new Set([...initialObstacles, checkObstacle]));
		if (isLoop) {
			loopCount++;
		}
	}
}

console.log(loopCount);
