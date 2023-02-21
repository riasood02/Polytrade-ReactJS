import axios from "axios";
let xVal: string[] = [];
let yVal: Number[] = [];
var totalInv = 0;
/**
 * Async fubction for API fetching
 */
export const fetchData = async () => {
  const res = await axios.get("https://api.polytrade.app/invoice-funded");
  const apiData = res.data.data;
  /**
   * Sort the map based on key i.e Date
   * @param {object} a first item
   * @param {object} b second item
   * compares both the items and returns which is shorter
   */
  const sortbyDate = (a: any, b: any) => {
    return (
      new Date(a.disbursedDate).valueOf() - new Date(b.disbursedDate).valueOf()
    );
  };
  let chartValues = new Map();
  const len: Number = apiData.length;
  for (var i = 0; i < len; i++) {
    const d = new Date(apiData[i].disbursedDate);
    const dt = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    apiData[i].disbursedDate = dt;
    const invoice_amount = parseFloat(apiData[i].invoiceAmount);
    totalInv += invoice_amount;
    if (chartValues.has(apiData[i].disbursedDate) === true) {
      const initialInvoice = chartValues.get(apiData[i].disbursedDate);
      chartValues.set(
        apiData[i].disbursedDate,
        initialInvoice + invoice_amount
      );
    } else {
      chartValues.set(apiData[i].disbursedDate, invoice_amount);
    }
  }

  apiData.sort(sortbyDate);

  chartValues.forEach((values, keys) => {
    xVal.push(keys);
    yVal.push(values);
  });
  return totalInv;
};
fetchData();
export { xVal, yVal, totalInv };
