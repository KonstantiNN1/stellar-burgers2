// import { ProfileUI } from '@ui-pages';
// import { FC, SyntheticEvent, useEffect, useState } from 'react';

// export const Profile: FC = () => {
//   /** TODO: взять переменную из стора */
//   const user = {
//     name: '',
//     email: ''
//   };

//   const [formValue, setFormValue] = useState({
//     name: user.name,
//     email: user.email,
//     password: ''
//   });

//   useEffect(() => {
//     setFormValue((prevState) => ({
//       ...prevState,
//       name: user?.name || '',
//       email: user?.email || ''
//     }));
//   }, [user]);

//   const isFormChanged =
//     formValue.name !== user?.name ||
//     formValue.email !== user?.email ||
//     !!formValue.password;

//   const handleSubmit = (e: SyntheticEvent) => {
//     e.preventDefault();
//   };

//   const handleCancel = (e: SyntheticEvent) => {
//     e.preventDefault();
//     setFormValue({
//       name: user.name,
//       email: user.email,
//       password: ''
//     });
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormValue((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value
//     }));
//   };

//   return (
//     <ProfileUI
//       formValue={formValue}
//       isFormChanged={isFormChanged}
//       handleCancel={handleCancel}
//       handleSubmit={handleSubmit}
//       handleInputChange={handleInputChange}
//     />
//   );

//   return null;
// };

// // import { ProfileUI } from '@ui-pages';
// // import { ProfileMenuUI } from '../../components/ui/profile-menu/profile-menu'; // Импортируем ProfileMenuUI
// // import { FC, SyntheticEvent, useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { RootState } from '../../services/store';
// // import { logout } from '../../reducers/user';
// // import { useNavigate, useLocation } from 'react-router-dom';

// // export const Profile: FC = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const user = useSelector((state: RootState) => state.user);

// //   const [formValue, setFormValue] = useState({
// //     name: user.name || '',
// //     email: user.email || '',
// //     password: ''
// //   });

// //   useEffect(() => {
// //     setFormValue((prevState) => ({
// //       ...prevState,
// //       name: user?.name || '',
// //       email: user?.email || ''
// //     }));
// //   }, [user]);

// //   const isFormChanged =
// //     formValue.name !== user?.name ||
// //     formValue.email !== user?.email ||
// //     !!formValue.password;

// //   const handleSubmit = (e: SyntheticEvent) => {
// //     e.preventDefault();
// //     // Логика для обновления профиля
// //   };

// //   const handleCancel = (e: SyntheticEvent) => {
// //     e.preventDefault();
// //     setFormValue({
// //       name: user.name || '',
// //       email: user.email || '',
// //       password: ''
// //     });
// //   };

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setFormValue((prevState) => ({
// //       ...prevState,
// //       [e.target.name]: e.target.value
// //     }));
// //   };

// //   const handleLogout = () => {
// //     dispatch(logout());
// //     navigate('/login');
// //   };

// //   return (
// //     <div>
// //       <ProfileMenuUI pathname={location.pathname} handleLogout={handleLogout} />
// //       <ProfileUI
// //         formValue={formValue}
// //         isFormChanged={isFormChanged}
// //         handleCancel={handleCancel}
// //         handleSubmit={handleSubmit}
// //         handleInputChange={handleInputChange}
// //       />
// //     </div>
// //   );
// // };
import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store';
import { updateUserApi } from '../../utils/burger-api';
import { setUser } from '../../reducers/user'; // Импортируем действие setUser

export const Profile: FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Используем типизированный dispatch

  // Получаем данные пользователя из стора
  const user = useSelector((state: RootState) => state.user);

  const [formValue, setFormValue] = useState({
    name: user.name || '',
    email: user.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserApi({
        name: formValue.name,
        email: formValue.email,
        ...(formValue.password && { password: formValue.password })
      });
      // Используем setUser для обновления данных пользователя в сторе
      dispatch(
        setUser({ name: updatedUser.user.name, email: updatedUser.user.email })
      );
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name || '',
      email: user.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
