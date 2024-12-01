const rawInput = await Deno.readTextFile(`${import.meta.dirname}/input`);

const listA = [];
const listB = [];

rawInput.split('\n').forEach((line) => {
    const pair = line.replaceAll(/\s+/g, ' ')
      .split(' ')
      .map((n) => parseInt(n, 10))

    listA.push(pair[0]);
    listB.push(pair[1]);
});

listA.sort();
listB.sort();

const distances = listA.map((n, i) => Math.abs(n - listB[i]));
const sum = distances.reduce((acc, n) => acc + n, 0);

console.log(sum);

