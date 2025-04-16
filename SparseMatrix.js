// SparseMatrix class implementation

const fs = require("fs");

class SparseMatrix {
  /**
   * Constructor for the SparseMatrix class.
   * @param {Object|string} input - Either an object with rows and cols properties, or a file path.
   */
  constructor(input) {
    this.elements = new Map();

    if (typeof input === "string") {
      this.loadFromFile(input);
    } else if (typeof input === "object" && input.rows && input.cols) {
      this.rows = input.rows;
      this.cols = input.cols;
    } else {
      throw new Error("Invalid input");
    }
  }

  /**
   * Loads matrix data from a file.
   * @param {string} filePath - Path to the file containing matrix data.
   */
  loadFromFile(filePath) {
    const content = fs.readFileSync(filePath, "utf8").split("\n");

    if (!content[0].startsWith("rows=") || !content[1].startsWith("cols=")) {
      throw new Error("Invalid file format");
    }

    this.rows = parseInt(content[0].split("=")[1]);
    this.cols = parseInt(content[1].split("=")[1]);

    for (let i = 2; i < content.length; i++) {
      const line = content[i].trim();
      if (line) {
        if (line.startsWith("(") && line.endsWith(")")) {
          const trimmedLine = line.slice(1, -1); // Remove parentheses
          const parts = trimmedLine.split(",").map((part) => part.trim());
          if (parts.length !== 3) {
            throw new Error("Invalid element format");
          }

          const row = parseInt(parts[0]);
          const col = parseInt(parts[1]);
          const value = parseInt(parts[2]);

          if (isNaN(row) || isNaN(col) || isNaN(value)) {
            throw new Error("Invalid numbers in element");
          }

          this.setElement(row, col, value);
        } else {
          throw new Error("Invalid element format");
        }
      }
    }
  }

  /**
   * Retrieves the value of an element at the specified position.
   * @param {number} row - The row index.
   * @param {number} col - The column index.
   * @returns {number} The value at the specified position, or 0 if not set.
   */
  getElement(row, col) {
    return this.elements.get(`${row},${col}`) || 0;
  }

  /**
   * Sets the value of an element at the specified position.
   * @param {number} row - The row index.
   * @param {number} col - The column index.
   * @param {number} value - The value to set.
   */
  setElement(row, col, value) {
    if (value !== 0) {
      this.elements.set(`${row},${col}`, value);
    } else {
      this.elements.delete(`${row},${col}`);
    }
  }

  /**
   * Adds another SparseMatrix to this one (sparse-aware).
   * Only iterates over non-zero elements for efficiency.
   * @param {SparseMatrix} other - The matrix to add.
   * @returns {SparseMatrix} A new SparseMatrix representing the sum.
   */
  add(other) {
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error("Matrix dimensions do not match for addition");
    }
    const result = new SparseMatrix({ rows: this.rows, cols: this.cols });
    // Add all elements from this matrix
    for (const [key, value] of this.elements) {
      const sum = value + other.getElement(...key.split(',').map(Number));
      if (sum !== 0) {
        result.elements.set(key, sum);
      }
    }
    // Add elements from other matrix not already in this matrix
    for (const [key, value] of other.elements) {
      if (!this.elements.has(key)) {
        if (value !== 0) {
          result.elements.set(key, value);
        }
      }
    }
    return result;
  }

  /**
   * Subtracts another SparseMatrix from this one (sparse-aware).
   * Only iterates over non-zero elements for efficiency.
   * @param {SparseMatrix} other - The matrix to subtract.
   * @returns {SparseMatrix} A new SparseMatrix representing the difference.
   */
  subtract(other) {
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error("Matrix dimensions do not match for subtraction");
    }
    const result = new SparseMatrix({ rows: this.rows, cols: this.cols });
    // Subtract all elements from this matrix
    for (const [key, value] of this.elements) {
      const diff = value - other.getElement(...key.split(',').map(Number));
      if (diff !== 0) {
        result.elements.set(key, diff);
      }
    }
    // Subtract elements from other matrix not already in this matrix
    for (const [key, value] of other.elements) {
      if (!this.elements.has(key)) {
        if (-value !== 0) {
          result.elements.set(key, -value);
        }
      }
    }
    return result;
  }

  /**
   * Multiplies this SparseMatrix with another (sparse-aware, correct).
   * For each non-zero (i, k) in this, and each non-zero (k, j) in other, accumulate at (i, j).
   * @param {SparseMatrix} other - The matrix to multiply with.
   * @param {Function} progressCallback - A callback function to report progress.
   * @returns {SparseMatrix} A new SparseMatrix representing the product.
   */
  multiply(other, progressCallback) {
    if (this.cols !== other.rows) {
      throw new Error("Matrix dimensions are not compatible for multiplication");
    }
    const result = new SparseMatrix({ rows: this.rows, cols: other.cols });
    let operationsPerformed = 0;
    const totalOperations = this.elements.size * other.elements.size;
    // For each non-zero in this matrix
    for (const [keyA, valueA] of this.elements) {
      const [rowA, colA] = keyA.split(',').map(Number);
      // For each non-zero in other matrix where row == colA
      for (const [keyB, valueB] of other.elements) {
        const [rowB, colB] = keyB.split(',').map(Number);
        if (rowB === colA) {
          const resKey = `${rowA},${colB}`;
          const current = result.elements.get(resKey) || 0;
          const newValue = current + valueA * valueB;
          if (newValue !== 0) {
            result.elements.set(resKey, newValue);
          } else if (result.elements.has(resKey)) {
            result.elements.delete(resKey);
          }
        }
        operationsPerformed++;
        if (progressCallback && operationsPerformed % 1000000 === 0) {
          progressCallback(operationsPerformed / totalOperations);
        }
      }
    }
    return result;
  }

  /**
   * Converts the SparseMatrix to a string representation.
   * @returns {string} A string representation of the matrix.
   */
  toString() {
    let result = `rows=${this.rows}\ncols=${this.cols}\n`;
    for (const [key, value] of this.elements) {
      const [row, col] = key.split(",");
      result += `(${row}, ${col}, ${value})\n`;
    }
    return result.trim();
  }
}

module.exports = SparseMatrix;
