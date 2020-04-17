describe('Loading the homepage', function () {
  this.beforeAll(() => {
    cy.visit('http://localhost:3000/');
  });
  it('should load homepage', () => {
    cy.url().should('eq', 'http://localhost:3000/');
  });
  it('should have table headers', () => {
    cy.contains('Title');
    cy.contains('Genres');
    cy.contains('Average Rating');
  });
  it('should click on genre and display genres', () => {
    cy.get('li').eq(1).click();
    cy.contains('Action Movies');
    cy.get('li').eq(2).click();
    cy.get('li').eq(3).click();
  });
  it('should click on movie and receive movie details', () => {
    cy.get('a.click-movie').first().click();
    cy.contains('User ID');
    cy.contains('Rating');
    cy.contains('Time');
  });
  it('should display 5 latest ratings', () => {
    cy.get('tbody').children().should('have.length', 5);
  });
});
