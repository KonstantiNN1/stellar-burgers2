// import React, { useEffect, useState, FC } from 'react';
// import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from '../../services/store';
// import { fetchIngredients, selectIsLoading } from '../../reducers/ingredients';
// import {
//   ConstructorPage,
//   Feed,
//   Login,
//   Register,
//   ForgotPassword,
//   ResetPassword,
//   Profile,
//   ProfileOrders,
//   NotFound404
// } from '../../pages';
// import { Modal, OrderInfo, IngredientDetails } from '../../components';
// import { AppHeader } from '@components';
// import styles from './app.module.css';

// const App: FC = () => {
//   const dispatch = useDispatch();
//   const isLoading = useSelector(selectIsLoading);
//   const [modalVisible, setModalVisible] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     dispatch(fetchIngredients()).then((response) => {});
//   }, [dispatch]);

//   const handleCloseModal = () => {
//     setModalVisible(false);
//     navigate(-1);
//   };

//   useEffect(() => {
//     console.log('Current location:', location.pathname);
//     if (location.state && (location.state as any).background) {
//       setModalVisible(true);
//     } else {
//       setModalVisible(false);
//     }
//   }, [location]);

//   useEffect(() => {
//     if (location.state && (location.state as any).background) {
//       setModalVisible(true);
//     } else {
//       setModalVisible(false);
//     }
//   }, [location]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className={styles.app}>
//       <AppHeader />
//       <Routes location={(location.state as any)?.background || location}>
//         <Route path='/' element={<ConstructorPage />} />
//         <Route path='/feed' element={<Feed />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/register' element={<Register />} />
//         <Route path='/forgot-password' element={<ForgotPassword />} />
//         <Route path='/reset-password' element={<ResetPassword />} />
//         <Route path='/profile' element={<Profile />} />
//         <Route path='/profile/orders' element={<ProfileOrders />} />
//         <Route path='*' element={<NotFound404 />} />
//       </Routes>
//       {modalVisible && (
//         <Routes>
//           <Route
//             path='/feed/:number'
//             element={
//               <Modal title='Order Info' onClose={handleCloseModal}>
//                 <OrderInfo />
//               </Modal>
//             }
//           />
//           <Route
//             path='/ingredients/:id'
//             element={
//               <Modal title='Ingredient Details' onClose={handleCloseModal}>
//                 <IngredientDetails />
//               </Modal>
//             }
//           />
//           <Route
//             path='/profile/orders/:number'
//             element={
//               <Modal title='Order Info' onClose={handleCloseModal}>
//                 <OrderInfo />
//               </Modal>
//             }
//           />
//         </Routes>
//       )}
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState, FC } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate
} from 'react-router-dom';
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
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Проверка авторизации
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchIngredients()).then((response) => {});
  }, [dispatch]);

  const handleCloseModal = () => {
    setModalVisible(false);
    navigate(-1);
  };

  useEffect(() => {
    console.log('Current location:', location.pathname);
    if (location.state && (location.state as any).background) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [location]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // ProtectedRoute как часть App компонента
  const ProtectedRoute = ({ element, ...rest }: any) =>
    isLoggedIn ? element : <Navigate to='/login' replace />;

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
        <Route
          path='/profile'
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute element={<ProfileOrders />} />}
        />
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
