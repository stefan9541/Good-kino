import React from 'react';
import { Pagination, Col, Icon } from "antd"
import { Link } from "react-router-dom"
import { withRouter } from "react-router";
import qstr from "query-string";

import "./pagination.css"

class PaginationComponent extends React.Component {

  handlePageClick = (page) => {
    window.scrollTo(0, 0)
    // console.log(page)
    // const { history } = this.props
    // const { location: { pathname } } = this.props
    // history.push(`${pathname}?page=${page}`)

  }

  createParamsToHref = (objWithParams) => {
    let str = ""
    for (const key in objWithParams) {
      str += `&${key}=${objWithParams[key]}`
    }
    return str
  }

  itemRender = (current, type) => {
    const { location: { pathname, search } } = this.props;
    const searchParam = qstr.parse(search)
    delete searchParam.page;
    const params = this.createParamsToHref(searchParam);


    switch (type) {
      case "page":
        return <Link to={`${pathname}?page=${current}${params}`}>{current}</Link>
      case "prev":
        return <Link className="ant-pagination-item-link" to={`${pathname}?page=${current}${params}`}>
          <Icon type="left" />
        </Link>;
      case "next":
        return <Link className="ant-pagination-item-link" to={`${pathname}?page=${current}${params}`}>
          <Icon type="right" />
        </Link>;
      case "jump-prev":
        return <Link className="ant-pagination-item-link" to={`${pathname}?page=${current}${params}`}>
          <Icon type="double-left" />
        </Link>;
      case "jump-next":
        return <Link className="ant-pagination-item-link" to={`${pathname}?page=${current}${params}`}>
          <Icon type="double-right" />
        </Link>;
      default:
        break;
    }
  }

  render() {
    const { total, current } = this.props;
    return (
      <Col span={24}>
        <Pagination
          className="pagination-container"
          itemRender={this.itemRender}
          onChange={this.handlePageClick}
          defaultCurrent={1}
          total={total}
          current={current}
          pageSize={40}
        />
      </Col>
    );

  }
}

export default withRouter(PaginationComponent);