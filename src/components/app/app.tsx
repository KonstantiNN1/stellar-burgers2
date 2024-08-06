// import React from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
//   useLocation
// } from 'react-router-dom';
// import { ConstructorPage } from '../../pages/constructor-page/constructor-page';
// import { Feed } from '../../pages/feed';
// import { Login } from '../../pages/login';
// import { Register } from '../../pages/register';
// import { ForgotPassword } from '../../pages/forgot-password';
// import { ResetPassword } from '../../pages/reset-password';
// import { Profile } from '../../pages/profile';
// import { ProfileOrders } from '../../pages/profile-orders';
// import { NotFound404 } from '../../pages/not-fount-404';
// import { Modal } from '../modal';
// import { OrderInfo } from '../order-info';
// import { IngredientDetails } from '../ingredient-details';
// import { AppHeader } from '@components';
// import styles from './app.module.css';

// const App: React.FC = () => {
//   const isAuthenticated = false; // Замените это на вашу реальную проверку аутентификации

//   console.log('Rendering App...'); // Отладочный лог

//   return (
//     <div className={styles.app}>
//       <AppHeader />
//       <Routes>
//         <Route path='/' element={<ConstructorPage />} />
//         <Route path='/feed' element={<Feed />} />
//         <Route
//           path='/login'
//           element={isAuthenticated ? <Navigate to='/' /> : <Login />}
//         />
//         <Route
//           path='/register'
//           element={isAuthenticated ? <Navigate to='/' /> : <Register />}
//         />
//         <Route
//           path='/forgot-password'
//           element={isAuthenticated ? <Navigate to='/' /> : <ForgotPassword />}
//         />
//         <Route
//           path='/reset-password'
//           element={isAuthenticated ? <Navigate to='/' /> : <ResetPassword />}
//         />
//         <Route
//           path='/profile'
//           element={isAuthenticated ? <Profile /> : <Navigate to='/login' />}
//         />
//         <Route
//           path='/profile/orders'
//           element={
//             isAuthenticated ? <ProfileOrders /> : <Navigate to='/login' />
//           }
//         />
//         <Route
//           path='/feed/:number'
//           element={
//             <ModalWrapper>
//               <OrderInfo />
//             </ModalWrapper>
//           }
//         />
//         <Route
//           path='/ingredients/:id'
//           element={
//             <ModalWrapper>
//               <IngredientDetails />
//             </ModalWrapper>
//           }
//         />
//         <Route
//           path='/profile/orders/:number'
//           element={
//             <ModalWrapper>
//               <OrderInfo />
//             </ModalWrapper>
//           }
//         />
//         <Route path='*' element={<NotFound404 />} />
//       </Routes>
//     </div>
//   );
// };

// const ModalWrapper: React.FC<{ children: React.ReactNode }> = ({
//   children
// }) => {
//   const handleClose = () => {
//     // Закрытие модального окна. Добавьте свою логику здесь.
//   };

//   return (
//     <Modal title='Модальное окно' onClose={handleClose}>
//       {children}
//     </Modal>
//   );
// };

// export default App;

import React, { useEffect, useState, FC } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients, selectIsLoading } from '../../reducers/ingredients';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '../../pages';
import { Modal, OrderInfo, IngredientDetails } from '../../components';
import { AppHeader } from '@components';
import styles from './app.module.css';

const App: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('Rendering App...');
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleCloseModal = () => {
    setModalVisible(false);
    navigate(-1); // Navigate back to the previous page
  };

  useEffect(() => {
    // Show modal if location state contains background location
    if (location.state && (location.state as any).background) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [location]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={(location.state as any)?.background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {modalVisible && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Order Info' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Ingredient Details' onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Order Info' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
