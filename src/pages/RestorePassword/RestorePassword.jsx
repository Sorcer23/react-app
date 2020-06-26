import React from "react";

import ROUTES from "config/routes";
import LangSelect from "components/LangSelect";
import Button from "components/Button";
import RequestRestore from "./RequestRestore";
import VerifyPhone from "./VerifyPhone";
import SetPassword from "./SetPassword";

function RestorePassword(props) {
  const { intl, restoreData, restoreStep, modals, closeModal } = props;

  return (
    <div className="wrapper">
      <main className="main main--authorization">
        <section className="authorization">
          <div className="authorization__background"></div>
          <div className=" authorization__inner">
            <div className="authorization__left-col">
              <div className="column-head">
                <LangSelect />
              </div>
              <div className="column-body">
                <h2 className="title title--light">Welcome Back!</h2>
                <h5 className="authorization__subtitle ">
                  Click here to see your favourite project saved with us.
                </h5>
                <Button to={ROUTES.signin}>
                  {intl.formatMessage({ id: "ui.actions.sign_in" })}
                </Button>
              </div>
            </div>

            {(restoreStep === "request" || restoreStep === "verify") && (
              <RequestRestore onRequestRestore={props.handleRequestRestore} />
            )}

            <VerifyPhone
              phone={restoreData.phone}
              isOpen={modals["verifyPhone"]}
              onRequestClose={() => closeModal("verifyPhone")}
              onVerify={props.handleVerify}
            />

            {restoreStep === "setPassword" && (
              <SetPassword onSetPassword={props.handleSetPassword} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default RestorePassword;
