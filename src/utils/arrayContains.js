export default function arrayContainsSubarray(mainArray, subArray) {
  if (subArray.length < 3) return false;
  return mainArray.some((arr) => arr.every((elem) => subArray.includes(elem)));
}

/* 
  
  mainArray = [
  [1, 2, 3],
  [1, 4, 7],
  [1, 5, 9],
  [2, 4, 6],
  [2, 5, 8],
  [3, 6, 9],
  [3, 5, 7],
  [4, 5, 6],
  [7, 8, 9],
];

subArray = [4, 5, 6, 8]

[[1, 2, 3], [1, 4, 7]].some((arr) => [1, 2, 3, 4].some((elem) => arr.includes(elem)));
  */
