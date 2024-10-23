export function conwayEngine(grid: boolean[][]): boolean[][] {
  // Create new grid of same dimensions
  const rows = grid.length;
  const cols = grid[0].length;
  const newGrid = Array(rows)
    .fill(false)
    .map(() => Array(cols).fill(false));

  // Helper to count live neighbors
  const countNeighbors = (row: number, col: number): number => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          count += grid[newRow][newCol] ? 1 : 0;
        }
      }
    }
    return count;
  };

  // Apply Conway's rules to each cell
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const neighbors = countNeighbors(row, col);
      const isAlive = grid[row][col];

      if (isAlive && (neighbors === 2 || neighbors === 3)) {
        newGrid[row][col] = true;
      } else if (!isAlive && neighbors === 3) {
        newGrid[row][col] = true;
      }
    }
  }

  return newGrid;
}
