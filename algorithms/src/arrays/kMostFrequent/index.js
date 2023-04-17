// From a technical interview with an AWS engineer: https://youtu.be/t0OQAD5gjd8

/* 
Given an unsorted non-empty array of integers and int k, return the k most frequent elements (in any order)
You can assume there is always a valid solution
These example inputs are sorted for readability, but the input is NOT guaranteed to be sorted and the output does NOT need to be in any specific order
Hard Bonus: make it O(n) time
*/

const numbers1 = [1, 1, 1, 2, 2, 3];
const k1 = 2;
const expected1 = [1, 2];
// Explanation: return the two most frequent elements, 1 and 2 are the two most frequent elements

const numbers2 = [0, 0, 0, 2, 2, 3];
const k2 = 1;
const expected2 = [0];
// Explanation: k being 1 means return the single most frequent element

// 6 occurs 6 times, 3 occurs 3 times, 2 occurs 2 times, 1 occurs 1 time.
const numbers3 = [1, 6, 3, 3, 6, 6, 3, 6, 2, 2, 6, 6];
const k3 = 3;
const expected3 = [6, 3, 2];

/* 
PSEUDOCODE
create a function that accepts a non-empty array of ints and an int k
    create empty hash table
    create empty arr
    loop through the array
        add each unique value from the array as a key with value 1
        add 1 each time we see a value that is already in the hash table
    loop through the hash table and find k most frequent keys
        push the k most frequent into our temp array from greatest to least
        delete that key from the table
    return temp arr

*/


/**
 * Returns the k most frequently occurring numbers from the given unordered
 * numbers.
 * - Time: O(n) linear because the the methods called inside loops are
 *    O(1) constant time: .push, .pop, .hasOwnProperty.
 * - Space: O(3n) -> O(n) linear.
 * @param {Array<number>} numbers Unordered.
 * @param {number} k Represents the amount of numbers that should be returned.
 * @returns {Array<number>} The k most frequently occurring numbers.
 */
function kMostFrequent(numbers, k) {
    let myTable = {
  const mostFrequentNumbers = [];
  const numToFrequency = new Map();
  const frequencyToNumbers = new Map();
  let maxFrequency = 0;

  for (const num of numbers) {
    if (numToFrequency.has(num) === false) {
      numToFrequency.set(num, 0);
    }
    const newFrequency = numToFrequency.get(num) + 1;
    numToFrequency.set(num, newFrequency);

    if (newFrequency > maxFrequency) {
      maxFrequency = newFrequency;
    }
  }

  /* 
  build a frequency table that is a reverse of the above so we can look up
  starting from a frequency to find what numbers have that frequency.
  since multiple numbers can have the same frequency, the value of this table
  needs to be an array.

  Alternatively, this could be a 2d sparse array, often referred to as
  'buckets' where each nested array is a 'bucket' / container to hold
  items.
  */
  for (const [num, frequency] of numToFrequency) {
    if (frequencyToNumbers.has(frequency) === false) {
      frequencyToNumbers.set(frequency, []);
    }
    frequencyToNumbers.get(frequency).push(num);
  }

  console.log('numToFrequency:', numToFrequency);
  console.log('frequencyToNumbers:', frequencyToNumbers);
  console.log('maxFreq:', maxFrequency);

  let nextMostFrequent = maxFrequency;

  while (mostFrequentNumbers.length < k && nextMostFrequent > 0) {
    // .has, .get, .push, .pop are all O(1) constant time.
    if (frequencyToNumbers.has(nextMostFrequent) && frequencyToNumbers.get(nextMostFrequent).length > 0) {
      const nextMostFreqNum = frequencyToNumbers.get(nextMostFrequent).pop();
      mostFrequentNumbers.push(nextMostFreqNum);
    } else {
      // no numbers have this frequency, decrement to check for next most freq
      nextMostFrequent--;
    }
  }
  return mostFrequentNumbers;
}

/**
 * - Time: O(n) + O(n) + O(n^2) + O(k) -> O(n^2) quadratic due to sort's worst
 *    case.
 * - Space: O(n) linear.
 */
function kMostFrequentSort(numbers, k) {
  const frequencies = new Map();

  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];

    if (frequencies.has(num)) {
      frequencies.set(num, frequencies.get(num) + 1);
    } else {
      frequencies.set(num, 1);
    }
  }

  const keys = [...frequencies.keys()];

  // sort gives us two elements side by side, A and B, a - b sorts ascending, b - a for descending
  keys.sort((numA, numB) => {
    const frequencyA = frequencies.get(numA);
    const frequencyB = frequencies.get(numB);
    return frequencyB - frequencyA;
  });

  // slice only the first k keys, if using a plain object for the freq table instead of the
  // built in Map object, would need to convert the keys back to ints, could do this with .map
  return keys.slice(0, k);
};
    let freqNums = [];
    for (let i=0; i<numbers.length; i++) {
        myTable.hasOwnProperty(numbers[i]) ? myTable[numbers[i]]++
        : myTable[numbers[i]] = 1;
    }

    while (k > 0) {
      let mostFrequentKey = undefined;
      let mostFrequent = 0;
        for (let key in myTable) {
            if (myTable[key] > mostFrequent) {
                mostFrequent = myTable[key];
                mostFrequentKey = key;
                // console.log(myTable)
            }
        }
        freqNums.push(mostFrequentKey)
        delete myTable[mostFrequentKey];
        k--;
    }

    return freqNums;
}

console.log(kMostFrequent(numbers1, k1));
console.log(kMostFrequent(numbers2, k2));
console.log(kMostFrequent(numbers3, k3));