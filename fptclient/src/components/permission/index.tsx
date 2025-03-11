import { checkPermission } from 'libs/utils/checkPermission';
import type { ReactNode } from 'react';
import type { ScreenType } from 'types/index';

const Permission = ({
  screen,
  children,
  noAccess,
}: {
  children: ReactNode;
  noAccess: ReactNode;
  screen: ScreenType;
}) => {
  const permissions = checkPermission(screen);
  if (permissions?.isView) return children;
  return noAccess;
};

export default Permission;
