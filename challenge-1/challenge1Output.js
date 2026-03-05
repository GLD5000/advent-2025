import { challenge1input } from "./challenge1Input.js";
//node challenge-1/challenge1Output.js 1
//node challenge-1/challenge1Output.js 2

// Challenge part selector from CLI.
const part = process.argv[2];
console.log("part:", part);

/**
 * Applies all dial movement instructions and accumulates how many times
 * the dial crosses or lands on zero (depending on part rules).
 */
function getPassnumber(instructionArray) {
  let passnumber = 0;
  let dialPosition = 50;

  // Process each movement instruction (e.g. "R48", "L30").
  instructionArray.forEach((instruction) => {
    // Convert R/L notation into signed integer movement.
    const numberToAdd = Number(instruction.replace("R", "").replace("L", "-"));

    // Part 1 and part 2 use different click-counting rules.
    const [newDialPosition, zeroClicks] =
      part == 1
        ? findCurrentPositionV1(dialPosition, numberToAdd)
        : findCurrentPositionV2(dialPosition, numberToAdd);
    dialPosition = newDialPosition;
    passnumber += zeroClicks;
  });
  return passnumber;
}

/**
 * Part 1: wrap dial position to range [-99, 99] equivalent movement,
 * then count a click only when final position is exactly zero.
 */
function findCurrentPositionV1(dialPosition, numberToAdd) {
  const remainder = numberToAdd % 100;
  let zeroClicks = 0;
  const newPositionRaw = dialPosition + remainder;
  const isBelowZero = newPositionRaw < 0;
  const isBelowOne = newPositionRaw < 1;
  const isAboveNinetyNine = newPositionRaw > 99;
  // console.log(dialPosition, numberToAdd, zeroClicks);
  const newPositionLimited = isAboveNinetyNine
    ? newPositionRaw - 100
    : isBelowZero
      ? newPositionRaw + 100
      : newPositionRaw;

  if (newPositionLimited === 0) zeroClicks += 1;
  return [newPositionLimited, zeroClicks];
}

/**
 * Part 2: counts full rotations first, then applies wrapped remainder move,
 * and also counts boundary crossing when movement wraps across dial limits.
 */
function findCurrentPositionV2(dialPosition, numberToAdd) {
  const remainder = numberToAdd % 100;

  // Full 100-step rotations contribute direct zero clicks.
  let zeroClicks = Math.floor(Math.abs(numberToAdd - remainder) / 100);

  const newPositionRaw = dialPosition + remainder;
  const isBelowZero = newPositionRaw < 0;
  const isBelowOne = newPositionRaw < 1;
  const isAboveNinetyNine = newPositionRaw > 99;

  // Additional click when wrapped movement crosses the 0 boundary.
  if ((isBelowOne || isAboveNinetyNine) && dialPosition !== 0) zeroClicks += 1;
  // console.log(dialPosition, numberToAdd, zeroClicks);
  const newPositionLimited = isAboveNinetyNine
    ? newPositionRaw - 100
    : isBelowZero
      ? newPositionRaw + 100
      : newPositionRaw;

  return [newPositionLimited, zeroClicks];
}

// Inline test fixture for quick manual validation.
const testString = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

// Run the challenge input and print total pass number.
console.log(getPassnumber(challenge1input.split("\n"))); //6770
