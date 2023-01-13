import type { FC } from 'react';
import { memo } from 'react';
// import { ButtonPrimary } from '@components/sp/button';
// import { InputText } from '@components/sp/form/uncontrolled';
import { Text } from '@components/sp/typography';
import { useModel } from './model';
import s from './index.module.scss';

export const SignInFormFragment: FC = memo(() => {
  const m = useModel();

  return !m.isShow ? null : (
    <>
      <Text className="mbf" level="2" align="center">
        Please confirm authorization with following MetaMask settings
      </Text>

      <InputText
        className="mbf"
        label="Network"
        value={m.chainId as string}
        readOnly
        disabled
        fullWidth
      />

      <InputText
        className="mb4"
        label="Account"
        value={m.account as string}
        elementRef={m.accountRef}
        readOnly
        disabled
        fullWidth
      />

      {m.isAuthError && (
        <Text className={s.authError} level="2" align="center">
          Current account is not registered in SP
        </Text>
      )}

      <ButtonPrimary onClick={m.onSignInClicked} disabled={m.lockUI} fullWidth>
        Confirm
      </ButtonPrimary>
    </>
  );
});
