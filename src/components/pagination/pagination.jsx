import React from "react";
import { Pagination, Col, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
// import { withRouter } from 'react-router-dom';
import qstr from "query-string";

import "./pagination.css";

class PaginationComponent extends React.Component {
  handlePageClick = () => {
    window.scrollTo(0, 0);
  }

  itemRender = (current, type) => {
    const { location: { pathname, search } } = this.props;
    let params = "";
    const searchParam = qstr.parse(search);
    delete searchParam.page;

    if (Object.entries(searchParam).length === 0) {
      params = "";
    } else {
      params = `&${qstr.stringify(searchParam)}`;
    }

    switch (type) {
      case "page":
        return <Link to={`${pathname}?page=${current}${params}`}>{current}</Link>;
      case "prev":
        return (
          <Link className="ant-pagination-item-link" to={`${pathname}?page=${current}${params}`}>
            <Icon type="left" />
          </Link>
        );
      case "next":
        return (
          <Link className="ant-pagination-item-link" to={`${pathname}?page=${current}${params}`}>
            <Icon type="right" />
          </Link>
        );
      case "jump-prev":
        return (
          <Link className="ant-pagination-item-link" to={`${pathname}?page=${current}${params}`}>
            <Icon type="double-left" />
          </Link>
        );
      case "jump-next":
        return (
          <Link className="ant-pagination-item-link" to={`${pathname}?page=${current}${params}`}>
            <Icon type="double-right" />
          </Link>
        );
      default:
        break;
    }
  }

  render() {
    const { total, current } = this.props;
    return (
      <Col span={24}>
        <Pagination
          hideOnSinglePage
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
