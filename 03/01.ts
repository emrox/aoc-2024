const rawInput = await Deno.readTextFile(`${import.meta.dirname}/input`);

const allMultiplications = rawInput.matchAll(/mul\([0-9]+,[0-9]+\)/g);
let sum = 0;

allMultiplications.forEach((match) => {
	const [mul] = match;
	const [a, b] = mul.match(/[0-9]+/g)!.map((number) => parseInt(number, 10));
	sum += a * b;
});

console.log(sum);
