// Helper to count live neighbors
export const countNeighbors = (
  row: number,
  col: number,
  grid: boolean[][]
): number => {
  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;
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

export function conwayEngine(grid: boolean[][]): boolean[][] {
  // Create new grid of same dimensions
  const rows = grid.length;
  const cols = grid[0].length;
  const newGrid = Array(rows)
    .fill(false)
    .map(() => Array(cols).fill(false));

  // Apply Conway's rules to each cell
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const neighbors = countNeighbors(row, col, grid);
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

function calculateNewVelocityGravity(
  position: [number, number, number],
  velocity: [number, number, number],
  otherPositions: [[number, number, number], [number, number, number]]
): [number, number, number][] {
  const G = 1; // gravitational constant
  const forces: [number, number, number] = [0, 0, 0];

  for (const otherPosition of otherPositions) {
    // Calculate distance vector
    const dx = otherPosition[0] - position[0];
    const dy = otherPosition[1] - position[1];
    const dz = otherPosition[2] - position[2];

    // Calculate magnitude of distance
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

    // Calculate gravitational force magnitude
    const forceMagnitude = G / (distance * distance);

    // Add force components
    forces[0] += (forceMagnitude * dx) / distance;
    forces[1] += (forceMagnitude * dy) / distance;
    forces[2] += (forceMagnitude * dz) / distance;
  }

  // Update velocity with forces
  const newVelocity: [number, number, number] = [
    velocity[0] + forces[0],
    velocity[1] + forces[1],
    velocity[2] + forces[2],
  ];

  return [newVelocity];

  //return the velocity
}

function threeBodyEngine(
  positions: [number, number, number][],
  velocities: [number, number, number][]
): [number, number, number][] {
  // update velocities
  for (let i = 0; i < positions.length; i++) {
    velocities[i] = velocities[i].map((v, k) => v + positions[i][k]);
  }

  return positions;
}
