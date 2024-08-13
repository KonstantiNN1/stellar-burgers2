import { FC, useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrderInfo } from '@utils-types';
import { fetchUserOrders } from '../../reducers/order';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalClosed, setIsModalClosed] = useState(false);

  const orderData = useSelector((state) =>
    state.order.ordersData.find((order) => order.number === Number(number))
  );

  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingredients.data
  );

  const isOrdersLoading = useSelector((state) => state.order.isRequesting);

  useEffect(() => {
    if (!orderData && !isOrdersLoading) {
      dispatch(fetchUserOrders());
    }
  }, [orderData, isOrdersLoading, dispatch]);

  const orderInfo: TOrderInfo | null = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc, item) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) {
          if (!acc[item]) {
            acc[item] = { ...ingredient, count: 1 };
          } else {
            acc[item].count++;
          }
        }
        return acc;
      },
      {} as { [key: string]: TIngredient & { count: number } }
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  const handleCloseModal = () => {
    setIsModalClosed(true);
  };

  useEffect(() => {
    if (isModalClosed) {
      navigate(-1);
    }
  }, [isModalClosed, navigate]);

  if (isOrdersLoading || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
