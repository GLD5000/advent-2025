//node challenge-3/challenge3Output.js test
//node challenge-3/challenge3Output.js A
//node challenge-3/challenge3Output.js B

import { challenge3Input } from "./challenge3Input.js";

// Inline sample data for quick local verification.
const testInput = `987654321111111
811111111111119
234234234234278
818181911112111`;

// Expected values: "test", "A", "B", "test:B"
const cliArgument = process.argv[2];

/**
 * Sums the maximum value extracted from each line in the power bank input.
 * Part A uses a 2-digit extraction strategy, Part B uses an N-digit strategy.
 */
function totalJoltage(powerBankString, challengePart = "A") {
  const powerBankArray = powerBankString.split("\n");
  return powerBankArray.reduce(
    (acc, curr) => {
      // Optional debug logging when running test mode.
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

/**
 * Builds the highest possible 2-digit number while preserving original order.
 * The first digit is chosen from the left side, then the second digit is chosen
 * from the remaining suffix.
 */
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

/**
 * Builds the highest possible N-digit number while preserving digit order.
 * Uses a moving left pointer so each chosen digit comes after the previous one.
 */
function findMaxNDigitNumber(inputNumberString, n = 12) {
  let digits = "";
  let leftPointer = 0;
  for (let digitIndex = 0; digitIndex < n; digitIndex += 1) {
    let max = 1;

    // Search starts at the next position after the previously selected digit.
    let index = digitIndex === 0 ? 0 : leftPointer + 1;

    // Keep enough remaining characters to still fill the remaining output digits.
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

// CLI entry points for each challenge variant.
if (cliArgument === "test") console.log(totalJoltage(testInput));
if (cliArgument === "A") console.log(totalJoltage(challenge3Input));
if (cliArgument === "B") console.log(totalJoltage(challenge3Input, "B"));
if (cliArgument === "test:B") console.log(totalJoltage(testInput, "B"));
