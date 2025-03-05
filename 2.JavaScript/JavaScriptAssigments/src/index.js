const isPalindrome = (string) => {
  //removing the white spaces
  let myString = string.toLowerCase().replace(/[^a-z0-9]/g, "");
  // reversing
  let reverseString = myString.split("").reverse().join("");
  const comparison = () => (reverseString === myString ? true : false);
  return comparison();
};
console.log(isPalindrome("A man, a plan, a canal,panama"));
console.log(isPalindrome("Was it a car or a cat I saw"));
console.log(isPalindrome("Hello World"));

// 2. Rerverse
const reverseStrings = (string) =>
  string
    .split("")
    .reverse()
    .join()
    .replace(/[^a-zA-Z0-9 -]/g, "");
console.log(reverseStrings("myname"));

// 3. longest Palindromic Substring
const longestPalindromicSubstring = (s) => {
  let longest = "";

  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      let substring = s.substring(i, j + 1);

      if (isPalindrome(substring)) {
        if (substring.length > longest.length) {
          longest = substring;
        }
      }
    }
  }

  return longest;
};

console.log(longestPalindromicSubstring("babad"));
console.log(longestPalindromicSubstring("cbbd"));

// 4 check if two Strings are Anagrams
const areAnagram = (str1, str2) => {
  let str1ToLowerCase = str1.toLowerCase().split("").sort().join();
  let str2ToLowerCase = str2.toLowerCase().split("").sort().join();
  const results = () =>
    str1ToLowerCase.includes(str2ToLowerCase) ? true : false;
  return results();
};
console.log(areAnagram("Listen", "Silent"));
console.log(areAnagram("Hello", "World"));

// 5. Remove Duplicates from a string
// es6 using set method
const removeDuplicates = (string) => {
  let newArrayOfString = string.split("");
  return [...new Set(newArrayOfString)].join("");
};
console.log(removeDuplicates("programming"));
console.log(removeDuplicates("hello world"));
console.log(removeDuplicates("aaaaa"));
console.log(removeDuplicates("abcd"));
console.log(removeDuplicates("aabbcc"));

// 6. Count Palindromes in a String
const countPalindromes = (string) => {
  let count = 0;

  for (let index = 0; index < string.length; index++) {
    for (let j = index; j < string.length; j++) {
      let substring = string.substring(index, j + 1);
      if (isPalindrome(substring)) {
        count++;
      }
    }
  }

  return count;
};

console.log(countPalindromes("ababa")); // Output: 9
console.log(countPalindromes("aabb")); // Output: 6
console.log(countPalindromes("a")); // Output: 1
console.log(countPalindromes("abc")); // Output: 3

// 7. Longest comsoomon prefix
const longestCommonPrefix = (string) => {
  if (string.length === 0) return "";
  let prefix = string[0];

  for (let index = 1; index < string.length; index++) {
    while (!string[index].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (prefix === "") return "";
    }
  }
  return prefix;
};
console.log(longestCommonPrefix(["flower", "flow", "flight"]));
console.log(longestCommonPrefix(["dog", "racecar", "car"]));
console.log(
  longestCommonPrefix(["interspecies", "interstellat", "interstate"])
);
console.log(longestCommonPrefix(["prefix", "prefixes", "preform"]));
console.log(longestCommonPrefix(["apple", "banana", "cherry"]));

// 8. Case insensitive Palindrome
const isCaseInsensitivePalidrome = (string) => {
  let cleanString = string.toLowerCase().replace(/[^a-z0-9]/g, ""); //
  let reversedString = cleanString.split("").reverse().join("");
  return cleanString === reversedString;
};
console.log(isCaseInsensitivePalidrome("Aba"));
console.log(isCaseInsensitivePalidrome("racecar"));
console.log(isCaseInsensitivePalidrome("palindrome"));
console.log(isCaseInsensitivePalidrome("Madam"));
console.log(isCaseInsensitivePalidrome("Hello"));
