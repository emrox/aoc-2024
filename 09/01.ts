const rawInput = await Deno.readTextFile(`${import.meta.dirname}/input`);

const parseInput = (rawInput: string): Array<number | '.'> => {
  let blockIsFile = true;
  let input: Array<number | '.'> = [];
  let fileIndex = 0;

  rawInput.split("").map((strnum) => parseInt(strnum, 10)).forEach((num) => {
    input = input.concat(Array(num).fill(blockIsFile ? fileIndex : '.'));

    if (blockIsFile) {
      fileIndex++;
    }

    blockIsFile = !blockIsFile;
  });

  return input;
};

const defrag = (diskMap: Array<number | '.'>): number[] => {
  const defragDisk = [...diskMap]

  while (defragDisk.includes('.')) {
    const firstFreeIndex = defragDisk.indexOf('.');
    const lastIndex = defragDisk.length - 1;

    defragDisk[firstFreeIndex] = defragDisk[lastIndex];
    defragDisk[lastIndex] = '.';

    while (defragDisk[defragDisk.length - 1] === '.') {
      defragDisk.pop();
    }
  }

  return defragDisk as number[];
};

const calculateCheckSum = (diskMap: number[]): number => {
  let checksum = 0;

  diskMap.forEach((block, index) => {
    checksum = checksum + index * block;
  });

  return checksum;
};

const diskMap = parseInput(rawInput);
const defragDisk = defrag(diskMap);

console.log(calculateCheckSum(defragDisk));
