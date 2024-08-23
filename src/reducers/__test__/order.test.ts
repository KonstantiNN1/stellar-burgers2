import reducer, { fetchOrderByNumber, placeOrder } from '../order';

import {
  getOrderByNumberApi,
  orderBurgerApi,
  getFeedsApi,
  getOrdersApi
} from '../../utils/burger-api';

import { TOrder, TOrdersData } from '../../utils/types';

jest.mock('../../utils/burger-api');

const mockedGetOrderByNumberApi = getOrderByNumberApi as jest.MockedFunction<
  typeof getOrderByNumberApi
>;
const mockedOrderBurgerApi = orderBurgerApi as jest.MockedFunction<
  typeof orderBurgerApi
>;

const order: TOrder = {
  _id: 'order123',
  status: 'done',
  name: 'Test Order',
  createdAt: '2023-08-19T12:34:56Z',
  updatedAt: '2023-08-19T12:34:56Z',
  number: 12345,
  ingredients: ['ingredient1', 'ingredient2']
};

const ordersData: TOrdersData = {
  orders: [order],
  total: 1,
  totalToday: 1
};

describe('orderSlice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual({
      isRequesting: false,
      ordersData: [],
      userOrdersData: [],
      orderData: null,
      total: 0,
      totalToday: 0,
      error: null
    });
  });

  it('должен обработать успешную загрузку заказа по номеру', async () => {
    mockedGetOrderByNumberApi.mockResolvedValueOnce({
      success: true,
      orders: [order]
    });

    const dispatch = jest.fn();
    const getState = jest.fn();
    const extra = undefined;

    const resultAction = await fetchOrderByNumber(order.number)(
      dispatch,
      getState,
      extra
    );

    expect(dispatch).toHaveBeenCalledWith({
      type: fetchOrderByNumber.pending.type,
      meta: expect.any(Object)
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: fetchOrderByNumber.fulfilled.type,
      payload: order,
      meta: expect.any(Object)
    });

    expect(resultAction.payload).toEqual(order);
  });

  it('должен обработать ошибку при загрузке заказа по номеру', async () => {
    mockedGetOrderByNumberApi.mockResolvedValueOnce({
      success: false,
      orders: []
    });

    const dispatch = jest.fn();
    const getState = jest.fn();
    const extra = undefined;

    const resultAction = await fetchOrderByNumber(order.number)(
      dispatch,
      getState,
      extra
    );

    expect(dispatch).toHaveBeenCalledWith({
      type: fetchOrderByNumber.pending.type,
      meta: expect.any(Object)
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: fetchOrderByNumber.rejected.type,
      payload: 'Order not found',
      meta: expect.any(Object),
      error: expect.any(Object)
    });

    expect(resultAction.payload).toEqual('Order not found');
  });

  it('должен обработать успешное создание заказа', async () => {
    mockedOrderBurgerApi.mockResolvedValueOnce({
      success: true,
      order,
      name: 'Test Order'
    });

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      order: {
        ordersData: [],
        totalToday: 1
      }
    }));

    const extra = undefined;
    const resultAction = await placeOrder(order.ingredients)(
      dispatch,
      getState,
      extra
    );

    expect(dispatch).toHaveBeenCalledWith({
      type: placeOrder.pending.type,
      meta: expect.any(Object)
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: placeOrder.fulfilled.type,
      payload: order,
      meta: expect.any(Object)
    });

    expect(resultAction.payload).toEqual(order);
  });

  it('должен обработать ошибку при создании заказа', async () => {
    mockedOrderBurgerApi.mockRejectedValueOnce(
      new Error('Ошибка при создании заказа')
    );

    const dispatch = jest.fn();
    const getState = jest.fn();
    const extra = undefined;

    const resultAction = await placeOrder(order.ingredients)(
      dispatch,
      getState,
      extra
    );

    expect(dispatch).toHaveBeenCalledWith({
      type: placeOrder.pending.type,
      meta: expect.any(Object)
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: placeOrder.rejected.type,
      payload: {
        message: 'Ошибка при создании заказа',
        code: 'Error'
      },
      meta: expect.any(Object),
      error: expect.any(Object)
    });

    expect(resultAction.payload).toEqual({
      message: 'Ошибка при создании заказа',
      code: 'Error'
    });
  });
});
