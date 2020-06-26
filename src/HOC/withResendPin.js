import React from "react";

import ApiService from "services/api";
import logger from "services/logger";

const TIME_TO_VERIFY = 60;

export default function withResendPin(Component) {
  return class ComponentWithResendPin extends React.Component {
    constructor() {
      super();
      this.state = {
        timeToVerify: TIME_TO_VERIFY
      };
    }

    componentDidMount() {
      this.startVerifyPeriod();
    }

    startVerifyPeriod() {
      this.setState({ timeToVerify: TIME_TO_VERIFY }, () => {
        const timer = setInterval(() => {
          if (this.state.timeToVerify === 0) {
            clearInterval(timer);
            return;
          }
          this.setTimeToVerify(this.state.timeToVerify - 1);
        }, 1000);
      });
    }

    setTimeToVerify(time) {
      this.setState({ timeToVerify: time });
    }

    resendPin = async () => {
      try {
        await ApiService.resendVerifyCode(
          this.props.phone,
          this.props.values.pin
        );
        this.startVerifyPeriod();
      } catch (error) {
        logger(error);
      }
    };

    render() {
      return (
        <Component
          {...this.props}
          resendPin={this.resendPin}
          timeToVerify={this.state.timeToVerify}
        />
      );
    }
  };
}
