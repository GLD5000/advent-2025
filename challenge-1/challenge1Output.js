import { challenge1input } from "./challenge1Input.js";
//node challenge-1/challenge1Output.js 1
//node challenge-1/challenge1Output.js 2
const part = process.argv[2];
console.log("part:", part);

function getPassnumber(instructionArray) {
  let passnumber = 0;
  let dialPosition = 50;
  instructionArray.forEach((instruction) => {
    const numberToAdd = Number(instruction.replace("R", "").replace("L", "-"));
    const [newDialPosition, zeroClicks] = part == 1
          ?findCurrentPositionV1(
      dialPosition,
      numberToAdd,
    ): findCurrentPositionV2(
      dialPosition,
      numberToAdd,
    );
    dialPosition = newDialPosition;
    passnumber += zeroClicks;
  });
  return passnumber;
}
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

function findCurrentPositionV2(dialPosition, numberToAdd) {
  const remainder = numberToAdd % 100;
  let zeroClicks = Math.floor(Math.abs(numberToAdd - remainder) / 100);
  const newPositionRaw = dialPosition + remainder;
  const isBelowZero = newPositionRaw < 0;
  const isBelowOne = newPositionRaw < 1;
  const isAboveNinetyNine = newPositionRaw > 99;
  if ((isBelowOne || isAboveNinetyNine) && dialPosition !== 0) zeroClicks += 1;
  // console.log(dialPosition, numberToAdd, zeroClicks);
  const newPositionLimited = isAboveNinetyNine
    ? newPositionRaw - 100
    : isBelowZero
      ? newPositionRaw + 100
      : newPositionRaw;

  return [newPositionLimited, zeroClicks];
}

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
console.log(getPassnumber(challenge1input.split("\n"))); //6770
