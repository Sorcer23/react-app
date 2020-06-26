import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Notifications from "react-notification-system-redux";

class Notice extends Component {
  render() {
    const notifications = this.props.notifications.map(notice => ({
      ...notice,
      autoDismiss: notice.autoDismiss || 5
    }));

    const style = {
      NotificationItem: {
        DefaultStyle: {
          margin: "10px 5px 2px 1px"
        }
      }
    };

    return <Notifications notifications={notifications} style={style} />;
  }
}

Notice.propTypes = {
  notifications: PropTypes.array
};

export default connect(state => ({ notifications: state.notifications }))(
  Notice
);
