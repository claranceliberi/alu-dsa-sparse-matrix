const fs = require("fs");
const readline = require("readline");
const SparseMatrix = require("./SparseMatrix");

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let matrix1, matrix2;

function promptForFiles() {
  rl.question("Enter path to first matrix file: ", (file1) => {
    rl.question("Enter path to second matrix file: ", (file2) => {
      try {
        matrix1 = new SparseMatrix(file1.trim());
        matrix2 = new SparseMatrix(file2.trim());
      } catch (err) {
        console.error("Error loading matrices:", err.message);
        rl.close();
        return;
      }
      promptForOperation();
    });
  });
}

function promptForOperation() {
  rl.question("Select operation (add/subtract/multiply): ", (answer) => {
    performOperation(answer.toLowerCase());
  });
}

// Prompt for operation first, then for file paths
rl.question("Select operation (add/subtract/multiply): ", (operation) => {
  rl.question("Enter path to first matrix file: ", (file1) => {
    rl.question("Enter path to second matrix file: ", (file2) => {
      let matrix1, matrix2;
      try {
        matrix1 = new SparseMatrix(file1.trim());
        matrix2 = new SparseMatrix(file2.trim());
      } catch (err) {
        console.error("Error loading matrices:", err.message);
        rl.close();
        return;
      }
      performOperation(operation.toLowerCase(), matrix1, matrix2);
    });
  });
});

/**
 * Performs the selected matrix operation and saves the result to a file.
 * @param {string} operation - The operation to perform: "add", "subtract", or "multiply".
 * @param {SparseMatrix} matrix1 - First matrix
 * @param {SparseMatrix} matrix2 - Second matrix
 */
function performOperation(operation, matrix1, matrix2) {
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

  // Debug: Print number of non-zero elements and preview
  const numNonZero = result.elements.size;
  console.log(`Non-zero elements in result: ${numNonZero}`);
  console.log('Preview of result file:');
  console.log(resultString.split('\n').slice(0, 12).join('\n'));

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
