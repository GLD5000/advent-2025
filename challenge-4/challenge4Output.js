// node challenge-4/challenge4Output.js test
// node challenge-4/challenge4Output.js A
// node challenge-4/challenge4Output.js B
// node challenge-4/challenge4Output.js test:B

import { challenge4Input } from "./challenge4Input.js";

// Inline test fixtures for quick manual validation.
const testInput = false
  ? `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@`
  : `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

// Part selector from CLI argument.
const cliArgument = process.argv[2];

function totalAccessibleRolls(inputString, challengePart = "A") {
  const inputArray = inputString.split("\n");
  if (challengePart === "A")
    return getAccessibleRollsInArray(inputArray, challengePart).count;
  let latestCount = -1;
  let workingArray = inputArray;
  let runningTotal = 0;
  do {
    const { count, newArray } = getAccessibleRollsInArray(
      workingArray,
      challengePart,
    );
    latestCount = count;
    workingArray = newArray;
    runningTotal += count;
    cliArgument.indexOf("test") > -1 && console.log("latestCount:", latestCount);
    cliArgument.indexOf("test") > -1 && console.log("newArray:", newArray);

  } while (latestCount !== 0);
  return runningTotal;
}
function getAccessibleRollsInArray(inputArray, challengePart) {
  const radius = 1;
  const maxRollCount = 4;
  return inputArray.reduce(
    // Outer vertical loop
    (acc, curr, yIndex) => {
      // Optional debug logging when running test mode.
      cliArgument.indexOf("test") > -1 && console.log("curr:", curr);
      // Outer horizontal loop
      const { accessibleRolls, newRow } = getAccessibleRollsInRow(
        inputArray,
        yIndex,
        radius,
        maxRollCount,
        challengePart,
      );
      acc.count += accessibleRolls;
      if (challengePart === "B") acc.newArray.push(newRow);
      return acc;
    },
    challengePart === "A" ? { count: 0 } : { count: 0, newArray: [] },
  );
}

function getAccessibleRollsInRow(
  inputArray,
  yIndex,
  radius,
  maxRollCount,
  challengePart,
) {
  let accessibleRolls = 0;
  let newRow = inputArray[yIndex].split('');
  // Outer horizontal loop
  for (let xIndex = 0; xIndex < inputArray[0].length; xIndex += 1) {
    const numberOfAdjacentRolls = findNumberOfRollsWithinNthRadius(
      inputArray,
      xIndex,
      yIndex,
      radius,
      maxRollCount,
    );
    if (numberOfAdjacentRolls > -1 && numberOfAdjacentRolls < maxRollCount) {
      accessibleRolls += 1;
      if (challengePart === "B") newRow[xIndex] = "x";
    }
  }
  return { accessibleRolls, newRow: newRow.join('') };
}

function findNumberOfRollsWithinNthRadius(
  inputArray,
  xIndex,
  yIndex,
  radius = 1,
  maxRollCount = 4,
) {
  let rollCount = 0;
  if (inputArray[yIndex][xIndex] !== "@") return -1;
  // Inner vertical loop
  // cliArgument.indexOf("test") > -1 &&
  //   console.log(
  //     Math.min(inputArray.length, yIndex + radius),
  //     "Math.min(inputArray.length, yIndex + radius)",
  //   );
  for (
    let y = Math.max(0, yIndex - radius); // Min 0
    y < Math.min(inputArray.length, 1 + yIndex + radius); // Max vertical length
    y += 1
  ) {
    if (rollCount >= maxRollCount) break; // Escape loop if maxRollCount is met
    // Inner horizontal loop
    for (
      let x = Math.max(0, xIndex - radius); // Min 0
      x < Math.min(inputArray[0].length, 1 + xIndex + radius);
      x += 1
    ) {
      if (rollCount >= maxRollCount) break; // Escape loop if maxRollCount is met
      const isNotCentralCharacter = x !== xIndex || y !== yIndex;
      if (isNotCentralCharacter && inputArray[y][x] === "@") {
        rollCount += 1;
      }
      // cliArgument.indexOf("test") > -1 &&
      //   console.log("x,y", x, y, "rollCount:", rollCount);
    }
  }
  return rollCount;
}

// CLI entry points for each challenge variant.
if (cliArgument === "test") console.log(totalAccessibleRolls(testInput));
if (cliArgument === "A") console.log(totalAccessibleRolls(challenge4Input));
if (cliArgument === "B")
  console.log(totalAccessibleRolls(challenge4Input, "B"));
if (cliArgument === "test:B") console.log(totalAccessibleRolls(testInput, "B"));
