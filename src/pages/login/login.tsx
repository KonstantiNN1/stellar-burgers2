// import { FC, SyntheticEvent, useState } from 'react';
// import { LoginUI } from '@ui-pages';

// export const Login: FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e: SyntheticEvent) => {
//     e.preventDefault();
//   };

//   return (
//     <LoginUI
//       errorText=''
//       email={email}
//       setEmail={setEmail}
//       password={password}
//       setPassword={setPassword}
//       handleSubmit={handleSubmit}
//     />
//   );
// };

import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../reducers/user'; // Импортируем экшен
import { RootState, AppDispatch } from '../../services/store'; // Импорт типов для dispatch и state
import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch(); // Явно указываем тип для dispatch
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const error = useSelector((state: RootState) => state.user.error);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap() // Распаковываем результат, чтобы получить прямой доступ к успешному или неуспешному результату
      .then(() => {
        navigate('/profile'); // Перенаправление на профиль после успешного логина
      })
      .catch((err) => {
        console.error('Ошибка авторизации:', err); // Логируем ошибку
      });
  };

  if (isLoggedIn) {
    navigate('/'); // Если пользователь уже залогинен, перенаправляем его на главную страницу
    return null;
  }

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
