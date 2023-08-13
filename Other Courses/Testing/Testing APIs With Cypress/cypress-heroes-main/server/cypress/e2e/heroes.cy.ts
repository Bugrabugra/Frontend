describe("heroes endpoint", () => {
  it("get all the heroes", () => {
    // cy.request("/heroes").its("status").should("equal", 200);
    cy.api("/heroes");
    cy.api("/heroes").its("status").should("equal", 200);
    cy.api("/heroes")
      .its("body")
      .then((body) => {
        expect(body.length).to.have.greaterThan(0);
      });
  });

  it("should create hero", () => {
    cy.api({
      method: "POST",
      url: "/auth",
      body: {
        username: "admin@test.com",
        password: "test123"
      }
    }).then((response) => {
      const accessToken = response.body.access_token;

      cy.wrap(response.body.access_token).as("accessToken");
      cy.api({
        method: "POST",
        url: "/heroes",
        body: {
          name: "Test hero",
          price: 1,
          saves: 1,
          fans: 1,
          powers: [1]
        },
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      });
    });
  });
});
