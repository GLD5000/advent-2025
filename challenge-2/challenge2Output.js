import { challenge2Input } from "./challenge2nput.js";

const testInput =
  "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";
function identifyInvalidPids(inputString) {
  //Invalid patterns
  // Some sequence of digits repeated twice e.g. 55 or 123123
  const idArray = inputString.split(",");
  return idArray.reduce((acc, curr, index, array) => {
    const [a, b] = curr.split("-");
    const min = Math.min(Number(a), Number(b));
    const max = Math.max(Number(a), Number(b));
    for (let i = min; i < max + 1; i += 1) {
      const isRepetitive = repetitionFinder(i.toString());
      if (isRepetitive) acc.push(i);
    }
    if (index === array.length - 1) {
      acc = acc.reduce(
        (runningTotal, currentValue) => (runningTotal += currentValue),
        0,
      );
    }
    return acc;
  }, []);
}

function repetitionFinder(idString) {
  const stringLength = idString.length;
  if (stringLength % 2 !== 0) return false;
  // length is even
  for (let i = 0; i < stringLength / 2; i += 1) {
    if (idString[i] !== idString[stringLength / 2 + i]) return false;
  }
  return true;
}

console.log(identifyInvalidPids(challenge2Input));
