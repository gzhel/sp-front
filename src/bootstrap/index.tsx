import type { FC, ReactElement } from 'react';
import { memo, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { ErrorBoundary } from '@sp/modules/logger';
import { NavigationContainer } from '@sp/modules/navigation';
import { NotificationsContainer } from '@sp/modules/notify';
import { AppEventsContainer } from '@modules/app-events';
import { BalanceContainer } from '@config/balance';
import { configActions, configHooks } from '@config/store';
import { useCallDispatch } from '@tools/redux';
import s from './index.module.scss';
import { store } from './store';
import { Router } from './router';

initializeIcons();

const ConnectedApp: FC = memo(() => {
  return (
    <div className={s.app}>
      <Router />
    </div>
  );
});

const WithConfig: FC<{ children: ReactElement }> = ({ children }) => {
  const isAppConfigured = configHooks.useConfigure();
  const onAppOpened = useCallDispatch(configActions.onAppOpened);

  useEffect(() => {
    onAppOpened();
  }, []); // eslint-disable-line

  return isAppConfigured ? (
    <>
      <BalanceContainer />
      {children}
    </>
  ) : null;
};

export const App: FC = () => {
  useEffect(() => {
    // this event need to remove es5 logger listener from public/static/scripts/crash-report.js
    window.dispatchEvent(new Event('sp:app-started'));
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <NotificationsContainer />
          <NavigationContainer />
          <AppEventsContainer />

          <WithConfig>
            <ConnectedApp />
          </WithConfig>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
};
