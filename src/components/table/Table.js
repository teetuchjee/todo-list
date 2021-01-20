import React, { Fragment } from "react";

import { useTable, useSortBy } from "react-table";

import { Icon } from "react-icons-kit";
import { unsorted } from "react-icons-kit/fa/unsorted";
import { sortDesc } from "react-icons-kit/fa/sortDesc";
import { sortAsc } from "react-icons-kit/fa/sortAsc";

import "./table.css";

const Table = ({
  columns,
  data,
  onSorted,
  loading = true,
  type = null,
  currentSorted = { sort_column: null, sort_order: null },
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);
  return (
    <div className={`table-wrapp`}>
      <div className={type ? "tableFixHead setting" : "tableFixHead"}>
        <table className="table_cell" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th {...column.getHeaderProps()}>
                    <div className="flex flex-row">
                      {column.render("Header")}
                      {column.disableSorting ? (
                        ""
                      ) : (
                        <Fragment>
                          {column.canSort && (
                            <span
                              className="ml-2"
                              {...column.getSortByToggleProps()}
                            >
                              {currentSorted.sort_column === column.id &&
                              currentSorted.sort_order ? (
                                currentSorted.sort_column === column.id &&
                                currentSorted.sort_order == "DESC" ? (
                                  <div>
                                    <Icon
                                      icon={sortDesc}
                                      onClick={() =>
                                        onSorted({
                                          sort: "UNSORTED",
                                          data: column,
                                        })
                                      }
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    <Icon
                                      icon={sortAsc}
                                      onClick={() =>
                                        onSorted({ sort: "DESC", data: column })
                                      }
                                    />
                                  </div>
                                )
                              ) : (
                                <div>
                                  <Icon
                                    icon={unsorted}
                                    onClick={() =>
                                      onSorted({ sort: "ASC", data: column })
                                    }
                                  />
                                </div>
                              )}
                            </span>
                          )}
                        </Fragment>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {data.length == 0
              ? null
              : rows &&
                rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell, j) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      {data.length <= 0 ? (
        <div
          className="flex justify-center items-center"
          style={{
            minHeight: 60,
            fontWeight: 600,
          }}
        >
          DATA NOT FOUND
        </div>
      ) : null}
    </div>
  );
};

export default Table;
