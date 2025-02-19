const fs = require("fs");
const readline = require("readline");
const SparseMatrix = require("./SparseMatrix");

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Load matrices from files
const matrix1 = new SparseMatrix("./input_for_students/easy_sample_03_1.txt");
const matrix2 = new SparseMatrix("./input_for_students/easy_sample_03_2.txt");

/**
 * Performs the selected matrix operation and saves the result to a file.
 * @param {string} operation - The operation to perform: "add", "subtract", or "multiply".
 */
function performOperation(operation) {
  let result;
  switch (operation) {
    case "add":
      result = matrix1.add(matrix2);
      break;
    case "subtract":
      result = matrix1.subtract(matrix2);
      break;
    case "multiply":
      result = matrix1.multiply(matrix2, (progress) => {
        console.log(`Multiplication progress: ${(progress * 100).toFixed(2)}%`);
      });
      break;
    default:
      console.log("Invalid operation");
      rl.close();
      return;
  }

  // Convert result to string
  const resultString = result.toString();

  // Write result to file
  fs.writeFile("results.txt", resultString, (err) => {
    if (err) throw err;
    console.log("Results have been saved to results.txt");
    rl.close();
  });
}

// Prompt user for operation
rl.question("Select operation (add/subtract/multiply): ", (answer) => {
  performOperation(answer.toLowerCase());
});
