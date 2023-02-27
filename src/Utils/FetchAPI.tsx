export const APIFetchData = fetch("https://api.polytrade.app/invoice-funded", {
  method: "GET",
})
  .then((data) => {
    const res = data.json();
    return res;
  })
  .catch((e) => {
    console.log("error", e);
  });
