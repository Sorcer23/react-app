import React from "react";
import { withFormik, Field } from "formik";

import Icon, { ICON_NAMES } from "components/Icon";

function ChatSendForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="chat-footer__inner">
        <Field
          className="chat-input"
          placeholder="Type your message"
          type="text"
          name="message"
          component="input"
        />
        <button className="button-chat-send" type="submit">
          <Icon name={ICON_NAMES.messageSend} />
        </button>
      </div>
    </form>
  );
}

export default withFormik({
  displayName: "chatMessage",

  mapPropsToValues: props => ({
    message: ""
  }),

  handleSubmit: async (values, formikBag) => {
    const message = values.message.trim();

    if (message.length === 0) return;

    formikBag.resetForm();
    formikBag.props.onSubmit(message);
  }
})(ChatSendForm);
