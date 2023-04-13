import React from "react";

const HistoryRow = () => {
  return (
    <>
      <tr>
        <td>1</td>
        {Array.from({ length: 12 }).map((_, index) => (
          <td key={index}>Table cell {index}</td>
        ))}
      </tr>
    </>
  );
};

export default HistoryRow;
