import React, { Component } from "react";
import { Radio, Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import qstr from "query-string";

import "./sorted-panel-movies.css";

class SortedPanelMovies extends Component {
  radioButtons = [
    { label: "По рейтингу imDb", value: "imdbRating" },
    { label: "По популяртности", value: "imdbVotes" },
    { label: "По алфавиту", value: "Title" }
  ];

  handleChange = e => {
    const { value } = e.target;
    const { history } = this.props;
    const {
      location: { search, pathname }
    } = this.props;
    const parseParams = qstr.parse(search);
    let params = `&${qstr.stringify(parseParams)}`;

    delete parseParams.page;
    delete parseParams.sortedBy;

    if (Object.entries(parseParams).length === 0) {
      params = "";
    } else {
      params = `&${qstr.stringify(parseParams)}`;
    }

    history.push(`${pathname}?sortedBy=${value}${params}`);
  };

  render() {
    const {
      location: { search }
    } = this.props;
    const parseParams = qstr.parse(search);
    const defaultCheckedRadio = parseParams.sortedBy || "imdbRating";
    return (
      <Row id="sort-panel-wrapp">
        <Col className="sorted-panel-label" span={7}>
          <span>Сортировать по</span>
        </Col>
        <Col offset={1}>
          <Radio.Group
            defaultValue={defaultCheckedRadio}
            size="small"
            buttonStyle="solid"
          >
            {this.radioButtons.map(({ label, value }) => {
              return (
                <Radio.Button
                  onChange={this.handleChange}
                  key={value}
                  value={value}
                >
                  {label}
                </Radio.Button>
              );
            })}
          </Radio.Group>
        </Col>
      </Row>
    );
  }
}

export default withRouter(SortedPanelMovies);
