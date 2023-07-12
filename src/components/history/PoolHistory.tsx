import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { POOL_HISTORY_TABLE_HEADERS } from "../../Data/TableHeaders";
import Image from "react-bootstrap/Image";
import {
  AddCommas,
  formatAsPercent,
} from "../../Utils/NumberFormattingFunctions";
import "../../style.css";
import { HistoryInfo } from "./CallHistoryAPI";
import { BONUS_APY, POOL_HISTORY, STANDARD_APY } from "../../Data/Constants";

/**
 * Pool History
 */
const PoolHistory = () => {
  const [HistoryData, setHistoryData] = useState<any>();

  /**
   * This is used to call the function which manipulates the History data fetched from API
   */
  useEffect(() => {
    const data = HistoryInfo();
    setHistoryData(data);
  }, []);

  return (
    <>
      <div className="main-body container-true p-4">
        <div className="my-5 bg-white mx-2 rounded-5 p-5">
          <div className="text-start mb-5">
            <h3 className="lh-sm">{POOL_HISTORY}</h3>
          </div>
          <Table responsive>
            <thead>
              <tr>
                {POOL_HISTORY_TABLE_HEADERS.map((heading) => (
                  <th key={heading.id}>
                    <h4>{heading.name}</h4>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HistoryData?.map((item: any) => {
                return (
                  <tr key={item.id} className="bg-light">
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
                              {STANDARD_APY} :&nbsp;
                            </h4>
                            <h4>{formatAsPercent(item.standardAPY)}</h4>
                          </div>
                          <div className="d-flex">
                            <h4 className="lh-sm text-muted ">
                              {BONUS_APY} :&nbsp;
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
