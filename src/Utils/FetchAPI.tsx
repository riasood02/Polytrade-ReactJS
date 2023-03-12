import { BaseUrl } from "../Data/Urls";
export const APIFetchData = fetch(`${BaseUrl}invoice-funded`, {
  method: "GET",
})
  .then((data) => {
    const res = data.json();
    return res;
  })
  .catch((e) => {
    throw e;
  });
