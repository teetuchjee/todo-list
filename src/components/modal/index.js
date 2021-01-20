import React, { useState, useEffect } from "react";

import { Modal } from "react-bootstrap";

import { STATUS_OPTIONS } from "../../static";

import { TodoListDispatch } from "../../context";

import { formValidator } from "../../utils/validator";

import TextInput from "../../components/input/TextInput";
import SelectComponent from "../../components/select/SelectComponent";

import Button from "../../components/button/Button";

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

const EditModal = (props) => {
  const { show, data, onHide } = props;

  const dispatch = TodoListDispatch();

  const [formData, setFormData] = useState({});
  const [formValidate, setFormValidate] = useState(validate);

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const onChangeInput = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeSelect = (selected, name, e) => {
    setFormData({ ...formData, [selected]: e, [name]: e.value });
  };

  const onSubmit = () => {
    let valid = formValidator(formData, {
      todo: "text",
      status: "text",
    });

    if (valid.pass) {
      dispatch({
        type: "CHANGE",
        payload: formData,
      });

      setFormData({ ...formData, todo: "", status: "", selected_status: "" });
      setFormValidate(validate);

      onHide();
      alert.success("Update to do task success.");
    } else {
      setFormValidate(valid.response);
    }
  };

  return (
    <Modal size="md" show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit to do list</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="w-full h-full flex flex-col space-y-3">
          <TextInput
            label="To do"
            name="todo"
            onChange={onChangeInput}
            value={formData.todo}
            required={true}
            message={formValidate.todo.message && "Please enter to do."}
          />
          <SelectComponent
            label="Status"
            onChange={(selected) =>
              onChangeSelect("selected_status", "status", selected)
            }
            options={STATUS_OPTIONS}
            selected={formData.selected_status}
            required={true}
            message={formValidate.status.message && "Please select status."}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="w-full h-full flex ">
          <div className="tl:flex-1 md:ml-auto flex tl:flex-col tl:space-y-3  md:space-x-3 mb-3">
            <Button onClick={() => onSubmit()} marginTop="16px">
              SAVE
            </Button>

            <Button
              onClick={() => onHide()}
              className="clear-button"
              marginTop="16px"
            >
              CANCEL
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
