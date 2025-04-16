# Matrix Sparse Matrix Operations

This project implements a memory-efficient SparseMatrix class and supports addition, subtraction, and multiplication of large sparse matrices, as required by the ALU DSA assignment.

## Features
- Efficiently stores only non-zero elements
- Custom file parser (no regex or built-in libraries for core logic)
- Supports addition, subtraction, and multiplication
- Handles invalid input formats and dimension mismatches
- Interactive CLI: **First select operation, then select files** (per assignment instructions)

## Usage

1. Place your matrix files in the appropriate directory (e.g., `input_for_students` or `my_small_inputs`).
2. Run the program:
   ```bash
   node index.js
   ```
3. Follow the prompts:
   - **First:** Enter the operation (`add`, `subtract`, or `multiply`).
   - **Then:** Enter the path to the first matrix file (e.g., `my_small_inputs/matrix1.txt`)
   - **Then:** Enter the path to the second matrix file (e.g., `my_small_inputs/matrix2.txt`)
4. The result will be saved to `results.txt` in the project directory. The console will show a preview and the number of non-zero elements.

## Input File Format
Each matrix file must follow this format:
```
rows=3
cols=3
(0, 0, 1)
(1, 1, 2)
(2, 2, 3)
```
- The first line gives the number of rows.
- The second line gives the number of columns.
- Each subsequent line gives a non-zero entry as (row, col, value).
- Whitespace is ignored. Invalid lines or formats will trigger an error.

## Assignment Restrictions
- **No built-in libraries** (e.g., regex, Map, Set, Array methods for matrix logic): All core logic is implemented manually.
- **Error handling:**
  - If the input file format is invalid, the program throws an error and exits.
  - If matrix dimensions do not match for the selected operation, an error is shown.
- **Efficient:** Only non-zero elements are stored and processed.

## Testing
- For quick tests, use files from `my_small_inputs`.
- For full assignment/benchmark tests, use files from `input_for_students` (note: these are very large and may take time to process).

## Example
```
Select operation (add/subtract/multiply): add
Enter path to first matrix file: my_small_inputs/matrix1.txt
Enter path to second matrix file: my_small_inputs/matrix2.txt
Non-zero elements in result: 5
Preview of result file:
rows=3
cols=3
(0, 0, 1)
(1, 1, 1)
(2, 2, 4)
(0, 2, -5)
(2, 0, -7)
Results have been saved to results.txt
```

## Notes
- You can use any compatible pair of files for any operation, as long as their dimensions match the mathematical requirements.
- For multiplication: the number of columns in the first matrix must equal the number of rows in the second matrix.
- The program is robust to whitespace and will notify you of any format errors.

## Citation
If you reuse or adapt this code, please cite the author and the ALU DSA course assignment.
