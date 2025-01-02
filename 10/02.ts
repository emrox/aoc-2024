const rawInput = await Deno.readTextFile(`${import.meta.dirname}/input`);
const input = rawInput.split("\n");

type TPos = { x: number, y: number };

const trailHeads: Array<TPos & { tops: TPos[] }> = [];
const map: Array<number[]> = [];

for (let x = 0; x < input[0].length; x++) {
  map[x] = [];
  for (let y = 0; y < input.length; y++) {
    map[x][y] = parseInt(input[y][x], 10);

    if (map[x][y] === 0) {
      trailHeads.push({ x, y, tops: [] });
    }
  }
}

const ways: Array<TPos[]> = [];

const nextStep = (way: Array<TPos>) => {
  const pos = way.at(-1)!;
  const currentHeight = map[pos.x][pos.y];
  const nextHeight = currentHeight + 1;

  if (currentHeight === 9) {
    ways.push(way);
    return;
  }

  if (map[pos.x][pos.y - 1] === nextHeight) {
    nextStep(way.concat({ x: pos.x, y: pos.y - 1 }));
  }

  if (map[pos.x][pos.y + 1] === nextHeight) {
    nextStep(way.concat({ x: pos.x, y: pos.y + 1 }));
  }

  if (map[pos.x - 1]?.[pos.y] === nextHeight) {
    nextStep(way.concat({ x: pos.x - 1, y: pos.y }));
  }

  if (map[pos.x + 1]?.[pos.y] === nextHeight) {
    nextStep(way.concat({ x: pos.x + 1, y: pos.y }));
  }
};

trailHeads.forEach((trailHead) => {
  nextStep([{ x: trailHead.x, y: trailHead.y }]);
});

console.log(ways.length);
