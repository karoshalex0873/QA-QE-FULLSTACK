// //   Asiigments of the Day
// input is a string ?
const is_string = (input) =>
  typeof input === "string" ? "true (it is a string)" : "false (not a string)";
console.log(is_string("w3resource"));
console.log(is_string([1, 2, 44, 0]));

// 2. Blank
const is_blank = (input) => (input === "" ? "true" : "false");
console.log(is_blank(""));
console.log(is_blank("abc"));

// 3. array of words
const string_to_array = (string) => {
  const arrayofString = string.split(" ");
  return arrayofString;
};
console.log(string_to_array("Robin Singh"));

// 4. Extract string
const truncate_string = (string, char) => {
  const trancate = string.substr(0, char);
  return trancate;
};
console.log(truncate_string("Robin Singh", 4));

// 5. Abbreviate Name
const abbrev_name = (name) => {
  // spliting the name
  const split = name.trim().split(" ");
  return `${split[0]} ${split[1][0]}`;
};
console.log(abbrev_name("Robin Singh"));

// 6. Hide email address
const protect_email = (email) => {
  // extract email section using replace method
  const replacedEmail = email.replace("_singh", "...");
  return replacedEmail;
};
console.log(protect_email("robin_singh@gmail.com"));

// 7. Parameterize string
const string_parameterize = (string) => {
  const parametizedString = string
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 -]/, "")
    .replace(/\s/g, "-");
  return parametizedString;
};
console.log(string_parameterize("Robin Singh from USA."));

//8. Capitalize First Letter
const capitalize = (string) => {
  const output = string.split(" ");
  for (let i = 0; i < output.length; i++) {
    output[i] = output[i][0].toUpperCase() + output[i].substr(1);
  }
  return output.join(" ");
};
console.log(capitalize("js string exerciese"));
// 10. Swap Case
const swapcase = (string) => {
  const swapping = string.split("");
  for (let i = 0; i < swapping.length; i++) {
    swapping[i] =
      swapping[i] === swapping[i].toUpperCase()
        ? swapping[i].toLowerCase()
        : swapping[i].toUpperCase();
  }
  return swapping.join("");
};

console.log(swapcase("AaBbc"));

// 11 Camelizing string
const camelize = (string) => {
  const camelizeString = string.replace(/w+(.)/g, (match, chr) =>
    ch.toUpperCase()
  );
  return camelizeString;
};
console.log(camelize("JavaScript Exercises"));

// uncamelizeing a string
const uncamelize = (str, separator = "") =>
  str.replace(/([a-z])([A-Z])/g, `$1${separator}$2`).toLowerCase();
console.log(uncamelize("helloWorld"));

// 13. Repeat String
const repeat = (string, n) => string.repeat(n);
console.log(repeat("Ha!", 3));
// 14. nsert in String
const insert = (string, insertString, pos) => {
  const results = string.slice(0, pos) + insertString + ` ` + string.slice(pos);
  return results;
};
console.log(insert("we are doing some exercies", "javaScript", 18));

// 15. Humanize format
const humanize_format = (num) => {
  let suffix = ["th", "st", "nd", "rd"];
  v = num % 100;
  return num + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
};
console.log(humanize_format(3));
// 16. Trucate string with ellipsis

const text_trancate = (string, length, ellipsis) =>
  string.length > length ? string.slice(0, length) + ` ` + ellipsis : string;
console.log(text_trancate("We are doing JS string", 15, "!!"));

// 17. Chop String into Chunks
const string_chop = (string, point) =>
  string.match(new RegExp(`.{1,${point}}`, "g")) || [];
console.log(string_chop("w3resource", 3));

// 18. Count Substring Occurrence
const count = (string, subString) => {
  const stringNumber =
    string.toLowerCase().split(subString.toLowerCase()).length - 1;
  return stringNumber;
};
console.log(count("The quick brown fox jumped over the lazy dog", "the"));

// 19. Revers Binary Respresenatation
const reverse_binary = (num) => {
  const BinaryForm = parseInt(num.toString(2).split("").reverse().join(""), 2);
  return BinaryForm;
};
console.log(reverse_binary(100));

// 20. Pad String to length
const formatted_string = (pad, string, position) => {
  string = string.toString();
  return position === 'l' 
    ? (pad + string).slice(-pad.length)  // Left padding
    : (string + pad).slice(0, pad.length); // Right padding
};

console.log(formatted_string('0000', 123, 'l')); 

