const rawInput = await Deno.readTextFile(`${import.meta.dirname}/input`);

const listA = [];
const listB = [];

rawInput.split('\n').forEach((line) => {
    const pair = line.replaceAll(/\s+/g, ' ')
      .split(' ');

    listA.push(pair[0]);
    listB.push(pair[1]);
});


const numberOccurrences = listB.reduce((acc, number) => {
  if (acc[number]) {
    acc[number] += 1;
  } else {
    acc[number] = 1;
  }

  return acc;
}, {});

let similarityScore = 0;

for (const number of listA) {
  if (numberOccurrences[number]) {
    similarityScore += (numberOccurrences[number] * number);
  }
}

console.log(similarityScore);
