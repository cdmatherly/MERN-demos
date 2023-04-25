const str1 = '';
const expected1 = false;

const str2 = 'a';
const expected2 = true;

const str3 = 'ddaa';
const expected3 = true;
// Explanation: "daad" or "adda"

const str4 = 'dda';
const expected4 = true;
// Explanation: "dad"

const str5 = 'aaadd';
const expected5 = true;
// Explanation: "daaad"

const str6 = 'abc';
const expected6 = false;

/* 
What is it about a string that makes it POSSIBLE for it to become a palindrome if the characters were rearranged.
*/

/**
 * This same approach can be done with an array, using .indexOf instead
 * of .hasOwnProperty and .splice instead of delete, but it's much
 * slower that way because .indexOf and .splice would be a nested loops.
 * - Time: O(n) linear, n = str.length.
 * - Space: O(n) linear.
 */
function canStringBecomePalindrome(str) {
    //first check if string has at least one character
    if(str.length > 0){ 
        const occurances = {
  if (str.length === 0) {
    return false;
  }

  const leftoverCharsMap = new Map();

  for (const char of str) {
    if (leftoverCharsMap.has(char)) {
      leftoverCharsMap.delete(char);
    } else {
      leftoverCharsMap.set(char, true);
    }
  }
  return leftoverCharsMap.size <= 1 ? true : false;
};
        //loop through 
        for(let i = 0; i < str.length; i++){
            if(occurances.hasOwnProperty(str[i])){
                occurances[str[i]]++
            } else {
                occurances[str[i]] = 1;
            }
        }
        if(str.length %2 == 0){
            const values = Object.values(occurances);
            for(let j = 0; j < values.length; j++){
                if(values[j] %2 != 0){
                    return false;
                }
            }
        } else {
            const values = Object.values(occurances);
            let foundOdd = false;
            for(let j = 0; j < values.length; j++){
                if(values[j] %2 != 0){
                    if(foundOdd == true){
                        return false;
                    }
                    foundOdd = true;
                }
            }
        }
        return true;
    }
    return false;
}

console.log(canStringBecomePalindrome(str1));
console.log(canStringBecomePalindrome(str2));
console.log(canStringBecomePalindrome(str3));
console.log(canStringBecomePalindrome(str4));
console.log(canStringBecomePalindrome(str5));
console.log(canStringBecomePalindrome(str6));