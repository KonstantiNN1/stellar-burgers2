import store from '../../services/store';
import rootReducer from '..';

describe('Тестирование rootReducer', () => {
  test('Вызов rootReducer возвращает предыдущее состояние хранилища', () => {
    const current = store.getState();
    const after = rootReducer(undefined, { type: 'action' });
    expect(after).toEqual(current);
  });
});
