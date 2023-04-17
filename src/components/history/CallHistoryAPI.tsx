import dateFormat from "dateformat";
import { APIFetcher } from "../../Utils/FetchAPI";
import { BaseUrl } from "../../Data/Urls";

export const HistoryInfo = () => {
  var data: any = [];
  APIFetcher(`${BaseUrl}auth/pool-history?page=1`).then((res) => {
    const len = res.data.length;
    for (var i = 0; i < len; i++) {
      var item = {
        id: NaN,
        symbol: "",
        url: "",
        bonusAPY: NaN,
        standardAPY: NaN,
        APR: NaN,
        endDate: "",
        poolLimit: NaN,
        isClosed: Boolean,
      };
      item.id = i;
      item.symbol = res.data[i].coin_id.symbol;
      item.url = res.data[i].coin_id.image;
      item.bonusAPY = res.data[i].bonus_apy;
      item.standardAPY = res.data[i].percentage;
      item.APR = item.bonusAPY + item.standardAPY;
      item.endDate = dateFormat(res.data[i].end_date, "dS mmmm yyyy");
      item.poolLimit = res.data[i].max_amount;
      item.isClosed = res.data[i].is_closed;
      data.push(item);
    }
  });
  return data;
};
