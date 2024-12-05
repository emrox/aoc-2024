const rawInput = await Deno.readTextFile(`${import.meta.dirname}/input`);

const [rawOrderingRules, rawUpdatePageNumbers] = rawInput.split("\n\n");

const orderingRules: Record<number, number[]> = {};

rawOrderingRules.split("\n").forEach((line) => {
	const [page, mustBeforeNumber] = line.split("|").map((number) => parseInt(number, 10));

	if (!orderingRules[page]) {
		orderingRules[page] = [];
	}

	orderingRules[page].push(mustBeforeNumber);
});

const updatePageNumbers = rawUpdatePageNumbers.split("\n").map((numbers) => numbers.split(",").map((number) => parseInt(number, 10)));

let middleNumberSum: number = 0;

for (const updatePageNumber of updatePageNumbers) {
	let isCorrect = true;

	for (let col = 0; col < updatePageNumber.length; col++) {
		const number = updatePageNumber[col];

		if (orderingRules[number]) {
			orderingRules[number].forEach((mustBeforeNumber) => {
				const foundIndex = updatePageNumber.indexOf(mustBeforeNumber);
				if (foundIndex >= 0 && foundIndex < col) {
					isCorrect = false;
				}
			});
		}
	}

	if (isCorrect) {
		middleNumberSum += updatePageNumber[Math.floor(updatePageNumber.length / 2)];
	}
}

console.log(middleNumberSum);
