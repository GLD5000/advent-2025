import { challenge1ainput } from "./challenge1aInput.js";
//node challenge-1/challenge1aOutput.js
function getPassnumber(instructionArray) {
  let passnumber = 0;
  let dialPosition = 50;
  instructionArray.forEach((instruction) => {
    const numberToAdd = Number(instruction.replace("R", "").replace("L", "-"));
    const [newDialPosition, zeroClicks] = findCurrentPosition(
      dialPosition,
      numberToAdd,
    );
    dialPosition = newDialPosition;
    passnumber += zeroClicks;
  });
  return passnumber;
}

function findCurrentPosition(dialPosition, numberToAdd) {
  const remainder = numberToAdd % 100;
  let zeroClicks = Math.floor(Math.abs(numberToAdd - remainder) / 100);
  const newPositionRaw = dialPosition + remainder;
  const isBelowZero = newPositionRaw < 0;
  const isBelowOne = newPositionRaw < 1;
  const isAboveNinetyNine = newPositionRaw > 99;
  if (isBelowOne || isAboveNinetyNine) zeroClicks += 1;
  const newPositionLimited = isAboveNinetyNine
    ? newPositionRaw - 100
    : isBelowZero
      ? newPositionRaw + 100
      : newPositionRaw;

  return [newPositionLimited, zeroClicks];
}

console.log(getPassnumber(challenge1ainput.split("\n")));
