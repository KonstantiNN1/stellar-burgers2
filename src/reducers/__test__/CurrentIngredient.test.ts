import reducer, {
  setCurrentIngredient,
  clearCurrentIngredient
} from '../currentIngredient';
import { TIngredient } from '../../utils/types';

const ingredient: TIngredient = {
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
};

describe('currentIngredient reducer', () => {
  it('должен возвращать начальное состояние', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual({
      ingredient: null
    });
  });

  it('должен обрабатывать setCurrentIngredient', () => {
    const previousState = {
      ingredient: null
    };

    expect(reducer(previousState, setCurrentIngredient(ingredient))).toEqual({
      ingredient
    });
  });

  it('должен обрабатывать clearCurrentIngredient', () => {
    const previousState = {
      ingredient
    };

    expect(reducer(previousState, clearCurrentIngredient())).toEqual({
      ingredient: null
    });
  });
});
