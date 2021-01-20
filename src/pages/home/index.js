import React, { Fragment, useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { formValidator } from "../../utils/validator";
import { TodoListState, TodoListDispatch } from "../../context";
import { STATUS_OPTIONS } from "../../static";

import EditModal from "../../components/modal";

import TextInput from "../../components/input/TextInput";
import SelectComponent from "../../components/select/SelectComponent";

import { Panel, FilterPanel } from "../../components/panel";

import Table from "../../components/table/Table";

import Button from "../../components/button/Button";

import { Icon } from "react-icons-kit";
import { trash } from "react-icons-kit/iconic/trash";
import { ic_create } from "react-icons-kit/md/ic_create";

import alert from "../../utils/alert";

const validate = {
  todo: {
    success: true,
    message: "",
  },
  status: {
    success: true,
    message: "",
  },
};

const Home = (props) => {
  const data = TodoListState();
  const dispatch = TodoListDispatch();

  const [formData, setFormData] = useState({
    todo: "",
    status: "",
    selected_status: "",
  });

  const [todoList, setTodoList] = useState([]);

  const [formValidate, setFormValidate] = useState(validate);

  const [isEdit, setIsEdit] = useState({ data: {}, value: false });

  useEffect(() => {
    onSearch(data.filter.todo, data.filter.status);
  }, [data.history]);

  const onChangeInput = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeSelect = (selected, name, e) => {
    setFormData({ ...formData, [selected]: e, [name]: e.value });
  };

  const onSearch = (todo, status) => {
    let result = data.todoList.filter((e) =>
      status
        ? e.todo.includes(todo) && e.status == status
        : e.todo.includes(todo)
    );

    setTodoList(result);
  };

  const onClear = () => {
    setTodoList(data.todoList);
    dispatch({
      type: "CLEAR_FILTER",
    });
  };

  const onRemoveTodoList = (id) => {
    dispatch({
      type: "REMOVE",
      payload: id,
    });
  };

  const onSubmit = (e) => {
    let valid = formValidator(formData, {
      todo: "text",
      status: "text",
    });

    if (valid.pass) {
      let todoList = {
        uuid: uuidv4(),
        ...formData,
      };

      dispatch({
        type: "ADD",
        payload: todoList,
      });

      setFormData({ todo: "", status: "", selected_status: "" });
      setFormValidate(validate);
    } else {
      setFormValidate(valid.response);
    }
  };

  const { todo, selected_status } = formData;

  return (
    <Fragment>
      <FilterPanel>
        <div className="w-full flex space-x-3">
          <TextInput
            label="To do"
            name="todo"
            onChange={(e) => {
              e.preventDefault();
              dispatch({
                type: "ONCHANGE_INPUT",
                payload: e.target.value,
              });
            }}
            value={data.filter.todo}
          />
          <SelectComponent
            label="Status"
            onChange={(selected) =>
              dispatch({
                type: "ONCHANGE_SELECT",
                payload: {
                  selected_status: selected,
                  status: selected.value,
                },
              })
            }
            options={STATUS_OPTIONS}
            selected={data.filter.selected_status}
          />
        </div>
        <div className="flex w-full ">
          <div className="tl:flex-1 md:ml-auto flex tl:flex-col tl:space-y-3  md:space-x-3 mb-3">
            <FilterPanel.SearchButton
              onClick={() => onSearch(data.filter.todo, data.filter.status)}
            />
            <FilterPanel.ClearButton onClick={() => onClear()} />
          </div>
        </div>
      </FilterPanel>
      <Panel>
        <div className="w-full flex tl:flex-col tl:space-y-5  md:space-x-3 mt-3">
          <TextInput
            name="todo"
            onChange={onChangeInput}
            placeholder="To do task"
            value={todo}
            required={true}
            message={formValidate.todo.message && "Please enter to do task."}
          />
          <SelectComponent
            placeholder="Status"
            onChange={(selected) =>
              onChangeSelect("selected_status", "status", selected)
            }
            options={STATUS_OPTIONS}
            selected={selected_status}
            required={true}
            message={formValidate.status.message && "Please select status."}
          />
          <Button
            onClick={() => onSubmit()}
            className="normal-button add"
            marginTop="5px"
          >
            ADD
          </Button>
        </div>
        <Table
          columns={[
            {
              Header: "TO DO",
              accessor: "todo",
              Cell: ({ row, cell }) => (
                <div className="cell flex">{cell.value}</div>
              ),
              disableSorting: true,
            },
            {
              Header: "STATUS",
              accessor: "status",
              Cell: ({ row, cell }) => (
                <div className="cell flex">{cell.value}</div>
              ),
              disableSorting: true,
            },
            {
              Header: "ACTION",
              accessor: "",
              Cell: ({ row, cell }) => (
                <div className="cell flex spce-x-3">
                  <div className="action-icon">
                    <Icon
                      size={22}
                      icon={ic_create}
                      onClick={() =>
                        setIsEdit({
                          data: row.original,
                          value: true,
                        })
                      }
                    />
                  </div>
                  <div className="action-icon ml-3 ">
                    <Icon
                      size={18}
                      icon={trash}
                      onClick={() =>
                        alert.confrim("Remove to do task success.", () =>
                          onRemoveTodoList(row.original.uuid)
                        )
                      }
                    />
                  </div>
                </div>
              ),
              disableSorting: true,
            },
          ]}
          data={todoList}
        />
      </Panel>

      <EditModal
        show={isEdit.value}
        onHide={() => setIsEdit({ data: {}, value: false })}
        data={isEdit.data}
      />
    </Fragment>
  );
};

export default Home;
