import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "@emotion/core";
import { FadeLoader } from "react-spinners";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import positionsAction from "../actions/positionsAction";
import AlertMessage from "../layout/AlertMessage";
import { NavLink } from "react-router-dom";
import logo from "../public/jocallio/image/logo.png";
import loginimage from "../public/jocallio/image/loginimage.png";

import {
  Textbox,
  Textarea,
  Radiobox,
  Checkbox,
  Select
} from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.css";
import "./styles.css";
import DatePicker from "react-datepicker";
import SweetAlert from "react-bootstrap-sweetalert";
import "react-datepicker/dist/react-datepicker.css";
import { STATUS_OPTIONS_LIST } from "./consts.js";
class PositionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      title: "",
      department: "",
      number: "",
      description: "",
      status: "Open",
      hasNameError: true,
      hasDepartmentError: true,
      hasDescriptionError: true,
      hasMovieError: true,
      validate: false,
      createDate: new Date()
    };
    this.baseState = this.state;
    this.validateForm = this.validateForm.bind(this);
    this.showsSuccessAlert = this.showsSuccessAlert.bind(this);
    this.reset = this.reset.bind(this);
  }
  reset() {
    this.setState(this.baseState);
  }
  toggleValidating(validate) {
    this.setState({ validate });
  }

  validateForm(type) {
    //e.preventDefault();
    this.toggleValidating(true);

    const {
      title,
      department,
      description,
      status,
      createDate,
      hasNameError,
      hasDepartmentError,
      hasDescriptionError,
      hasMovieError
    } = this.state;
    if (!hasNameError && !hasDescriptionError && !hasDepartmentError) {
      const { dispatch } = this.props;
      var object = {
        title: title,
        department: department,
        description: description,
        status: status,
        createDate: createDate
      };

      dispatch(positionsAction.addposition(object));

      if (type == "save") {
        this.props.history.push("/PositionList");
      } else {
        this.reset();
        this.showsSuccessAlert("Success", "Position Saved Successfully");
      }
    }
  }
  showsSuccessAlert = (heading, message) => {
    this.setState({
      alert: {
        type: "success",
        heading: heading,
        message: message
      }
    });
  };
  hideAlert = () => {
    this.setState({
      alert: null
    });
  };
  render() {
    const { title, department, description, status, validate } = this.state;
    const rowStyle = {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      padding: "2%",
      fontSize: "14px"
    };
    const rowWrapperStyle = {
      display: "table",
      width: "100%"
    };
    const rowContainerStyle = {
      display: "table-cell",
      verticalAlign: "middle",
      borderBottom: "1px solid #e5e5e5"
    };
    const labelStyle = {
      display: "inline-block"
    };
    const labelContentStyle = {
      verticalAlign: "middle"
    };

    // let statusItem;
    // status_OPTIONS_LIST.filter(i => {
    //   if (String(i.id) == String(status)) {
    //     statusItem = i;
    //   }
    // });

    return (
      <div
        style={{
          padding: "10px",
          width: "80%",
          margin: "0 auto"
        }}
      >
        {this.state.alert && (
          <AlertMessage
            type={this.state.alert.type}
            heading={this.state.alert.heading}
            message={this.state.alert.message}
          />
        )}
        <h1>Create Position</h1>
        <form onSubmit={this.validateForm.bind(this, "save")}>
          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                >
                  <span
                    className="icon icon-person"
                    style={{ ...labelContentStyle, fontSize: "20px" }}
                  />
                  &nbsp;
                  <span style={labelContentStyle}>Title</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Textbox
                    attributesWrapper={{}}
                    attributesInput={{
                      id: "Title",
                      name: "Title",
                      type: "text",
                      placeholder: "Place your Title here ^-^"
                    }}
                    value={title} // Optional.[String].Default: "".
                    disabled={false} // Optional.[Bool].Default: false.
                    validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                    validationCallback={res =>
                      this.setState({ hasNameError: res, validate: false })
                    } // Optional.[Func].Default: none. Return the validation result.
                    classNameInput="" // Optional.[String].Default: "".
                    classNameWrapper="" // Optional.[String].Default: "".
                    classNameContainer="" // Optional.[String].Default: "".
                    customStyleInput={{}} // Optional.[Object].Default: {}.
                    customStyleWrapper={{}} // Optional.[Object].Default: {}.
                    customStyleContainer={{}} // Optional.[Object].Default: {}.
                    onChange={(title, e) => {
                      this.setState({ title });
                    }} // Required.[Func].Default: () => {}. Will return the value.
                    onBlur={e => {}} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                    // onFocus={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                    // onClick={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                    validationOption={{
                      title: "Title", // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
                      check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                      required: true // Optional.[Bool].Default: true. To determin if it is a required field.
                      // type: 'string', // Optional.[String].Default: "string". Validation type, options are ['string', 'number', 'alphanumeric', 'alpha'].
                      // showMsg: true, // Optional.[Bool].Default: true. To determin display the error message or not.
                      // min: 2, // Optional.[Number].Default: 0. Validation of min length when validationOption['type'] is string, min amount when validationOption['type'] is number.
                      // max: 10, // Optional.[Number].Default: 0. Validation of max length when validationOption['type'] is string, max amount when validationOption['type'] is number.
                      // length: 2, // Optional.[Number].Default: 0. Validation of exact length of the value.
                      // compare: '3', // Optional.[String].Default: "" Compare this value to 3 to see if they are equal.
                      // reg: /^\d{18}|\d{15}$/, // Optional.[Bool].Default: "" Custom regex.
                      // regMsg: 'failed in reg.test(${value})', // Optional.[String].Default: "" Custom regex error message.
                      // locale: 'en-US', // Optional.[String].Default: "en-US". For error message display. Current options are ['zh-CN', 'en-US']; Default is 'en-US'.
                      // msgOnError: "Your custom error message if you provide the validationOption['msgOnError']", // Optional.[String].Default: "" Show your custom error message no matter what when it has error if it is provied.
                      // msgOnSuccess: "Your custom success message if you provide the validationOption['msgOnSuccess']. Otherwise, it will not show, not even green border." // Optional.[String].Default: "". Show your custom success message no matter what when it has error if it is provied.
                      // customFunc: res => { // Optional.[Func].Default: none. Custom function. Returns true or err message
                      //   if (res != 'milk') {
                      //     return 'Name cannot be other things but milk';
                      //   }
                      //   return true;
                      // }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                >
                  <span
                    className="icon icon-person"
                    style={{ ...labelContentStyle, fontSize: "20px" }}
                  />
                  &nbsp;
                  <span style={labelContentStyle}>Department</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Textbox
                    attributesWrapper={{}}
                    attributesInput={{
                      id: "Department",
                      name: "Department",
                      type: "text",
                      placeholder: "Place your Department here ^-^"
                    }}
                    value={department} // Optional.[String].Default: "".
                    disabled={false} // Optional.[Bool].Default: false.
                    validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                    validationCallback={res =>
                      this.setState({
                        hasDepartmentError: res,
                        validate: false
                      })
                    } // Optional.[Func].Default: none. Return the validation result.
                    classNameInput="" // Optional.[String].Default: "".
                    classNameWrapper="" // Optional.[String].Default: "".
                    classNameContainer="" // Optional.[String].Default: "".
                    customStyleInput={{}} // Optional.[Object].Default: {}.
                    customStyleWrapper={{}} // Optional.[Object].Default: {}.
                    customStyleContainer={{}} // Optional.[Object].Default: {}.
                    onChange={(department, e) => {
                      this.setState({ department });
                    }} // Required.[Func].Default: () => {}. Will return the value.
                    onBlur={e => {}} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                    // onFocus={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                    // onClick={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                    validationOption={{
                      title: "Department", // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
                      check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                      required: true // Optional.[Bool].Default: true. To determin if it is a required field.
                      // type: 'string', // Optional.[String].Default: "string". Validation type, options are ['string', 'number', 'alphanumeric', 'alpha'].
                      // showMsg: true, // Optional.[Bool].Default: true. To determin display the error message or not.
                      // min: 2, // Optional.[Number].Default: 0. Validation of min length when validationOption['type'] is string, min amount when validationOption['type'] is number.
                      // max: 10, // Optional.[Number].Default: 0. Validation of max length when validationOption['type'] is string, max amount when validationOption['type'] is number.
                      // length: 2, // Optional.[Number].Default: 0. Validation of exact length of the value.
                      // compare: '3', // Optional.[String].Default: "" Compare this value to 3 to see if they are equal.
                      // reg: /^\d{18}|\d{15}$/, // Optional.[Bool].Default: "" Custom regex.
                      // regMsg: 'failed in reg.test(${value})', // Optional.[String].Default: "" Custom regex error message.
                      // locale: 'en-US', // Optional.[String].Default: "en-US". For error message display. Current options are ['zh-CN', 'en-US']; Default is 'en-US'.
                      // msgOnError: "Your custom error message if you provide the validationOption['msgOnError']", // Optional.[String].Default: "" Show your custom error message no matter what when it has error if it is provied.
                      // msgOnSuccess: "Your custom success message if you provide the validationOption['msgOnSuccess']. Otherwise, it will not show, not even green border." // Optional.[String].Default: "". Show your custom success message no matter what when it has error if it is provied.
                      // customFunc: res => { // Optional.[Func].Default: none. Custom function. Returns true or err message
                      //   if (res != 'milk') {
                      //     return 'Name cannot be other things but milk';
                      //   }
                      //   return true;
                      // }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                >
                  <span
                    className="icon icon-insert-drive-file"
                    style={{ ...labelContentStyle, fontSize: "20px" }}
                  />
                  &nbsp;
                  <span style={labelContentStyle}>Description</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Textarea
                    attributesWrapper={{}}
                    attributesInput={{
                      id: "description",
                      name: "description",
                      placeholder: "Place your Description here ^-^"
                      // maxLength: '10',
                      // cols: '10',
                      // rows: '10',
                    }}
                    value={description} // Optional.[String].Default: "".
                    disabled={false} // Optional.[Bool].Default: false.
                    // maxLength="10" // Optional.[String | Number].Default: 524288.
                    // cols="10" // Optional.[String | Number].Default: 2.
                    // rows="10" // Optional.[String | Number].Default: 2.
                    placeholder="Place your description here ^-^" // Optional.[String].Default: "".
                    validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                    validationCallback={res =>
                      this.setState({
                        hasDescriptionError: res,
                        validate: false
                      })
                    } // Optional.[Func].Default: none. Return the validation result.
                    classNameInput="" // Optional.[String].Default: "".
                    classNameWrapper="" // Optional.[String].Default: "".
                    classNameContainer="" // Optional.[String].Default: "".
                    customStyleInput={{}} // Optional.[Object].Default: {}.
                    customStyleWrapper={{}} // Optional.[Object].Default: {}.
                    customStyleContainer={{}} // Optional.[Object].Default: {}.
                    onChange={(description, e) => {
                      this.setState({ description });
                    }} // Required.[Func].Default: () => {}. Will return the value.
                    onBlur={e => {}} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                    // onFocus={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                    // onClick={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                    validationOption={{
                      name: "Description", // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
                      check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                      required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                      type: "string" // Optional.[String].Default: "string". Validation type, options are ['string', 'number'].
                      // showMsg: true, // Optional.[Bool].Default: true. To determin display the error message or not.
                      // locale: 'en-US', // Optional.[String].Default: "en-US". For error message display. Current options are ['zh-CN', 'en-US']; Default is 'en-US'.
                      // min: 2, // Optional.[Number].Default: 0. Validation of min length when validationOption['type'] is string, min amount when validationOption['type'] is number.
                      // max: 10, // Optional.[Number].Default: 0. Validation of max length when validationOption['type'] is string, max amount when validationOption['type'] is number.
                      // length: 2, // Optional.[Number].Default: 0. Validation of exact length of the value.
                      // reg: /^\d{18}|\d{15}$/, // Optional.[Bool].Default: "". Custom regex.
                      // regMsg: 'failed in reg.test(${value})', // Optional.[String].Default: "". Custom regex error message.
                      // msgOnError: "Your custom error message if you provide the validationOption['msgOnError']", // Optional.[String].Default: "". Show your custom error message no matter what when it has error if it is provied.
                      // msgOnSuccess: "Your custom success message if you provide the validationOption['msgOnSuccess']. Otherwise, it will not show, not even green border." // Optional.[String].Default: "". Show your custom success message no matter what when it has error if it is provied.
                      // customFunc: res => { // Optional.[Func].Default: none. Custom function. Returns true or err message
                      //   if (res != 'banana') {
                      //     return 'Description cannot be other things but banana';
                      //   }
                      //   return true;
                      // }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                >
                  <span
                    className="icon icon-bookmark"
                    style={{ ...labelContentStyle, fontSize: "20px" }}
                  />
                  &nbsp;
                  <span style={labelContentStyle}>status</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Select
                    attributesWrapper={{}}
                    attributesInput={{
                      id: "status",
                      status: "status"
                    }}
                    value={status} // Optional.[String].Default: "".
                    disabled={false} // Optional.[Bool].Default: false.
                    showSearch={true}
                    validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                    validationCallback={res =>
                      this.setState({ hasMovieError: res, validate: false })
                    } // Optional.[Func].Default: none. Return the validation result.
                    optionList={STATUS_OPTIONS_LIST} // Required.[Array of Object(s)].Default: [].
                    classNameSelect="" // Optional.[String].Default: "".
                    classNameWrapper="" // Optional.[String].Default: "".
                    classNameContainer="" // Optional.[String].Default: "".
                    classNameOptionListContainer="" // Optional.[String].Default: "".
                    classNameOptionListItem="" // Optional.[String].Default: "".
                    customStyleSelect={{}} // Optional.[Object].Default: {}.
                    customStyleWrapper={{}} // Optional.[Object].Default: {}.
                    customStyleContainer={{}} // Optional.[Object].Default: {}.
                    customStyleOptionListContainer={{
                      maxHeight: "200px",
                      overflow: "auto",
                      fontSize: "14px"
                    }} // Optional.[Object].Default: {}.
                    customStyleOptionListItem={{}} // Optional.[Object].Default: {}.
                    onChange={(res, e) => {
                      this.setState({ status: res.id });
                    }} // Optional.[Func].Default: () => {}. Will return the value.
                    onBlur={() => {}} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                    validationOption={{
                      name: "status", // Optional.[String].Default: "". To display in the Error message. i.e Please select a ${name}.
                      check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                      required: true // Optional.[Bool].Default: true. To determin if it is a required field.
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="datpickerConatiner"
            style={{ display: "table", width: "100%" }}
          >
            <div
              style={{
                display: "table-cell",
                verticalAlign: "middle",
                borderBottom: "1px solid rgb(229, 229, 229)"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  padding: "2%",
                  fontSize: "14px"
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    flex: " 3 3 0px",
                    marginTop: "3px"
                  }}
                >
                  <span
                    className="icon icon-bookmark"
                    style={{ verticalAlign: "middle", fontSize: "20px" }}
                  ></span>
                  &nbsp;
                  <span style={{ verticalAlign: "middle" }}>Create Date</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <DatePicker
                    className="react-inputs-validation__textbox__input___20hDL"
                    selected={this.state.createDate}
                    onChange={res => {
                      this.setState({ createDate: res });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: "10px" }} />
          <div style={rowWrapperStyle}>
            <div
              className={`my-button my-button__red save-button`}
              onClick={this.validateForm.bind(this, "save")}
            >
              Save
            </div>
            <div
              className={`my-button my-button__red save-button`}
              onClick={this.validateForm.bind(this, "add_another")}
            >
              Save and Add Another
            </div>
            <input type="submit" style={{ display: "none" }} />
          </div>
        </form>
      </div>
    );
  }
}
export default connect(state => ({
  account: state.account,
  auth: state.auth,
  cartItems: state.cartItems
}))(PositionForm);
