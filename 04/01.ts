const rawInput = await Deno.readTextFile(`${import.meta.dirname}/input`);
const input = rawInput.split("\n");


let xMasCount = 0;

const isWordXmas = (word: string | string[]) => {
	if (Array.isArray(word)) {
		word = word.join("");
	}

	return word === "XMAS" || word === "SAMX";
};

for (let y = 0; y < input.length; y++) {
	for (let x = 0; x < input[0].length; x++) {
		// Horizontal
		if (isWordXmas(input[y].substring(x, x + 4))) {
			xMasCount++;
		}

		// Vertical
		if (isWordXmas([input[y]?.[x], input[y + 1]?.[x], input[y + 2]?.[x], input[y + 3]?.[x]])) {
			xMasCount++;
		}

		// Diagonal (top left to bottom right)
		if (isWordXmas([input[y]?.[x], input[y + 1]?.[x + 1], input[y + 2]?.[x + 2], input[y + 3]?.[x + 3]])) {
			xMasCount++;
		}

		// Diagonal (top right to bottom left)
		if (isWordXmas([input[y]?.[x], input[y + 1]?.[x - 1], input[y + 2]?.[x - 2], input[y + 3]?.[x - 3]])) {
			xMasCount++;
		}
	}
}

console.log(xMasCount);
