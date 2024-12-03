const rawInput = await Deno.readTextFile(`${import.meta.dirname}/input`);

const allMultiplications = rawInput.matchAll(/(?:mul\([0-9]+,[0-9]+\)|do\(\)|don't\(\))/g);
let sum = 0;
let enabled: boolean = true;

allMultiplications.forEach((match) => { 
	const [instruction] = match;

	if (instruction === "do()") {
		enabled = true;
	} else if (instruction === "don't()") {
		enabled = false;
	} else {
		if (enabled) {
			const [a, b] = instruction.match(/[0-9]+/g)!.map((number) => parseInt(number, 10));
			sum += a * b;
		}
	}
});

console.log(sum);
