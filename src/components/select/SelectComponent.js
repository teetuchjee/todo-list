import React, { Component } from "react";
import Select from "react-select";

import DownArrow from "../../image/down.svg";

const IndicatorsContainer = () => (
  <img src={DownArrow} width="18px" height="18px" style={{ marginRight: 5 }} />
);

export default class SelectComponent extends Component {
  state = {
    selectedOption: null,
  };

  constructor(props) {
    super(props);
  }

  handleChange = (selected) => {
    if (this.props.onChange) {
      this.props.onChange(selected);
    }
  };

  render() {
    const {
      selected,
      options = [],
      placeholder = "Selecting here",
      isMulti,
      disabled,
      inputWidth,
      closeMenuOnSelect,
      label,
      required,
      message,
    } = this.props;

    return (
      <div className="input-wrapper flex-1">
        {label && (
          <div className="flex">
            <span className="input-label">{label}</span>
            {required && <span className="required">*</span>}
          </div>
        )}
        <Select
          isSearchable={true}
          className={"Select-menu-outer"}
          components={{
            ClearIndicator: null,
            IndicatorsContainer,
          }}
          placeholder={placeholder}
          value={this.props ? selected : ""}
          isMulti={isMulti}
          isDisabled={disabled}
          closeMenuOnSelect={closeMenuOnSelect}
          menuPlacement="auto"
          inputWidth={inputWidth}
          onChange={this.handleChange}
          styles={{
            control: (styles, res) => {
              return {
                ...styles,
                width: "100%",
                height: "40px",
                color: "#a9b2bf",
                marginTop: "8px",
                backgroundColor: "#fff",
                borderRadius: "4px",
                maxWidth: "100%",
                border: message ? "solid 1px #ff183c" : "solid 1px #e0e1f1",
                opacity: disabled ? 0.7 : 1,
                fontSize: "16px",
                fontWeight: 600,
              };
            },
            singleValue: (base) => ({
              ...base,
              color: "#000",
              fontSize: "16px",
              fontWeight: 600,
            }),
            input: (base) => ({
              ...base,
              minHeight: "100%",
              height: "100%",
              margin: "0px",
              padding: "0px",
              lineHeight: 1.3,
              color: "#000",
              border: "none",
              fontSize: "16px",
              fontWeight: 600,
              outline: "none",
            }),
            placeholder: (base) => ({
              ...base,
              marginTop: "0px",
              marginRight: "5px",
              fontSize: "16px",
              color: "#adadb7",
              lineHeight: 1.3,
              whiteSpace: "pre",
              textOverflow: "ellipsis",
            }),
            option: (styles, { isSelected }) => {
              return {
                ...styles,
                height: "auto",
                backgroundColor: isSelected ? "#828eeb" : null,
                color: isSelected ? "#FFF" : "#000",
                fontWeight: 600,
              };
            },
            menu: (base) => ({
              ...base,
              marginTop: "4px",
            }),
            menuList: (base) => {
              return {
                ...base,
                marginTop: "0px",
                paddingBottom: "0px",
                paddingTop: "0px",
                fontSize: "16px",
                border: `1px solid #e4e4e7`,
              };
            },
            multiValue: (base) => {
              return {
                ...base,
                backgroundColor: "#3bb2e8",
                color: "#fff",
                borderRadius: "6px",
                padding: "0px 1px 0px 2px",
              };
            },
            multiValueLabel: (base) => {
              return {
                ...base,
                color: "#fff",
                fontSize: "16px",
                margin: "0px",
                padding: "0px",
                fontWeight: "normal",
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: "normal",
                letterSpacing: "normal",
              };
            },
            multiValueRemove: (base) => {
              return {
                ...base,
                ":hover": {
                  backgroundColor: "#3bb2e8",
                  color: "#fff",
                },
              };
            },
          }}
          options={options}
        />
        {message && <div className="error-message">{message}</div>}
      </div>
    );
  }
}
