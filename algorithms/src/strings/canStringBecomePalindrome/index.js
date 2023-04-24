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
 * Determines whether or not it is possible for the string's characters to be
 * rearranged into a palindrome.
 * - Space: O(?).
 * - Time: O(?).
 * @param {string} str
 * @returns {boolean} Whether the given str can be rearranged into a palindrome.
 */
function canStringBecomePalindrome(str) {
    //first check if string has at least one character
    if(str.length > 0){ 
        const occurances = {};
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