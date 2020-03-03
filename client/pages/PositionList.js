import React, { Component } from "react";
import { connect } from "react-redux";
import { css } from "@emotion/core";
import { FadeLoader } from "react-spinners";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import positionsAction from "../actions/positionsAction";
import AlertMessage from "../layout/AlertMessage";

import SweetAlert from "react-bootstrap-sweetalert";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";
class PositionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: []
    };
    this.baseState = this.state;
  }
  reset() {
    this.setState(this.baseState);
  }
  componentDidMount() {
    const positions = this.props.positions.positions;
    this.setState({ positions: positions });
  }
  renderPosition(positions) {
    const positionJsx = positions.map((item, index) => (
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>{item.title}</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <ul>
            <li style={{ paddingBottom: 10 }}>
              Department: &nbsp; {item.department}
            </li>
            <li style={{ paddingBottom: 10 }}>
              Description: &nbsp; {item.description}
            </li>
          </ul>
          {item.status == "Open" && <button>Apply Now!</button>}
          {item.status == "Closed" && (
            <h3 style={{ color: "red" }}>
              This position is closed now, please try again later!
            </h3>
          )}
        </AccordionItemPanel>
      </AccordionItem>
    ));
    return (
      <Accordion allowMultipleExpanded={true} allowZeroExpanded={true}>
        {positionJsx}
      </Accordion>
    );
  }
  render() {
    const { title, department, description, status, validate } = this.state;
    //console.log(this.state.positions);
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
        <h1>Positions</h1>
        {this.renderPosition(this.state.positions)}
      </div>
    );
  }
}
export default connect(state => ({
  positions: state.positions
}))(PositionList);
