const API_URL = 'https://norma.nomoreparties.space/api' 
  
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

    cy.visit('http://localhost:5173');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  it('Список ингредиентов доступен для выбора', () => {
    cy.contains('Краторная булка N-200i').should('be.visible');
    cy.contains('Филе Люминесцентного тетраодонтимформа').scrollIntoView().should('be.visible');
    cy.contains('Соус Spicy-X').scrollIntoView().should('be.visible');
  });

  it('Булку можно добавить в конструктор через кнопку «Добавить»', () => {
    cy.contains('Краторная булка N-200i').should('be.visible');
    cy.contains('Краторная булка N-200i').parent().find('.common_button').click({ force: true })
  
    cy.contains('Краторная булка N-200i (верх)').should('exist');
    cy.contains('Краторная булка N-200i (низ)').should('exist');
  });
  
  it('Открытие модального окна ингредиента', () => {
    cy.contains('Краторная булка N-200i').click({ force: true });
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal-title"]').should('contain.text', 'Ingredient Details');
  });

  it('Закрытие модального окна по клику на крестик', () => {
    cy.contains('Краторная булка N-200i').click({ force: true });
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal-close-button"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('Собирается бургер и вызывается клик по кнопке «Оформить заказ»', () => {
    cy.contains('Краторная булка N-200i').parent().find('.common_button').click({ force: true })
    cy.contains('Краторная булка N-200i (верх)').should('exist');
    cy.contains('Краторная булка N-200i (низ)').should('exist');

    cy.contains('Филе Люминесцентного тетраодонтимформа').parent().find('.common_button').click({ force: true });
    cy.contains('Филе Люминесцентного тетраодонтимформа').should('exist');

    cy.contains('button', 'Оформить заказ').click({ force: true });
    cy.contains('button', 'Оформить заказ').should('exist');
    cy.contains('12345').should('exist');

    cy.get('[data-testid="modal-close-button"]').click();
    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');
  });
