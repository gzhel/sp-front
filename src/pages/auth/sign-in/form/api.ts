// import { session } from '@services/session';
// import { apiPublic } from '@services/api';

const signIn = async (signature: string, template: string): Promise<string> => {
  const resp = await apiPublic.post<{ session: string }>('/auth/get-session', {
    template,
    signature,
  });
  await session.saveToken(resp.data.session);
  return resp.data.session;
};

export const api = {
  signIn,
};
