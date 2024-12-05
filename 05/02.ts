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
	let isCorrect: boolean = true;

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

	if (!isCorrect) {
		const currentLine = [...updatePageNumber];

		do {
			isCorrect = true;

			for (let col = 0; col < currentLine.length; col++) {
				const number = currentLine[col];
		
				if (orderingRules[number]) {
					orderingRules[number].forEach((mustBeforeNumber) => {
						const foundIndex = currentLine.indexOf(mustBeforeNumber);
						if (foundIndex >= 0 && foundIndex < col) {
							isCorrect = false;

							currentLine.splice(foundIndex, 1);
							currentLine.splice(col, 0, mustBeforeNumber);
						}
					});
				}
			}
		} while (!isCorrect);

		middleNumberSum += currentLine[Math.floor(currentLine.length / 2)];
	}
}

console.log(middleNumberSum);
