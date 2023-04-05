/* 
  Stable sort.

  Visualization:
  https://www.hackerearth.com/practice/algorithms/sorting/merge-sort/visualize/

  Time Complexity
    - Best case: O(n log(n)) linearithmic.
    - Average case: O(n log(n)) linearithmic.
    - Worst case: O(n log(n)) linearithmic.

  Space: O(n) linear

  steps:
    1. create a merge function to merge two already sorted arrays into a single
        sorted array.
      - you do NOT need to work in place, ok to use a new array
    2. create mergeSort function to sort the provided array
      - split the array in half and recursively merge the halves using the
          previously created merge function.
      - splitting of arrays stops when array can no longer be split.
      - an array of 1 item is by definition sorted, so two arrays of 1 item
          can therefore be merged into a sorted array.
*/

// merge
const sortedA1 = [];
const sortedB1 = [];
const expectedMerge1 = [];

const sortedA2 = [5];
const sortedB2 = [2];
const expectedMerge2 = [2, 5];

const sortedA3 = [3];
const sortedB3 = [2, 3, 4, 7];
const expectedMerge3 = [2, 3, 3, 4, 7];

const sortedA4 = [1, 2, 4, 5, 6, 9];
const sortedB4 = [3, 7, 8, 10];
const expectedMerge4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/**
 * Merges two already sorted arrays into a new sorted array.
 * - Time: O(n + m) -> O(n) linear n = left.length, m = right.length.
 *    Every item from each array is visited once.
 * - Space: O(n + m) -> O(n) linear.
 * @param {Array<number>} left
 * @param {Array<number>} right
 * @returns {Array<number>} A new sorted array containing all the elements of
 *    both given halves.
 */
function merge(left = [], right = []) {
  // let newArr = [...left, ...right];
    let newArr = []
    i = 0
    j = 0
    while (i < left.length && j < right.length){
      if (left[i] < right[j]){
        newArr.push(left[i])
        i++
      }
      else {
        newArr.push(right[j])
        j++
      }
    }
    while (i < left.length){
      newArr.push(left[i])
      i++
    }
    while (j < right.length){
      newArr.push(right[j])
      j++
    }
  return newArr;
}

console.log(merge(sortedA1, sortedB1))
console.log(merge(sortedA2, sortedB2))
console.log(merge(sortedA3, sortedB3))
console.log(merge(sortedA4, sortedB4))

  // one liner version of adding in any left over items
  // return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
}

/**
 * Creates a new sorted array based on the given numbers being recursively split
 * and merged.
 * Best: O(n log(n)) linearithmic.
 * Avg: O(n log(n)) linearithmic.
 * Worst: O(n log(n)) linearithmic.
 * @param {Array<number>} numbers
 * @returns {Array<number>} A New sorted array.
 */
function mergeSort(numbers = []) {
  if (numbers.length === 1) {
    // return once we hit an array with a single item
    return numbers;
  }

  const middleIdx = Math.floor(numbers.length / 2);
  const left = numbers.slice(0, middleIdx);
  const right = numbers.slice(middleIdx);
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);
  return merge(sortedLeft, sortedRight);
}
