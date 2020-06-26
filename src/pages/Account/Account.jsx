import React, { useEffect } from "react";

import Button from "components/Button";
import PageAlert from "components/PageAlert";
import UserAccountForm from "./UserAccountForm";
import ProviderAccountForm from "./ProviderAccountForm";

function Account(props) {
  const {
    data,
    intl,
    isSubmitting,
    commonData,
    enableProviderForm,
    getUserData,
    getProviderData,
    handleSubmit,
    handleReset
  } = props;

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (enableProviderForm) {
      getProviderData();
    }
  }, [enableProviderForm]);

  return (
    <main className="main">
      <section className="data">
        <div className="container data__inner">
          {data.rejectReason && (
            <PageAlert title="Admin notes" htmlContent={data.rejectReason} />
          )}
          <form
            onSubmit={handleSubmit}
            onKeyDown={event => {
              if ((event.charCode || event.keyCode) === 13) {
                event.preventDefault();
              }
            }}
          >
            <div className="data__head">
              <h1 className="section-title">
                {intl.formatMessage({ id: "ui.profile.profile_details" })}
              </h1>
              <div className="buttons-wrap">
                <Button className="btn--light" onClick={handleReset}>
                  {intl.formatMessage({ id: "ui.actions.cancel" })}
                </Button>
                <Button type="submit" showLoader={isSubmitting}>
                  {intl.formatMessage({ id: "ui.actions.save" })}
                </Button>
              </div>
            </div>
            <UserAccountForm commonData={commonData} />
            {enableProviderForm && (
              <ProviderAccountForm commonData={commonData} />
            )}
            <div className="data__bottom">
              <div className="buttons-wrap">
                <Button className="btn--light" onClick={handleReset}>
                  {intl.formatMessage({ id: "ui.actions.cancel" })}
                </Button>
                <Button type="submit" showLoader={isSubmitting}>
                  {intl.formatMessage({ id: "ui.actions.save" })}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Account;
