import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { wrapper } from "state";

import "../styles/globals.css";

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <SessionProvider session={props.session}>
        <Component {...props.pageProps} />
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
