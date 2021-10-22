// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it('should Visits the app root url', () => {
    cy.visit("http://localhost:8080");
    cy.contains("h1", "Random Dog Images");
  });

  it("should change counter when button is pressed", () => {
    cy.get("#myCounter").click();
    cy.contains("h2", "Dog Count 2");
  });
});
