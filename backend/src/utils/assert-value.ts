/**
 * Asserts that a value is not null or undefined, throwing an error with a custom message if it is.
 * 
 * @param value - The value to check
 * @param message - The error message to throw if the value is null or undefined
 * @returns The value if it's not null or undefined
 * @throws Error if the value is null or undefined
 */
export function assertValue<T>(value: T | null | undefined, message: string): T {
  if (value === null || value === undefined) {
    throw new Error(message)
  }
  return value
}
