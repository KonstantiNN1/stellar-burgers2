import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../../reducers/user';
import { RootState, AppDispatch } from '../../services/store';
import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const error = useSelector((state: RootState) => state.user.error);

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error('Ошибка авторизации:', err);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, navigate, from]);

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
