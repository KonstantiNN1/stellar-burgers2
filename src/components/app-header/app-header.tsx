import React, { FC } from 'react';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const userName = useSelector((state: RootState) => state.user.name);

  return <AppHeaderUI userName={userName ?? undefined} />;
};

export default AppHeader;
