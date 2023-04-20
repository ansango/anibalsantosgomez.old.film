export * from "./middlewares";

/**
 * Fetches data from an API, and throws an error if the request failed.
 * fetcher is a generic function with one type parameter T.
 * It takes any arguments that fetch() takes, and returns a promise that
 * resolves to a value of type T.
 * @param {Parameters<typeof fetch>} args
 * @returns {Promise<T>}
 */

export const fetcher = async <T>(...args: Parameters<typeof fetch>) => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  const json = await response.json();
  return json as T;
};
