import React, { FC, useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate
} from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients, selectIsLoading } from '../../reducers/ingredients';
import { checkAuth } from '../../reducers/user';
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
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();

  const background = location.state && (location.state as any).background;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(checkAuth());
  }, [dispatch]);

  const handleCloseModal = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const ProtectedRoute = ({ element, ...rest }: any) => {
    const location = useLocation();

    if (!isLoggedIn) {
      return <Navigate to='/login' state={{ from: location }} replace />;
    }

    return element;
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      {/* Главные маршруты */}
      <Routes location={background || location}>
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
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/profile/orders/:number' element={<OrderInfo />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Маршруты для модальных окон */}
      {background && (
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
