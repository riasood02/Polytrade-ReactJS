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

const baseURLHistory = "https://api.polytrade.app/auth/pool-history?page=1";
export const HistoryFetchData = fetch(baseURLHistory, {
  method: "GET",
})
  .then((data) => {
    const res = data.json();
    return res;
  })
  .catch((e) => {
    throw e;
  });
// export const apiHandler = async (
//   method,
//   url,
//   headers = {},
//   requestBody = {},
//   isV1 = false,
// ) => {
//   try {
//     const Headers = {
//       'Content-Type': 'application/json',
//     };
//     const baseURL = `${
//       isV1 ? ENV_CONSTANTS.API_V1_SERVER_URL : ENV_CONSTANTS.API_SERVER_URL
//     }${url}`;
//     const data = {
//       method,
//       url: baseURL,
//       headers: {
//         ...Headers,
//         ...headers,
//       },
//       data: JSON.stringify(requestBody),
//     };
//     return axios(data)
//       .then(response => response.data)
//       .then(response => {
//         switch (response.code) {
//           case RESPONSE_CODES.SUCCESS:
//             return HELPERS.responseHandler(response);
//           case RESPONSE_CODES.UNAUTHORIZED:
//           case RESPONSE_CODES.BAD_REQUEST:
//             return false;
//           default:
//             return HELPERS.responseHandler(response);
//         }
//       })
//       .catch(error => error);
//   } catch (error) {
//     return error;
//   }
// };

// export const getPoolHistory = async (pageNumber:number) => {
//   try {
//     const url = `/auth/pool-history?page=${pageNumber}`;
//     return await apiHandler(REQUEST_METHODS.GET, url, {}, {}, true);
//   } catch {
//     return COMMON.EMPTY_ARRAY;
//   }
// };
