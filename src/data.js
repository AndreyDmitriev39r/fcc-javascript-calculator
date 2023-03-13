export const digits = [
  {id: "seven", value: "7"},
  {id: "eight", value: "8"},
  {id: "nine", value: "9"},
  {id: "four", value: "4"},
  {id: "five", value: "5"},
  {id: "six", value: "6"},
  {id: "one", value: "1"},
  {id: "two", value: "2"},
  {id: "three", value: "3"},
  {id: "zero", value: "0"},
];

 
export const operators = [
  {id: "divide", value: "/", operation: (num1, num2) => num1 / num2},
  {id: "multiply", value: "*", operation: (num1, num2) => num1 * num2},
  {id: "subtract", value: "-", operation: (num1, num2) => num1 - num2},
  {id: "add", value: "+", operation: (num1, num2) => num1 + num2},
];