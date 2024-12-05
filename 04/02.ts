const rawInput = await Deno.readTextFile(`${import.meta.dirname}/input`);
const input = rawInput.split("\n");

let xMasCount = 0;

const isWordMas = (word: string[]) => {
	const jword = word.join("");

	return jword === "MAS" || jword === "SAM";
};

for (let y = 0; y < input.length; y++) {
	for (let x = 0; x < input[0].length; x++) {
		const xmasCheck = [
			input[y].substring(x, x + 3),
			input[y + 1]?.substring(x, x + 3) ?? "",
			input[y + 2]?.substring(x, x + 3) ?? "",
		];

		if (xmasCheck[1][1] !== "A") {
			continue;
		}

		if(
			isWordMas([xmasCheck[0][0], xmasCheck[1][1], xmasCheck[2][2]]) && // Diagonal (top left to bottom right)
			isWordMas([xmasCheck[0][2], xmasCheck[1][1], xmasCheck[2][0]]) // Diagonal (top right to bottom left)
		) {
			xMasCount++;
		}
	}
}

console.log(xMasCount);
