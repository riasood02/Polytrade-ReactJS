import { BaseUrl, BasecoinAPI } from "../Data/Urls";
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
export const PolytradeCurrentPrice = fetch(
  `${BasecoinAPI}coins/markets?vs_currency=usd&ids=polytrade`,
  {
    method: "GET",
  }
)
  .then((data) => {
    const res = data.json();
    return res;
  })
  .catch((e) => {
    throw e;
  });
