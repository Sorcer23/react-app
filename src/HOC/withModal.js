import React from "react";
import { compose, withState, withReducer, withHandlers } from "recompose";

const withModal = (...formNames) => Component => {
  const isModalSingle = formNames.length === 0;

  function ComponentWithModal(props) {
    return <Component {...props} />;
  }

  return compose(
    isModalSingle
      ? withState("isModalOpen", "setModalOpen", false)
      : compose(
          withReducer(
            "modals",
            "dispatch",
            (state, action) => {
              switch (action.type) {
                case "OPEN": {
                  console.log(action);

                  return {
                    ...state,
                    [action.modal]: true
                  };
                }

                case "CLOSE": {
                  console.log(action);

                  return {
                    ...state,
                    [action.modal]: false
                  };
                }

                default:
                  return state;
              }
            },
            props => {
              return formNames.reduce((acc, name) => {
                acc[name] = false;
                return acc;
              }, {});
            }
          ),
          withHandlers({
            openModal: ({ dispatch }) => modal =>
              dispatch({ type: "OPEN", modal }),
            closeModal: ({ dispatch }) => modal =>
              dispatch({ type: "CLOSE", modal })
          })
        )
  )(ComponentWithModal);
};

export default withModal;
