import React from "react";

import Rating from "components/Rating";
import formatDate from "utils/formatDate";

function Reviews(props) {
  const { list } = props;

  return (
    <div className="user-reviews">
      {list.map(review => (
        <div key={review.id} className="user-review">
          <div className="user-review__rate-circle">
            <Rating value={review.rating} />
          </div>
          <div className="user-review__body">
            <div className="user-review__author">{`${review.user.firstName} ${review.user.lastName}`}</div>
            <div className="user-review__date">
              {formatDate(review.updatedAt)}
            </div>
            <div className="user-review__text">{review.review}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
