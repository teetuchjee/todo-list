import validator from "validator";

export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export const isSubDomain = (url) => {
  var regex = new RegExp(/^([a-z]+\:\/{2})?([\w-]+\.[\w-]+\.\w+)$/);
  return !!url.match(regex);
};

export const formValidator = (data, required) => {
  let pass = true;
  let res = {};
  for (var i in required) {
    let success = true;
    let message = "";
    switch (required[i]) {
      case "text":
        success = !isEmpty(data[i]);
        message = !success && "Please enter.";
        break;
      case "nullable":
        success = !isEmpty(data[i]);
        message = !success && "Please enter.";
        break;
      case "email":
        success = validator.isEmail(data[i]);
        message = !success && "Please enter email address.";
        break;
      case "float":
        if (!isEmpty(data[i])) {
          success = validator.isFloat(data[i]);
          message = !success && "Please enter number only.";
        } else {
          success = false;
          message = !success && "Please enter.";
        }
        break;
      case "number":
        if (!isEmpty(data[i])) {
          success = validator.isInt(data[i]);
          message = !success && "Please enter number only.";
        } else {
          success = false;
          message = !success && "Please enter.";
        }
        break;
      case "selected":
        success = data[i] !== null && data[i] !== "";
        message = !success && "Please select.";
        break;
    }

    if (!success) {
      pass = false;
    }
    res[i] = { success, message };
  }
  return { pass, response: res };
};
