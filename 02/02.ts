const rawInput = await Deno.readTextFile(`${import.meta.dirname}/input`);

const input = rawInput.split("\n").map((line) => line.split(/\s+/).map((number) => parseInt(number, 10)));

const maxDistance = 3;

const isLineSafe = (line: number[], deepCheck: boolean = true): boolean => {
	let isSafe = true;

	for (let level = 1; level < line.length; level++) {
		const last = line[level - 1];
		const current = line[level];

		if (current <= last) {
			isSafe = false;
			break;
		}

		if (Math.abs(current - last) > maxDistance) {
			isSafe = false;
			break;
		}
	}

	if (isSafe) {
		return true;
	}

	if (deepCheck) {
		for (let level = 0; level < line.length; level++) {
			const removeLevelCheckLine = [...line];
			removeLevelCheckLine.splice(level, 1);

			if (isLineSafe(removeLevelCheckLine, false)) {
				return true;
			}
		}
	}

	return false;
}

let safeLinesCount = 0;
for (const line of input) {
	if (isLineSafe(line) || isLineSafe(line.reverse())) {
		safeLinesCount++;
	}
}

console.log("safeLinesCount", safeLinesCount);
