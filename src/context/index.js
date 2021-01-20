import React, { useReducer, useContext } from "react";

import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const ToDoListContext = React.createContext();
const ToDoListDispatch = React.createContext();

const reducer = (state, action) => {
  let history = {
    uuid: uuidv4(),
    timeStamp: moment(new Date().toString()).format("DD/MM/YYYY HH:mm:ss"),
    detail: "",
    action: "",
  };
  switch (action.type) {
    case "ADD": {
      history.detail = `Add ${action.payload.todo}.`;
      history.action = "Add";

      state = {
        ...state,
        todoList: [...state.todoList, action.payload],
        history: [history, ...state.history],
      };
      break;
    }
    case "CHANGE": {
      let temp = state.todoList;
      let todoDetail = "";
      let statusDetail = "";

      let findIndex = state.todoList.findIndex(
        (todo) => todo.uuid == action.payload.uuid
      );

      if (temp[findIndex].todo !== action.payload.todo) {
        todoDetail = `Change to do from ${temp[findIndex].todo} to ${action.payload.todo}.`;
      }

      if (temp[findIndex].status !== action.payload.status) {
        statusDetail = `Change status ${temp[findIndex].todo} from ${temp[findIndex].status} to ${action.payload.status}.`;
      }

      history.detail = `${todoDetail} ${statusDetail} `;
      history.action = "Edit";

      temp[findIndex].todo = action.payload.todo;
      temp[findIndex].status = action.payload.status;
      temp[findIndex].selected_status = action.payload.selected_status;

      state = {
        ...state,
        todoList: temp,
        history:
          !todoDetail && !statusDetail
            ? state.history
            : [history, ...state.history],
      };
      break;
    }
    case "REMOVE": {
      let temp = state.todoList;

      let findIndex = state.todoList.findIndex(
        (todo) => todo.uuid == action.payload
      );

      history.detail = `Remove ${temp[findIndex].todo}.`;
      history.action = `Remove`;

      temp.splice(findIndex, 1);

      state = {
        ...state,
        todoList: temp,
        history: [history, ...state.history],
      };
      break;
    }
    case "REMOVE_HISTORY": {
      state = { ...state, history: [] };
      break;
    }
    case "ONCHANGE_INPUT": {
      state = { ...state, filter: { ...state.filter, todo: action.payload } };
      break;
    }
    case "ONCHANGE_SELECT": {
      state = {
        ...state,
        filter: {
          ...state.filter,
          status: action.payload.status,
          selected_status: action.payload.selected_status,
        },
      };
      break;
    }
    case "CLEAR_FILTER": {
      state = {
        ...state,
        filter: {
          todo: "",
          status: "",
          selected_status: "",
        },
      };
      break;
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
  return state;
};

export const TodoListProvider = ({ onInit, children }) => {
  const [state, dispatch] = useReducer(reducer, {
    todoList: [],
    history: [],
    filter: { todo: "", status: "", selected_status: "" },
  });

  if (onInit) {
    onInit(state);
  }

  return (
    <ToDoListDispatch.Provider value={dispatch}>
      <ToDoListContext.Provider value={state}>
        {children}
      </ToDoListContext.Provider>
    </ToDoListDispatch.Provider>
  );
};

function TodoListState() {
  const context = useContext(ToDoListContext);
  if (context === undefined) {
    throw new Error("useState must be used within a TodoListState");
  }
  return context;
}

function TodoListDispatch() {
  const context = useContext(ToDoListDispatch);

  if (context === undefined) {
    throw new Error("useState must be used within a TodoListDispatch");
  }
  return context;
}

export { TodoListState, TodoListDispatch };
