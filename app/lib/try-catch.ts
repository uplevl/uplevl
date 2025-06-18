/**
 * A type representing either a successful result with data or an error.
 * @template T The type of the successful result data
 * @template E The type of the error (defaults to Error)
 */
type Result<T, E = Error> = { data: T; error: null } | { data: null; error: E };

/**
 * A type that can be either a Promise or a function that returns a value.
 * @template T The type of the value that will be returned
 */
type PromiseOrFunction<T> = Promise<T> | (() => T);

/**
 * A utility function that wraps async operations to handle errors in a more elegant way.
 * Instead of using try-catch blocks everywhere, this function returns an object containing
 * either the successful result or an error.
 *
 * @example
 * // Using with a Promise
 * const { data, error } = await tryCatch(fetchUserData());
 * if (error) {
 *   // Handle error
 *   return;
 * }
 * // Use data
 *
 * @example
 * // Using with a function
 * const { data, error } = await tryCatch(() => {
 *   // Some async operation
 *   return fetchUserData();
 * });
 *
 * @template T The type of the successful result
 * @template E The type of the error (defaults to Error)
 * @param promise Either a Promise or a function that returns a value
 * @returns An object containing either { data, error: null } for success or { data: null, error } for failure
 */
export async function tryCatch<T, E = Error>(promise: PromiseOrFunction<T>): Promise<Result<T, E>> {
  try {
    const data = typeof promise === "function" ? await promise() : await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}
