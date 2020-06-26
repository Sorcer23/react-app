import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import ROUTES from "config/routes";
import PagePagination from "components/PagePagination";
import Icon, { ICON_NAMES } from "components/Icon";
import Button from "components/Button";
import Preloader from "components/Preloader";
import OwnRequest from "./OwnRequest";
import IncomingRequest from "./IncomingRequest";
import StatusesFilter from "./StatusesFilter";

function ServiceRequestList(props) {
  const {
    intl,
    isServiceProvider,
    handlePaginationChange,
    setOwnRequestsActive,
    setStatus
  } = props;
  const requests = props.list.data;
  const { pagination, isLoading, isCustomerView, status } = props.list;

  return (
    <main className="main">
      <section>
        <div className="container">
          <div className="row data__head justify-content-md-between ">
            <div className="col-auto">
              <h1 className="section-title">
                {intl.formatMessage({ id: "ui.navigation.my_requests" })}
              </h1>
            </div>
            {/* <div className="col-6 col-md-4 col-lg-3">
              <Field
                name="priceUnit"
                placeholder={intl.formatMessage({
                  id: 'ui.fields.sort_by',
                })}
                options={[
                  { value: 0, label: 'Data requested' },
                  { value: 1, label: 'Bid low/high' },
                ]}
                component={Select}
              />
            </div> */}
            <div className="col-md-auto">
              <div className="row justify-content-between ">
                <div className="col-auto">
                  <StatusesFilter activeStatus={status} onChange={setStatus} />
                </div>
                {isServiceProvider && (
                  <div className="col-auto">
                    <button
                      type="button"
                      className={classNames("user-link", {
                        "user-link--inactive": !isCustomerView
                      })}
                      onClick={() => setOwnRequestsActive(!isCustomerView)}
                    >
                      <Icon name={ICON_NAMES.human} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="data__body">
            <div className="row">
              {isLoading && <Preloader />}

              {!isLoading && pagination.total === 0 && (
                <div className="col">
                  <div className="section-title section-empty-title">
                    {intl.formatMessage({
                      id: "ui.requests.no_requests"
                    })}
                  </div>
                </div>
              )}

              {!isLoading && (
                <Fragment>
                  {requests.map(request =>
                    isCustomerView ? (
                      <OwnRequest key={request.id} request={request} />
                    ) : (
                      <IncomingRequest
                        key={request.id}
                        request={request}
                        isResponse={status !== "new"}
                      />
                    )
                  )}

                  <PagePagination
                    {...pagination}
                    onChange={handlePaginationChange}
                  />
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ServiceRequestList;
