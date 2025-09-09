export function generateSavingsId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}`;
}

export function formatSavingsUrl(savingsId: string): string {
  return `${window.location.origin}/savings/${savingsId}`;
}