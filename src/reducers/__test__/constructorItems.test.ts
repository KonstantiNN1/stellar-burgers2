import reducer, {
  addBun,
  addIngredientWithId,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearIngredients
} from '../constructorItems';
import { TIngredient, TConstructorIngredient } from '../../utils/types';

// Моковые данные
const bun: TIngredient = {
  _id: '60d3b41abdacab0026a733c6',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
};

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

describe('constructorItems reducer', () => {
  it('должен возвращать начальное состояние', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual({
      bun: null,
      ingredients: []
    });
  });

  it('должен обрабатывать добавление булки', () => {
    const previousState = {
      bun: null,
      ingredients: []
    };

    expect(reducer(previousState, addBun(bun))).toEqual({
      bun,
      ingredients: []
    });
  });

  it('должен обрабатывать добавление ингредиента с уникальным идентификатором', () => {
    const previousState = {
      bun: null,
      ingredients: []
    };

    const newState = reducer(previousState, addIngredientWithId(ingredient));

    expect(newState.ingredients.length).toBe(1);
    expect(newState.ingredients[0]).toEqual({
      ...ingredient,
      id: expect.any(String)
    });
  });

  it('должен обрабатывать удаление ингредиента', () => {
    const ingredientWithId = { ...ingredient, id: 'uuid-1' };
    const previousState = {
      bun: null,
      ingredients: [ingredientWithId]
    };

    expect(reducer(previousState, removeIngredient({ id: 'uuid-1' }))).toEqual({
      bun: null,
      ingredients: []
    });
  });

  it('должен обрабатывать перемещение ингредиента вверх', () => {
    const ingredient1: TConstructorIngredient = {
      ...ingredient,
      id: 'uuid-1'
    };
    const ingredient2: TConstructorIngredient = {
      ...ingredient,
      id: 'uuid-2'
    };

    const previousState = {
      bun: null,
      ingredients: [ingredient2, ingredient1]
    };

    expect(reducer(previousState, moveIngredientUp(1))).toEqual({
      bun: null,
      ingredients: [ingredient1, ingredient2]
    });
  });

  it('должен обрабатывать перемещение ингредиента вниз', () => {
    const ingredient1: TConstructorIngredient = {
      ...ingredient,
      id: 'uuid-1'
    };
    const ingredient2: TConstructorIngredient = {
      ...ingredient,
      id: 'uuid-2'
    };

    const previousState = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };

    expect(reducer(previousState, moveIngredientDown(0))).toEqual({
      bun: null,
      ingredients: [ingredient2, ingredient1]
    });
  });

  it('должен очищать ингредиенты', () => {
    const previousState = {
      bun: bun,
      ingredients: [{ ...ingredient, id: 'uuid-1' }]
    };

    expect(reducer(previousState, clearIngredients())).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
