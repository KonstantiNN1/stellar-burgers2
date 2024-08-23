import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutUser } from '../../reducers/user';
import { useDispatch } from '../../services/store';
import { deleteCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then((payload: any) => {
        if (payload.success) {
          localStorage.removeItem('refreshToken');
          deleteCookie('accessToken');
          navigate('/login');
        }
      })
      .catch((error: string) => {
        console.error('Ошибка при выходе:', error);
      });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
