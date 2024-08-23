import reducer, { fetchIngredients } from '../ingredients';
import { TIngredient, CustomError } from '../../utils/types';
import { getIngredientsApi } from '../../utils/burger-api';
import { PayloadAction, Action } from '@reduxjs/toolkit';

jest.mock('../../utils/burger-api');
const mockedGetIngredientsApi = getIngredientsApi as jest.MockedFunction<
  typeof getIngredientsApi
>;

const ingredients: TIngredient[] = [
  {
    _id: '60d3b41abdacab0026a733c7',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png'
  },
  {
    _id: '60d3b41abdacab0026a733c8',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 220,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png'
  }
];

describe('ingredientsSlice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: '@@INIT' } as Action)).toEqual({
      isLoading: false,
      data: [],
      error: null
    });
  });

  it('должен обрабатывать fetchIngredients.pending', () => {
    const action = {
      type: fetchIngredients.pending.type,
      meta: {
        arg: undefined,
        requestId: 'test-request-id',
        requestStatus: 'pending'
      }
    };
    const state = reducer(undefined, action as Action);
    expect(state).toEqual({
      isLoading: true,
      data: [],
      error: null
    });
  });

  it('должен обрабатывать fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: ingredients,
      meta: {
        arg: undefined,
        requestId: 'test-request-id',
        requestStatus: 'fulfilled'
      }
    };
    const state = reducer(undefined, action as PayloadAction<TIngredient[]>);
    expect(state).toEqual({
      isLoading: false,
      data: ingredients,
      error: null
    });
  });

  it('должен обрабатывать fetchIngredients.rejected с сообщением об ошибке', () => {
    const errorMessage = 'ошибочный запрос';
    const action = {
      type: fetchIngredients.rejected.type,
      payload: { message: errorMessage },
      meta: {
        arg: undefined,
        requestId: 'test-request-id',
        requestStatus: 'rejected'
      },
      error: expect.any(Object)
    };
    const state = reducer(undefined, action as PayloadAction<CustomError>);
    expect(state).toEqual({
      isLoading: false,
      data: [],
      error: errorMessage
    });
  });

  it('должен обработать успешный запрос fetchIngredients', async () => {
    mockedGetIngredientsApi.mockResolvedValueOnce(ingredients);

    const dispatch = jest.fn();
    const getState = jest.fn();
    const extra = undefined;
    const arg = undefined;

    const resultAction = await fetchIngredients()(dispatch, getState, extra);

    expect(dispatch).toHaveBeenCalledWith({
      type: fetchIngredients.pending.type,
      meta: {
        arg: undefined,
        requestId: expect.any(String),
        requestStatus: 'pending'
      }
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: fetchIngredients.fulfilled.type,
      payload: ingredients,
      meta: {
        arg: undefined,
        requestId: expect.any(String),
        requestStatus: 'fulfilled'
      }
    });
    expect(resultAction.payload).toEqual(ingredients);
  });

  it('должен обработать ошибочный запрос fetchIngredients', async () => {
    const errorMessage = 'ошибочный запрос';
    const customError: CustomError = { message: errorMessage, code: 'Error' };

    mockedGetIngredientsApi.mockRejectedValueOnce(new Error(errorMessage));

    const dispatch = jest.fn();
    const getState = jest.fn();
    const extra = undefined;

    const resultAction = await fetchIngredients()(dispatch, getState, extra);

    expect(dispatch).toHaveBeenCalledWith({
      type: fetchIngredients.pending.type,
      meta: {
        arg: undefined,
        requestId: expect.any(String),
        requestStatus: 'pending'
      }
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: fetchIngredients.rejected.type,
      payload: customError,
      meta: expect.objectContaining({
        arg: undefined,
        requestId: expect.any(String),
        requestStatus: 'rejected',
        rejectedWithValue: true
      }),
      error: expect.objectContaining({
        message: 'Rejected'
      })
    });

    expect(resultAction.payload).toEqual(customError);
  });
});
