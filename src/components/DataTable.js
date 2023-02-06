import React from "react";
import { BsArrowDownUp } from "react-icons/bs";

function DataTable({
  tableData = [],
  columns = [],
  actions = [],
  handleSorting,
  children,
}) {
  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md ">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 ">
          <thead className="bg-blue-100">
            <tr>
              {columns.map((coloum) => {
                return (
                  <th
                    scope="col"
                    className="p-4 whitespace-nowrap font-medium text-gray-900"
                    key={coloum.value}
                  >
                    {coloum.heading}
                    {coloum.isSorting && (
                      <BsArrowDownUp
                        className="w-3 h-4 ml-1 inline-block cursor-pointer"
                        onClick={() => handleSorting(coloum)}
                      />
                    )}
                  </th>
                );
              })}

              <th scope="col" className="px-2 py-4 font-medium text-gray-900" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100 ">
            {tableData.length > 0 ? tableData.map((row, i) => {
              return (
                <tr className="hover:bg-blue-50" key={i}>
                  {columns.map((coloum) => {
                    return (
                      <td className="p-4" key={coloum.value}>
                        {Array.isArray(row[coloum.value])
                          ? row[coloum.value].join(", ")
                          : row[coloum.value]}
                      </td>
                    );
                  })}
                  {actions.length > 0 && (
                    <td className="p-4">
                      <div className="flex justify-end gap-4">
                        {actions.map((action, i) => {
                          return (
                            <span key={i} onClick={() => action.action(row)}>
                              {action.icon || action.label}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                  )}
                </tr>
              );
            }):<td className="p-4 text-center" colSpan={columns.length+1}> No Data </td>}
          </tbody>
        </table>
      </div>
      {children}
    </>
  );
}

export default DataTable;
