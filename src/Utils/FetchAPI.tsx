/**
 * API GET Method
 * @param {string} url url for api fetching
 */

export const APIFetcher = (url: string) => {
  return fetch(url, {
    method: "GET",
  })
    .then((data) => {
      const res = data.json();
      return res;
    })
    .catch((e) => {
      throw e;
    });
};
