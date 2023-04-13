import React, { useEffect, useState } from "react";
import { Button, Col, Table } from "react-bootstrap";
import { POOL_HISTORY_TABLE_HEADERS } from "../../Data/TableHeaders";
import { HistoryFetchData } from "../../Utils/FetchAPI";
import Image from "react-bootstrap/Image";
import {
  AddCommas,
  addUSDC,
  formatAsPercent,
} from "../../Utils/NumberFormattingFunctions";
import dateFormat from "dateformat";
import "../../style.css";
import LightButton from "../../atoms/LightButton";
const PoolHistory = () => {
  const [HistoryData, setHistoryData] = useState<any>();
  useEffect(() => {
    HistoryFetchData.then((res) => {
      var data = [];
      for (var i = 0; i < res.data.length; i++) {
        var item = {
          symbol: "",
          url: "",
          bonusAPY: NaN,
          standardAPY: NaN,
          APR: NaN,
          endDate: "",
          poolLimit: NaN,
          isClosed: Boolean,
        };
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
      console.log(res.data);
      setHistoryData(data);
      // console.log(HistoryData);
    });
  }, []);
  return (
    <>
      <div className="main-body container-true p-4">
        <div className="my-5 bg-white mx-2 rounded-5 p-5">
          <div className="text-start mb-5">
            <h3 className="lh-sm">Pool History</h3>
          </div>
          <Table responsive>
            <thead>
              <tr>
                {POOL_HISTORY_TABLE_HEADERS.map((heading) => (
                  <th>
                    <h4>{heading.name}</h4>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HistoryData?.map((item: any) => {
                return (
                  <tr className="bg-light">
                    <td className="p-5">
                      <div>
                        <Image src={item.url} />
                        <h4 className="text-muted">{item.symbol}</h4>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="d-flex align-items-center gap-5">
                        <h4 className="APR vertical-align-middle">
                          {formatAsPercent(item.APR)}
                        </h4>
                        <div className="text-start">
                          <div className="d-flex">
                            <h4 className="lh-sm text-muted">
                              Standard APY :&nbsp;
                            </h4>
                            <h4>{formatAsPercent(item.standardAPY)}</h4>
                          </div>
                          <div className="d-flex">
                            <h4 className="lh-sm text-muted ">
                              Bonus APY :&nbsp;
                            </h4>
                            <h4>{formatAsPercent(item.bonusAPY)}</h4>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <h4 className="text-muted">{item.endDate}</h4>
                    </td>
                    <td className="p-4">
                      <h4 className="text-muted">
                        {AddCommas(item.poolLimit)}
                      </h4>
                    </td>
                    <td className="p-4">
                      <Button variant="default" className="statusButton">
                        {item.isClosed ? "Repaid" : "Open"}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default PoolHistory;
