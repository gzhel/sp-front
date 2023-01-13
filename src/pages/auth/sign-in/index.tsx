import type { FC } from 'react';
import { memo, useMemo } from 'react';
import type { Route, RouteFull } from '@typings/router';
import { Text, Title } from '@components/sp/typography';
import { GuardGuest } from '@components/guard';
import { LayoutGuest } from '@components/layout';
import { PageContent } from '@components/page';
import { SignInFormFragment } from './form';
import s from './index.module.scss';

const Page: FC = memo(() => {
  return (
    <PageContent className={s.content} type="guest">
      <div className={s.wrapper}>
        <Title className="mb5" level="1" align="center" color="theme">
          Welcome
        </Title>

        <Text className="mb3" level="2" align="center">
          <b>Dear guest</b>, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa maxime
          perferendis rem vitae voluptatibus! Ab dolores esse excepturi expedita laudantium minima
          neque nesciunt voluptatum. Harum maxime molestias nam quasi quo.
        </Text>

        <SignInFormFragment />
      </div>
    </PageContent>
  );
});

export const signInRoute: Route = {
  component: Page,
  path: '/sign-in',
};
export const useSignInRoute = () => {
  const route = useMemo<RouteFull>(
    () => ({
      ...signInRoute,
      guard: GuardGuest,
      layout: LayoutGuest,
    }),
    []
  );
  return { route };
};
