export type ErrorFetcher = {
  error: any;
  message: string;
};

const fetcher = async (
  ...args: Parameters<typeof fetch>
): Promise<any | Error> => {
  args[0] = `${process.env.NEXT_PUBLIC_WEB_URI}${args[0]}`;
  return fetch(...args)
    .then()
    .then((response) => {
      if (response.status === 204) {
        return Promise.resolve();
      } else if (!response.ok) {
        return Promise.reject({
          message: response.statusText,
          error: response.status,
        });
      }
      return response.json();
    })
    .catch((error) => Promise.reject(error));
};
export default fetcher;
