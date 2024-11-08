import { useMemo } from 'react';

import { useAppSelector } from '../app/hooks';
import { selectCurrentUser } from '../state/authSlice';

export const useUser = () => {
  const user = useAppSelector(selectCurrentUser);

  return useMemo(() => ({ user }), [user]);
};
