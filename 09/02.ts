const rawInput = await Deno.readTextFile(`${import.meta.dirname}/input`);

type TBlock = { type: 'file' | 'space', length: number, fileIndex: number | null };
type TDisk = Array<number | '.'>;

const parseInput = (rawInput: string): TBlock[] => {
  let blockIsFile = true;
  let fileIndex = 0;

  return rawInput.split("").map((strnum) => parseInt(strnum, 10)).map((num) => {
    const block: TBlock = {
      type: blockIsFile ? 'file' : 'space',
      length: num,
      fileIndex: blockIsFile ? fileIndex : null,
    }

    if (blockIsFile) {
      fileIndex++;
    }

    blockIsFile = !blockIsFile;

    return block;
  });
};

const defragMapping = (diskMap: TBlock[]): void => {
  const countBlocks = diskMap.length;
  for (let blockIndex = countBlocks - 1; blockIndex >= 0; blockIndex--) {
    if (!diskMap[blockIndex] || diskMap[blockIndex].type === 'space') {
      continue;
    }

    let moveToSpace = diskMap.findIndex((block) => (
      block.type === 'space' &&
      block.length >= diskMap[blockIndex].length
    ));

    if (moveToSpace >= 0 && moveToSpace >= blockIndex) {
      moveToSpace = -1;
    }

    if (moveToSpace >= 0) {
      const cloneBlock = { ...diskMap[blockIndex] };

      diskMap[blockIndex].type = 'space';
      diskMap[blockIndex].fileIndex = null;

      diskMap[moveToSpace].length -= cloneBlock.length;
      diskMap.splice(moveToSpace, 0, cloneBlock);
    }
  }
};

const defrag = (diskMap: TBlock[]): TDisk => {
  let output = [] as TDisk;

  diskMap.forEach((block) => {
    output = output.concat(Array(block.length).fill(block.fileIndex !== null ? block.fileIndex : '.'));
  });

  return output;
};

const calculateCheckSum = (diskMap: TDisk): number => {
  let checksum = 0;

  diskMap.forEach((block, index) => {
    if (block !== '.') {
      checksum = checksum + index * block;
    }
  });

  return checksum;
};

const diskMap = parseInput(rawInput);
defragMapping(diskMap);
const defraggedDisk = defrag(diskMap);

console.log(calculateCheckSum(defraggedDisk));
