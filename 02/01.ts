const rawInput = await Deno.readTextFile(`${import.meta.dirname}/input`);

const input = rawInput.split("\n")
	.map((line) => line.split(/\s+/).map((number) => parseInt(number, 10)));

const maxDistance = 3;
let safeLevelCount = 0;

for (const line of input) {
	let isSafe = true;
	const mode = line[0] < line[1] ? "incr" : "decr";

	for (let level = 1; level < line.length; level++) {
		const last = line[level - 1];
		const current = line[level];

		if (mode === "decr") {
			if (current >= last) {
				isSafe = false;
				break;
			};
		}

		if (mode === "incr" && current <= last) {
			isSafe = false;
			break;
		}

		if (Math.abs(current - last) > maxDistance) {
			isSafe = false;
			break;
		}
	}

	if (isSafe) {
		safeLevelCount++;
	}
}

console.log("safeLevelCount", safeLevelCount);