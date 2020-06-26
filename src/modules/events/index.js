import io from "socket.io-client";
import produce from "immer";

import store from "store";
import AccountModule from "modules/account";
import ProviderAccountModule from "modules/providerAccount";
import NotificationsModule from "modules/notifications";

class Events {
  init(token) {
    this.socket = io("https://devcom.sinanhq.com", {
      // this.socket = io(
      //   'http://ec2-15-185-49-155.me-south-1.compute.amazonaws.com:9999',
      //   {
      transports: ["websocket"],
      query: `token=${token}`
    });

    // socket.on('connect', (socket) => {
    //   console.log(socket);
    // });

    this.socket.on("event", data => {
      switch (data.action) {
        case "new_message": {
          store.dispatch(
            NotificationsModule.notify({
              message: "You have received a new message"
            })
          );

          store.dispatch({
            type: "NOTIFICATION_RECEIVE",
            payload: { event: data }
          });

          break;
        }

        case "notification": {
          store.dispatch(
            NotificationsModule.notify({
              message: data.message
            })
          );

          this.handleNotificationByType(data.type);

          break;
        }
      }
    });
  }

  disconnect() {
    this.socket.disconnect();
  }

  handleNotificationByType(type) {
    switch (type) {
      case "service_provider_rejected":
      case "service_provider_published": {
        store.dispatch(AccountModule.getAccount());
        store.dispatch(ProviderAccountModule.getAccount());
        break;
      }
    }
  }
}

const initialState = {
  list: []
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case "NOTIFICATION_RECEIVE":
        draft.list.push(payload.event);
        break;
    }
  });

export default new Events();
export { reducer };
