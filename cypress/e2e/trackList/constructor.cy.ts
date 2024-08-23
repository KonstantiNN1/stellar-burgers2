const API_URL = 'https://norma.nomoreparties.space/api' 
const testUrl = 'http://localhost:5173'

const selectors = {
  bunMockName: 'Краторная булка N-200i',
  mainMockName: 'Филе Люминесцентного тетраодонтимформа',
  sauceMockName: 'Соус Spicy-X',
  orderMockNumber: '12345',
  modal: '[data-testid="modal"]',
  modalTitle: '[data-testid="modal-title"]',
  modalCloseButton: '[data-testid="modal-close-button"]',
  addButton: '.common_button',
  button: 'button', 
  OrderButtonName: 'Оформить заказ'
};

beforeEach(() => {
    cy.fixture('ingredients.json').then((ingredients) => {
        cy.intercept('GET', `${API_URL}/ingredients`, {
            statusCode: 200,
            body: {
                success: true,
                data: ingredients
            }
        }).as('getIngredients');
    });

    cy.intercept('POST', `${API_URL}/orders`, {
        statusCode: 200,
        body: {
            success: true,
            name: "Test Order",
            order: {
                _id: "order123",
                status: "done",
                name: "Test Order",
                createdAt: "2023-08-19T12:34:56Z",
                updatedAt: "2023-08-19T12:34:56Z",
                number: 12345,
                ingredients: ["ingredient1", "ingredient2"]
            }
        }
    }).as('createOrder');


    cy.fixture('user.json').then((user) => {
        cy.intercept(
            {
                method: 'GET',
                url: `${API_URL}/auth/user`
            },
            user
        ).as('getUser');
    });

    cy.visit(testUrl);
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });
  
  it('Список ингредиентов доступен для выбора', () => {
    cy.contains(selectors.bunMockName).should('be.visible');
    cy.contains(selectors.mainMockName).scrollIntoView().should('be.visible');
    cy.contains(selectors.sauceMockName).scrollIntoView().should('be.visible');
  });
  
  it('Булку можно добавить в конструктор через кнопку «Добавить»', () => {
    cy.contains(selectors.bunMockName).should('be.visible');
    cy.contains(selectors.bunMockName).parent().find(selectors.addButton).click({ force: true });
  
    cy.contains(`${selectors.bunMockName} (верх)`).should('exist');
    cy.contains(`${selectors.bunMockName} (низ)`).should('exist');
  });
  
  it('Открытие модального окна ингредиента', () => {
    cy.contains(selectors.bunMockName).click({ force: true });
    cy.get(selectors.modal).should('be.visible');
    cy.get(selectors.modalTitle).should('contain.text', 'Ingredient Details');
  });
  
  it('Закрытие модального окна по клику на крестик', () => {
    cy.contains(selectors.bunMockName).click({ force: true });
    cy.get(selectors.modal).should('be.visible');
    cy.get(selectors.modalCloseButton).click();
    cy.get(selectors.modal).should('not.exist');
  });
  
  it('Собирается бургер и вызывается клик по кнопке «Оформить заказ»', () => {
    cy.contains(selectors.bunMockName).parent().find(selectors.addButton).click({ force: true });
    cy.contains(`${selectors.bunMockName} (верх)`).should('exist');
    cy.contains(`${selectors.bunMockName} (низ)`).should('exist');
  
    cy.contains(selectors.mainMockName).parent().find(selectors.addButton).click({ force: true });
    cy.contains(selectors.mainMockName).should('exist');
  
    cy.contains(selectors.button, selectors.OrderButtonName).click({ force: true });
    cy.contains(selectors.button, selectors.OrderButtonName).should('exist');
    cy.contains(selectors.orderMockNumber).should('exist');
  
    cy.get(selectors.modalCloseButton).click();
    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');
  });
  