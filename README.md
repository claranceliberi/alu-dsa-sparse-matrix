# Sparse Matrix Operations

This program performs operations on sparse matrices using a custom `SparseMatrix` class. It allows users to add, subtract, or multiply two sparse matrices loaded from files.

## Table of Contents

- [Sparse Matrix Operations](#sparse-matrix-operations)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [File Format](#file-format)
  - [Supported Operations](#supported-operations)
  - [Output](#output)
  - [SparseMatrix Class](#sparsematrix-class)
  - [Error Handling](#error-handling)

## Installation

1. Ensure you have Node.js installed on your system.
2. Clone this repository or download the source files.
3. Navigate to the project directory in your terminal.

## Usage

To run the program:

```
node index.js
```

The program will prompt you to select an operation (add/subtract/multiply). Enter your choice and press Enter.

## File Format

Input matrices should be stored in text files with the following format:

```
rows=<number_of_rows>
cols=<number_of_columns>
(row, column, value)
(row, column, value)
...
```

Example:
```
rows=3
cols=3
(0, 0, 1)
(1, 1, 2)
(2, 2, 3)
```

## Supported Operations

1. **Addition**: Adds two sparse matrices element-wise.
2. **Subtraction**: Subtracts the second matrix from the first element-wise.
3. **Multiplication**: Performs matrix multiplication of the two input matrices.

## Output

The result of the operation is saved to a file named `results.txt` in the same format as the input files.

## SparseMatrix Class

The `SparseMatrix` class is used to represent and manipulate sparse matrices efficiently. Key features include:

- Loading matrices from files
- Efficient storage
- Methods for addition, subtraction, and multiplication
- Progress tracking for multiplication operations

## Error Handling

The program includes error handling for:

- Invalid file formats
- Mismatched matrix dimensions for operations
- File read/write errors

If an error occurs, an appropriate error message will be displayed.