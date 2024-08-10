// import { FC, SyntheticEvent, useState } from 'react';
// import { RegisterUI } from '@ui-pages';

// export const Register: FC = () => {
//   const [userName, setUserName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e: SyntheticEvent) => {
//     e.preventDefault();
//   };

//   return (
//     <RegisterUI
//       errorText=''
//       email={email}
//       userName={userName}
//       password={password}
//       setEmail={setEmail}
//       setPassword={setPassword}
//       setUserName={setUserName}
//       handleSubmit={handleSubmit}
//     />
//   );
// };

import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../reducers/user'; // Импортируем экшен
import { RootState, AppDispatch } from '../../services/store'; // Импорт типов для dispatch и state
import { RegisterUI } from '@ui-pages';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch(); // Явно указываем тип для dispatch
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const error = useSelector((state: RootState) => state.user.error);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ userName, email, password }))
      .unwrap() // Распаковываем результат, чтобы получить прямой доступ к успешному или неуспешному результату
      .then(() => {
        navigate('/profile'); // Перенаправление на профиль после успешной регистрации
      })
      .catch((err) => {
        console.error('Ошибка регистрации:', err); // Логируем ошибку
      });
  };

  if (isLoggedIn) {
    navigate('/'); // Если пользователь уже залогинен, перенаправляем его на главную страницу
    return null;
  }

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
