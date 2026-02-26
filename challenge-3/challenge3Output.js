//node challenge-3/challenge3Output.js test
//node challenge-3/challenge3Output.js A
//node challenge-3/challenge3Output.js B

import { challenge3Input } from "./challenge3Input.js";

const testInput = `987654321111111
811111111111119
234234234234278
818181911112111`;
const cliArgument = process.argv[2];

function totalJoltage(powerBankString, challengePart = "A") {
  const powerBankArray = powerBankString.split("\n");
  return powerBankArray.reduce(
    (acc, curr) => {
      cliArgument.indexOf("test") > -1 && console.log("curr:", curr);
      const max =
        challengePart === "A"
          ? findMaxTwoDigitNumber(curr)
          : findMaxNDigitNumber(curr);
      cliArgument.indexOf("test") > -1 && console.log("max:", max);
      acc.valueArray.push(max);
      acc.runningTotal += max;
      return acc;
    },
    { valueArray: [], runningTotal: 0 },
  ).runningTotal;
}

function findMaxTwoDigitNumber(inputNumberString) {
  // Find left value
  let leftMax = 1;
  let leftMaxIndex = 0;
  let leftIndex = 0;
  for (leftIndex; leftIndex < inputNumberString.length - 1; leftIndex += 1) {
    const currentDigit = Number(inputNumberString[leftIndex]);
    if (currentDigit > leftMax) {
      leftMax = currentDigit;
      leftMaxIndex = leftIndex;
    }
  }
  // Find right value
  let rightMax = 1;
  let rightMaxIndex,
    rightIndex = leftMaxIndex + 1;
  for (rightIndex; rightIndex < inputNumberString.length; rightIndex += 1) {
    const currentDigit = Number(inputNumberString[rightIndex]);

    if (currentDigit > rightMax) {
      rightMax = currentDigit;
      rightMaxIndex = rightIndex;
    }
  }
  return Number(`${leftMax}${rightMax}`);
}

function findMaxNDigitNumber(inputNumberString, n = 12) {
  let digits = "";
  let leftPointer = 0;
  for (let digitIndex = 0; digitIndex < n; digitIndex += 1) {
    let max = 1;
    let index = digitIndex === 0 ? 0 : leftPointer + 1;
    const limitIndex = inputNumberString.length - (n - (1 + digitIndex));
    for (index; index < limitIndex; index += 1) {
      const currentDigit = Number(inputNumberString[index]);
      if (currentDigit > max) {
        max = currentDigit;
        leftPointer = index;
      }
    }
    digits += max;
  }
  return Number(digits);
}

if (cliArgument === "test") console.log(totalJoltage(testInput));
if (cliArgument === "A") console.log(totalJoltage(challenge3Input));
if (cliArgument === "B") console.log(totalJoltage(challenge3Input, "B"));
if (cliArgument === "test:B") console.log(totalJoltage(testInput, "B"));
