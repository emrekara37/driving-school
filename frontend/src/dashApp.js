import React from "react";
import { Provider } from "react-redux";
import { store, history } from "./redux/store";
import PublicRoutes from "./router";
import { LocaleProvider } from "antd";
import { IntlProvider } from "react-intl";
import AppLocale from "./languageProvider";
import DashAppHolder from "./dashAppStyle";
import Boot from "./redux/boot";
import GlobalStyles from "./settings/globalStyles";
const currentAppLocale = AppLocale["en"];
const DashApp = () => (
  <LocaleProvider locale={currentAppLocale.antd}>
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <DashAppHolder>
        <Provider store={store}>
          <PublicRoutes history={history} />
        </Provider>
        <GlobalStyles />
      </DashAppHolder>
    </IntlProvider>
  </LocaleProvider>
);
Boot()
  .then(() => DashApp())
  .catch(error => console.error(error));

export default DashApp;
export { AppLocale };
