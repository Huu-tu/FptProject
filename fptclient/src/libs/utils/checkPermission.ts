import { app } from 'routes';
import store from 'store';
import { ScreenType } from 'types';

export const checkPermission = (screen: ScreenType) => {
  const permissions = store.getState().user[app]?.permissions;
  return permissions?.find((p) => p.permission === screen);
};
