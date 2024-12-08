const rawInput = await Deno.readTextFile(`${import.meta.dirname}/input`);

type point = { x: number, y: number };
const antennas = {} as Record<string, point[]>;

const map = rawInput.split("\n");
const width = map[0].length;
const height = map.length;
const antinodes = new Set<string>();

map.forEach((line, y) => {
  line.split("").forEach((cell, x) => {
    if (cell !== '.') {
      if (!antennas[cell]) {
        antennas[cell] = [];
      }

      antennas[cell].push({ x, y });
    }
  });
});

Object.entries(antennas).forEach(([_antenna, positions]) => {
  positions.forEach((position, positionIndex) => {
    for (let i = 0; i < positions.length; i++) {
      if (i === positionIndex) {
        continue;
      }

      const otherPosition = positions[i];
      const deltaX = otherPosition.x - position.x;
      const deltaY = otherPosition.y - position.y;

      const antidodePoint = {
        x: otherPosition.x + deltaX,
        y: otherPosition.y + deltaY,
      };

      if (antidodePoint.x >= width || antidodePoint.x < 0 || antidodePoint.y >= height || antidodePoint.y < 0) {
        continue;
      }

      const antidodePointString = `${antidodePoint.x},${antidodePoint.y}`;

      antinodes.add(antidodePointString);
    }
  });
});

console.log(antinodes.size);
