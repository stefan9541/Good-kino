import React, { Component } from 'react';
import { Radio, Row, Col } from 'antd';
import { withRouter } from "react-router";
import qstr from "query-string";

import "./sorted-panel-movies.css"

class SortedPanelMovies extends Component {

  radioButtons = [
    { label: "По рейтингу imDb", value: "imdbRating" },
    { label: "По популяртности", value: "imdbVotes" },
    { label: "По алфавиту", value: "Title" }
  ]

  createParamsToHref = (objWithParams) => {
    let str = ""
    for (const key in objWithParams) {
      str += `&${key}=${objWithParams[key]}`
    }
    return str
  }

  handleChange = (e) => {
    const value = e.target.value;
    const { history } = this.props;
    const { location: { search, pathname } } = this.props;
    const parseParams = qstr.parse(search);

    delete parseParams.page;
    delete parseParams.sortedBy;

    const params = this.createParamsToHref(parseParams);
    history.push(`${pathname}?sortedBy=${value}${params}`)
  }

  render() {
    const { location: { search } } = this.props;
    const parseParams = qstr.parse(search);
    const defaultCheckedRadio = parseParams.sortedBy || "imdbRating"
    return (
      <Row id="sort-panel-wrapp">
        <Col className="sorted-panel-label" span={7}>
          <span>Сортировать по</span>
        </Col>
        <Col offset={1}>
          <Radio.Group defaultValue={defaultCheckedRadio} size="small" buttonStyle={"solid"}>
            {
              this.radioButtons.map(({ label, value }) => {
                return (
                  <Radio.Button onChange={this.handleChange} key={value} value={value}>
                    {label}
                  </Radio.Button>
                )
              })
            }
          </Radio.Group>
        </Col>
      </Row>
    );
  }
}

export default withRouter(SortedPanelMovies);