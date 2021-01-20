import React, { Fragment } from "react";

import Table from "../../components/table/Table";

import Button from "../../components/button/Button";

import { Panel } from "../../components/panel";

import { TodoListState, TodoListDispatch } from "../../context";

import alert from "../../utils/alert";

const History = (props) => {
  const data = TodoListState();
  const dispatch = TodoListDispatch();

  return (
    <Fragment>
      <Panel>
        <div className="w-full flex mb-3">
          <div className="tl:flex-1 md:ml-auto">
            <Button
              marginTop="0px"
              onClick={() => {
                alert.confrim("Remove history log success.", () =>
                  dispatch({ type: "REMOVE_HISTORY" })
                );
              }}
            >
              Clear History
            </Button>
          </div>
        </div>
        <Table
          columns={[
            {
              Header: "DATE TIME",
              accessor: "timeStamp",
              Cell: ({ row, cell }) => (
                <div className="cell flex">{cell.value}</div>
              ),
              disableSorting: true,
            },
            {
              Header: "ACTION",
              accessor: "action",
              Cell: ({ row, cell }) => (
                <div className="cell flex">{cell.value}</div>
              ),
              disableSorting: true,
            },
            {
              Header: "DETAIL",
              accessor: "detail",
              Cell: ({ row, cell }) => (
                <div className="cell flex spce-x-3">{cell.value}</div>
              ),
              disableSorting: true,
            },
          ]}
          data={data.history}
        />
      </Panel>
    </Fragment>
  );
};

export default History;
