const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const simulateNetworkRequest = async ({ error = false, delayMs = 1000 }: { error?: boolean; delayMs?: number }) => {
  await delay(delayMs);
  if (error) throw new Error('simulated network response error');
};

export { delay, simulateNetworkRequest };
