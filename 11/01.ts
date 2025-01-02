const rawInput = await Deno.readTextFile(`${import.meta.dirname}/input`);
let stones = rawInput.split(" ").map((strNum) => parseInt(strNum, 10));

const blinks = 25;

for (let blink = 0; blink < blinks; blink++) {
  const newStones: number[] = [];

  for (const stone of stones) {
    if (stone === 0) {
      newStones.push(1);
      continue;
    }

    const stoneNumStr = stone.toString();
    if (stone > 0 && stoneNumStr.length % 2 === 0) {
      newStones.push(parseInt(stoneNumStr.slice(0, stoneNumStr.length / 2), 10));
      newStones.push(parseInt(stoneNumStr.slice(-(stoneNumStr.length / 2)), 10));
      continue;
    }

    newStones.push(stone * 2024);
  }

  stones = newStones;
}

console.log(stones.length);
