import React, { useEffect } from "react";

import Button from "components/Button";
import Icon, { ICON_NAMES } from "components/Icon";
import AddressCard from "./AddressCard";
import AddressNew from "./AddressNew";

function AccountAddresses(props) {
  const { addresses, getAddresses, intl } = props;

  useEffect(() => {
    getAddresses();
  }, []);

  return (
    <main className="main">
      <section className="data">
        <div className="container data__inner">
          <div className="data__head">
            <h1 className="section-title">
              {intl.formatMessage({ id: "ui.navigation.manage_addresses" })}
            </h1>
          </div>

          <div className="data__body">
            <div className="row">
              {addresses.map(address => (
                <div key={address.id} className="col-sm-6 col-lg-4">
                  <AddressCard address={address} />
                </div>
              ))}
              <div className="col-sm-6 col-lg-4 ">
                <AddressNew />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AccountAddresses;
