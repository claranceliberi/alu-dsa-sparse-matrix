# Matrix Sparsity Library

A specialized Node.js library for efficient sparse matrix computations. This implementation optimizes memory usage by storing only non-zero elements.

## Overview

- **Core Functionality**: Performs addition, subtraction, and multiplication on sparse matrices
- **Storage Format**: Uses coordinate format (COO) for matrix representation
- **I/O Handling**: Reads from and writes to structured text files

## Getting Started

### Prerequisites
- Node.js runtime environment
- Local storage access for file I/O

### Quick Start
1. Install Node.js
2. Clone/download the source code
3. Execute with: `node index.js`

### Matrix Input Specification

Matrices are defined in text files using this structure:
```
rows=M
cols=N
(i, j, value)
```

Where:
- `M`, `N`: Matrix dimensions
- `i`: Zero-based row index
- `j`: Zero-based column index
- `value`: Non-zero element value

Example Matrix:
```
rows=4
cols=4
(0, 1, 7.0)
(2, 3, -2.5)
```

## Core Operations

### Available Functions
- Matrix Addition (A + B)
- Matrix Subtraction (A - B)
- Matrix Multiplication (A × B)

### Implementation Details
- **Storage**: Optimized for sparse data structures
- **Performance**: Leverages sparsity for efficient computations
- **Output**: Results written to `results.txt` in consistent format

## Technical Notes

### Error Detection
- Dimension compatibility validation
- File format verification
- I/O operation monitoring

### SparseMatrix Class
Implements:
- Sparse storage optimization
- Matrix operation algorithms
- Progress monitoring for complex operations
