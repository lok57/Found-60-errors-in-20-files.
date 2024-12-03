import { FirebaseError } from 'firebase/app';

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000;
const MAX_RETRY_DELAY = 5000;
const BACKOFF_FACTOR = 1.5;

interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
}

export async function retryOperation<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = MAX_RETRIES,
    initialDelay = INITIAL_RETRY_DELAY,
    maxDelay = MAX_RETRY_DELAY,
    backoffFactor = BACKOFF_FACTOR
  } = options;

  let lastError: Error | null = null;
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      if (error instanceof FirebaseError) {
        // Only retry on specific Firebase errors
        if (!['unavailable', 'network-request-failed'].includes(error.code)) {
          throw error;
        }

        // Calculate delay with exponential backoff
        const delay = Math.min(
          initialDelay * Math.pow(backoffFactor, retryCount),
          maxDelay
        );

        console.log(`Retrying operation after ${delay}ms (attempt ${retryCount + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        retryCount++;
      } else {
        throw error;
      }
    }
  }

  throw lastError || new Error('Operation failed after maximum retries');
}