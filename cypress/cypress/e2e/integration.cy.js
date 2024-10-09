describe('Testando o Sistema de Reserva de Salas', () => {
  it('Deve permitir que o usuário faça login e reserve uma sala', () => {
    // Visitar a página de login
    cy.visit('http://localhost:3000');

    // Preencher o formulário de login
    cy.get('#identifier').type('gustavo@gmail.com');
    cy.get('#password').type('123guga');
    cy.get('button[type="submit"]').click();

    // Verificar se o login foi bem-sucedido
    cy.url().should('include', '/dashboard');

    // Selecionar uma data no calendário
    cy.get('#calendar-btn').click(); // Abrir o calendário
    cy.get('#calendar-input').click();
    cy.get('.flatpickr-day').contains('18').click(); // Seleciona o dia 15 do mês

    // Selecionar a sala e horário para reserva
    cy.get('.room-btn[data-room="Sala 1"]').click();

    // Verificar se o contêiner de horários existe
    cy.get('#available-slots').should('exist');

    // Selecionar o horário disponível
    cy.get('.time-btn[data-time="7:00-8:40"]').click();

    // Confirmar a reserva
    cy.get('#confirm-reservation').click();

    // Verificar se o extrato de reserva aparece corretamente
    cy.get('#user-name').should('contain', 'John Doe');
    cy.get('#reserved-room').should('contain', 'Sala 1');
  });
});
