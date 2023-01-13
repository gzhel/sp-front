import { useMemo } from 'react';
import type { RouteFull } from '@typings/router';
import { useSignInRoute } from './auth/sign-in';

type RouteHook<R> = () => { route: R };
export const useConstructRoutes = <R>(useHooks: Array<RouteHook<R>>) => {
  const routes = useHooks.map((h: RouteHook<R>) => h());
  const appRoutes = useMemo(
    () => routes.map((r) => r.route),
    routes.map((r) => r.route) // eslint-disable-line
  );
  return appRoutes;
};

export const useAppRoutes = () => {
  const appRoutes = useConstructRoutes<RouteFull>([useSignInRoute]);

  return { appRoutes };
};
