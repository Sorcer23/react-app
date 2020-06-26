import React from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

import Icon, { ICON_NAMES } from "components/Icon";

const PagePagination = props => {
  const { perPage, total, onChange } = props;

  const page = props.page - 1;

  const pageCount = Math.ceil(total / perPage);

  const handlePageChange = event => {
    onChange(event.selected + 1);
  };

  if (!pageCount || pageCount === 1) return null;

  return (
    <div className="pagination">
      <ReactPaginate
        pageCount={pageCount}
        forcePage={page}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        containerClassName="pagination__list"
        pageClassName="page-item"
        breakClassName="pagination__break"
        pageLinkClassName="page-link"
        activeClassName="active"
        previousClassName="pagination__nav"
        previousLinkClassName="pagination__nav-btn"
        nextClassName="pagination__nav"
        nextLinkClassName="pagination__nav-btn"
        previousLabel={<Icon name={ICON_NAMES.ancleLeft} />}
        nextLabel={<Icon name={ICON_NAMES.ancleRight} />}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

PagePagination.propTypes = {
  pageCount: PropTypes.number,
  total: PropTypes.number,
  perPage: PropTypes.number,
  page: PropTypes.number,
  onChange: PropTypes.func
};

export default PagePagination;
