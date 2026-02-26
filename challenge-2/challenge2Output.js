import { challenge2Input } from "./challenge2nput.js";
// node challenge-2/challenge2Output.js
const testInput =
  "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";
const testInputShort = "11-22";

function identifyInvalidPids(inputString) {
  //Invalid patterns
  // Some sequence of digits repeated twice e.g. 55 or 123123
  const idArray = inputString.split(",");
  return idArray.reduce((acc, curr, index, array) => {
    const [a, b] = curr.split("-");
    const min = Math.min(Number(a), Number(b));
    const max = Math.max(Number(a), Number(b));
    for (let i = min; i < max + 1; i += 1) {
      const isRepetitive = repetitionFinderV4(i.toString());
      if (isRepetitive) acc.push(i);
    }
    if (index === array.length - 1) {
      console.log("acc", acc);
      acc = Array.from(new Set(acc)).reduce(
        (runningTotal, currentValue) => (runningTotal += Number(currentValue)),
        0,
      );
    }
    return acc;
  }, []);
}

function repetitionFinderV1(idString) {
  const stringLength = idString.length;
  if (stringLength % 2 !== 0) return false;
  // length is even
  for (let i = 0; i < stringLength / 2; i += 1) {
    if (idString[i] !== idString[stringLength / 2 + i]) return false;
  }
  return true;
}

// function repetitionFinderV2(idString) {
//   const stringLength = idString.length;

//   // Walk through to find match to string position [0] up to half way through
//   for (
//     let segmentLength = 1;
//     segmentLength < stringLength / 2 + 1;
//     segmentLength += 1
//   ) {
//     const isRemainderZero = stringLength % segmentLength === 0;
//     if (segmentLength === 1 || isRemainderZero) {
//       const firstNumber = Number(idString.slice(0, segmentLength));
//       console.log("firstNumber", firstNumber);
//       const repetitions =
//         segmentLength === 1 ? stringLength : stringLength / segmentLength;
//       console.log("repetitions", repetitions);

//       let matches = 1;
//       for (let repetition = 2; repetition < repetitions + 1; repetition += 1) {
//         const currentStartIndex = repetition * segmentLength - 1;
//         const currentEndIndex = currentStartIndex + segmentLength;
//         console.log(
//           "currentStartIndex",
//           currentStartIndex,
//           "currentEndIndex",
//           currentEndIndex,
//         );
//         const currentNumber = Number(
//           idString.slice(currentStartIndex, currentEndIndex),
//         );
//         if (firstNumber === currentNumber) matches += 1;
//       }
//       if (matches === repetitions) return true;
//     }
//   }

//   return false;
// }

function repetitionFinderV3(idString) {
  const stringLength = idString.length;

  for (
    let segmentLength = 1;
    segmentLength < stringLength;
    segmentLength += 1
  ) {
    const isRemainderZero = stringLength % segmentLength === 0;
    if (segmentLength == 1 || isRemainderZero) {
      const repetitions =
        segmentLength === 1 ? stringLength : stringLength / segmentLength;
      const substring = idString.slice(0, segmentLength);
      const testNumber = Number(substring.repeat(repetitions));
      if (testNumber === Number(idString)) return true;
    }
  }

  return false;
}

function repetitionFinderV4(idString) {
  const stringLength = idString.length;

  for (
    let segmentLength = 1;
    segmentLength < stringLength;
    segmentLength += 1
  ) {
    const isRemainderZero = stringLength % segmentLength === 0;
    if (segmentLength === 1 || isRemainderZero) {
      const repetitions =
        segmentLength === 1 ? stringLength : stringLength / segmentLength;
      const substring = idString.slice(0, segmentLength);
      const repetionRegex = new RegExp(`^(${substring}){${repetitions}}$`);
      const isMatch = !!repetionRegex.exec(idString);
      if (isMatch) return true;
    }
  }

  return false;
}

console.log(identifyInvalidPids(challenge2Input));
