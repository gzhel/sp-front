import { useRef, useState } from 'react';
import { useNotify } from '@sp/modules/notify';
import type { MMTemplateStr } from '@modules/metamask';
import { mmTemplate, useMetaMask, useMMOperations } from '@modules/metamask';
import { session } from '@services/session';
import { UnauthorizedError } from '@services/api';
import { appEvents } from '@modules/app-events';
import { configApi } from '@config/store';
import type { SignInTemplateArgs } from './api';
import { api } from './api';

export const useModel = () => {
  const accountRef = useRef<HTMLDivElement>(null);
  const [lockUI, setLockUI] = useState<boolean>(false);
  const [isAuthError, setAuthError] = useState<boolean>(false);
  const { account, chainId, status } = useMetaMask();
  const { personalSign } = useMMOperations();
  const { handleError } = useNotify();

  const onSignInClicked = async () => {
    try {
      setAuthError(false);
      setLockUI(true);
      const nonce = await configApi.getNonce(account as string);
      const template: MMTemplateStr =
        'Operation: %v\nYou are connecting to SP app from %v network with %v account and %v nonce';
      const args: SignInTemplateArgs = {
        account: { index: 2, value: account },
        chainId: { index: 1, value: chainId },
        nonce: { index: 3, value: nonce },
        operation: { index: 0, value: 'sign in' },
      };
      const signature = await personalSign(mmTemplate(template, args));
      await api.signIn(signature, template, args);
      await session.saveAccount(account as string);
      const user = await configApi.getUser();
      setLockUI(false);
      appEvents.emit({ data: { ...user, role: 'authorized' }, type: 'updateUser' });
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setAuthError(true);
      }
      setLockUI(false);
      handleError(error, 'sign in failed');
    }
  };

  return {
    account,
    accountRef,
    chainId,
    isAuthError,
    isShow: status === 'connected',
    lockUI,
    onSignInClicked,
  };
};
