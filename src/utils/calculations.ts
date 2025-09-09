export function calculateCentsNeeded(objective: number): {
  centsNeeded: number;
  totalSum: number;
} {
  let cents = 1;
  let sum = 0;
  
  while (sum < objective) {
    sum += cents * 0.01;
    cents++;
  }
  
  return {
    centsNeeded: cents - 1,
    totalSum: sum
  };
}

export function generateCentAmounts(objective: number): number[] {
  const { centsNeeded } = calculateCentsNeeded(objective);
  const amounts: number[] = [];
  
  for (let i = 1; i <= centsNeeded; i++) {
    amounts.push(i * 0.01);
  }
  
  return amounts;
}