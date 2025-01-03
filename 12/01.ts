const rawInput = await Deno.readTextFile(`${import.meta.dirname}/input`);
const map: string[][] = rawInput.split("\n").map((row) => row.split(""));
const plots: string[][] = [];

const mapPlot = (plot: string[],  x: number, y: number): void => {
  const plotIdentifier = map[y][x];
  plot.push(`${x}:${y}`);
  map[y][x] = '.';

  if (map[y - 1] && map[y - 1][x] === plotIdentifier) {
    mapPlot(plot, x, y - 1);
  }

  if (map[y + 1] && map[y + 1][x] === plotIdentifier) {
    mapPlot(plot, x, y + 1);
  }

  if (map[y][x - 1] === plotIdentifier) {
    mapPlot(plot, x - 1, y);
  }

  if (map[y][x + 1] === plotIdentifier) {
    mapPlot(plot, x + 1, y);
  }
}

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    const cell = map[y][x];

    if (cell === '.') {
      continue;
    }

    const plot: string[] = [];
    mapPlot(plot, x, y);
    plots.push(plot);
  }
}

let price = 0;

for (const plot of plots) {
  const area = plot.length;
  let perimeter = 0;

  for (const cell of plot) {
    const [x, y] = cell.split(":").map((strNum) => parseInt(strNum, 10));
    let cellPerimeter = 0;

    if (!plot.includes(`${x}:${y - 1}`)) {
      cellPerimeter++;
    }

    if (!plot.includes(`${x}:${y + 1}`)) {
      cellPerimeter++;
    }

    if (!plot.includes(`${x - 1}:${y}`)) {
      cellPerimeter++;
    }

    if (!plot.includes(`${x + 1}:${y}`)) {
      cellPerimeter++;
    }

    perimeter += cellPerimeter;
  }

  price += area * perimeter;
}

console.log(price);
