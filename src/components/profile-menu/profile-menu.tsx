// import { FC } from 'react';
// import { useLocation } from 'react-router-dom';
// import { ProfileMenuUI } from '@ui';

// export const ProfileMenu: FC = () => {
//   const { pathname } = useLocation();

//   const handleLogout = () => {};

//   return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
// };

import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../reducers/user';
import { ProfileMenuUI } from '@ui';
import { AppDispatch } from '../../services/store'; // Импортируем тип для dispatch

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch(); // Явно указываем тип для dispatch

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); // Используем unwrap для обработки результата
      navigate('/login');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
