/* 
https://leetcode.com/problems/container-with-most-water/
*/

/* 
Finds the container that can hold the most water based on it's area.
A container's length is the distance between indexes and the two sides are
the heights at those indexes.

See: https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg
*/

const heights1 = [1, 8, 6, 2, 5, 4, 8, 3, 7];
const expected1 = 49;
// Explanation: heights1[1] and heights1[8] as container edges.
// Length = 8 - 1. Height = 7

const heights2 = [1, 1];
const expected2 = 1;

const heights3 = [4, 3, 2, 1, 4];
const expected3 = 16;

const heights4 = [1, 2, 1];
const expected4 = 2;

/**
 * Finds the container that can hold the most water based on it's area.
 * A container's length is the distance between indexes and the two sides are
 * the heights at those indexes.
 * @see https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg
 * - Time: O(?).
 * - Space: O(?).
 * @param {number[]} heights
 * @returns {number} Representing the max area of a container.
 */
function containerWithMostWater2(heights) {
    let a = 0
    let b = heights.length - 1
    let area = 0
    let height = 0
    let length = 0
    let newArea = 0
    while (a < b){
        length = b - a
        height = heights[a] < heights[b] ? heights[a] : heights[b]
        newArea = length * height
        newArea > area && (area = newArea)
        heights[a]<heights[b]? a++ : b--
    }
    return area
}

// function containerWithMostWater(heights) {
//     let maxArea = 0;
//     for (let i=0; i<heights.length; i++){
//         for (let j=i+1; j<heights.length; j++){
//             let height = (heights[i]<heights[j] ? heights[i]:heights[j])
//             if ((height * (j-i)) > maxArea){
//                 maxArea = height * (j-i);
//             }
//         }
//     }
//     return maxArea
// 
  let max = 0;

  for (let i = 0; i < heights.length; i++) {
    for (let j = i + 1; j < heights.length; j++) {
      // x axis.
      const length = j - i;
      // y axis. Limited by shorter wall since water overflows the short side.
      const height = Math.min(heights[i], heights[j]);
      const area = length * height;
      area > max && (max = area);
    }
  }
  return max;
}

/* 
Unit Testing example using built in deprecating node testing library.
You should use a library like jasmine instead, but if you don't have
access to it, this could help for some quick testing.

If no errors are logged to the terminal then the tests passed.
There are multiple comparison methods that can be used, e.g.,
strictEqual for comparing primitives and deepStrictEqual for collections.
*/
const { strictEqual } = require('assert');

/* 
Using an array here and the .forEach just helps avoid having to copy paste
The function calls for each test case and the extra error message we gave.

The values don't have to be stored in vars above, they can be written in
like the first case then the vars above could be deleted.
*/
const testCases = [
  {
    args: [[1, 8, 6, 2, 5, 4, 8, 3, 7]],
    expected: 49,
    description: 'a wide container solution ignoring first',
  },
  { args: [heights2], expected: expected2, description: 'two same heights' },
  {
    args: [heights3],
    expected: expected3,
    description: 'a whole container solution',
  },
  {
    args: [heights4],
    expected: expected4,
    description: 'a whole container solution with short sides',
  },
];

// testCases.forEach((testData, i) => {});
testCases.forEach(({ args, expected, description }, i) => {
  const actual = containerWithMostWater(...args);

  strictEqual(actual, expected, description);
});

console.log(containerWithMostWater(heights1))
console.log(containerWithMostWater(heights2))
console.log(containerWithMostWater(heights3))
console.log(containerWithMostWater(heights4))
console.log(containerWithMostWater(heights5))