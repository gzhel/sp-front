import type { FC, ReactElement } from 'react';
import { memo, useMemo } from 'react';
import { useRoutes } from 'react-router-dom';
// import { PicksWidgets } from '@modules/picks';
import { CustomRoute } from '@components/route';
import { configHooks } from '@config/store';
import { useAppRoutes } from '../pages';

export const Router: FC = memo(() => {
  const role = configHooks.useRole();
  const { appRoutes } = useAppRoutes();

  const widgets: ReactElement | undefined = useMemo(
    () => (role === 'authorized' ? <PicksWidgets /> : undefined),
    [role]
  );

  return useRoutes(
    appRoutes.map((route) => ({
      element: <CustomRoute {...route} widgets={widgets} />,
      path: route.path,
    }))
  );
});
