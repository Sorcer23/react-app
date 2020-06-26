import { config as accountConfig } from "modules/account";

export function isServiceProvider(state) {
  return (
    state.account.user.serviceProviderStatus ===
    accountConfig.PROVIDER_STATUSES.approved
  );
}
