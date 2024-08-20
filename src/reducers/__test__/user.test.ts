import reducer, {
  loginUser,
  registerUser,
  logoutUser,
  checkAuth,
  setUser,
  clearUser
} from '../user';
import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  getUserApi
} from '../../utils/burger-api';
import { TUser } from '../../utils/types';
import { setCookie } from '../../utils/cookie';

jest.mock('../../utils/burger-api');
jest.mock('../../utils/cookie');

const mockedLoginUserApi = loginUserApi as jest.MockedFunction<
  typeof loginUserApi
>;
const mockedRegisterUserApi = registerUserApi as jest.MockedFunction<
  typeof registerUserApi
>;
const mockedLogoutApi = logoutApi as jest.MockedFunction<typeof logoutApi>;
const mockedGetUserApi = getUserApi as jest.MockedFunction<typeof getUserApi>;

const user: TUser = {
  email: 'testuser@example.com',
  name: 'Test User'
};

describe('userSlice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual({
      name: null,
      email: null,
      isLoggedIn: false,
      error: null
    });
  });

  it('должен обработать успешный логин', async () => {
    mockedLoginUserApi.mockResolvedValueOnce({
      success: true,
      user,
      accessToken: 'fakeToken',
      refreshToken: 'fakeRefreshToken'
    });

    const dispatch = jest.fn();
    const getState = jest.fn();
    const extra = undefined;

    const resultAction = await loginUser({
      email: 'john.doe@example.com',
      password: 'password'
    })(dispatch, getState, extra);

    expect(dispatch).toHaveBeenCalledWith({
      type: loginUser.pending.type,
      meta: expect.any(Object)
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: loginUser.fulfilled.type,
      payload: user,
      meta: expect.any(Object)
    });

    expect(setCookie).toHaveBeenCalledWith('accessToken', 'fakeToken');
    expect(resultAction.payload).toEqual(user);
  });

  it('должен обработать ошибку при логине', async () => {
    const errorMessage = 'Invalid credentials';
    mockedLoginUserApi.mockRejectedValueOnce(new Error(errorMessage));

    const dispatch = jest.fn();
    const getState = jest.fn();
    const extra = undefined;

    const resultAction = await loginUser({
      email: 'john.doe@example.com',
      password: 'wrongpassword'
    })(dispatch, getState, extra);

    expect(dispatch).toHaveBeenCalledWith({
      type: loginUser.pending.type,
      meta: expect.any(Object)
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: loginUser.rejected.type,
      payload: expect.objectContaining({ message: errorMessage }),
      meta: expect.any(Object),
      error: expect.any(Object)
    });

    expect(resultAction.payload).toEqual(
      expect.objectContaining({ message: errorMessage })
    );
  });

  it('должен обработать успешную регистрацию', async () => {
    mockedRegisterUserApi.mockResolvedValueOnce({
      success: true,
      user,
      accessToken: 'fakeToken',
      refreshToken: 'fakeRefreshToken'
    });

    const dispatch = jest.fn();
    const getState = jest.fn();
    const extra = undefined;

    const resultAction = await registerUser({
      userName: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password'
    })(dispatch, getState, extra);

    expect(dispatch).toHaveBeenCalledWith({
      type: registerUser.pending.type,
      meta: expect.any(Object)
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: registerUser.fulfilled.type,
      payload: user,
      meta: expect.any(Object)
    });

    expect(setCookie).toHaveBeenCalledWith('accessToken', 'fakeToken');
    expect(resultAction.payload).toEqual(user);
  });

  it('должен обработать успешный выход из системы', async () => {
    mockedLogoutApi.mockResolvedValueOnce({ success: true });

    const dispatch = jest.fn();
    const getState = jest.fn();
    const extra = undefined;

    const resultAction = await logoutUser()(dispatch, getState, extra);

    expect(dispatch).toHaveBeenCalledWith({
      type: logoutUser.pending.type,
      meta: expect.any(Object)
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: logoutUser.fulfilled.type,
      meta: expect.any(Object)
    });

    expect(setCookie).toHaveBeenCalledWith('accessToken', '', { expires: -1 });
    expect(resultAction.payload).toBeUndefined();
  });

  it('должен обработать успешную проверку авторизации', async () => {
    mockedGetUserApi.mockResolvedValueOnce({
      success: true,
      user
    });

    const dispatch = jest.fn();
    const getState = jest.fn();
    const extra = undefined;

    const resultAction = await checkAuth()(dispatch, getState, extra);

    expect(dispatch).toHaveBeenCalledWith({
      type: checkAuth.pending.type,
      meta: expect.any(Object)
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: checkAuth.fulfilled.type,
      payload: user,
      meta: expect.any(Object)
    });

    expect(resultAction.payload).toEqual(user);
  });

  it('должен корректно установить и очистить пользователя через setUser и clearUser', () => {
    let state = reducer(undefined, setUser(user));
    expect(state).toEqual({
      name: user.name,
      email: user.email,
      isLoggedIn: true,
      error: null
    });

    state = reducer(state, clearUser());
    expect(state).toEqual({
      name: null,
      email: null,
      isLoggedIn: false,
      error: null
    });
  });
});
