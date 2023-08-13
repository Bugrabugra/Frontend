describe('Fundamentals test', () => {
  beforeEach(() => {
    cy.visit("/fundamentals")
  })

  it('Contains correct header text', () => {
    // cy.get('[data-test="fundamentals-header"]').contains(/Testing Fundamentals/i)
    // cy.get('[data-test="fundamentals-header"]').should("contain.text", "Testing Fundamentals")
    cy.getDataTest("fundamentals-header").should("contain.text", "Testing Fundamentals")
  })
  it('Accordion works correctly', () => {
    cy.contains(/Your tests will exist in a describe block/i).should("not.be.visible")
    cy.get('[data-test="accordion-item-1"] div[role="button"]').click()
    cy.contains(/Your tests will exist in a describe block/i).should("be.visible")
    cy.get('[data-test="accordion-item-1"] div[role="button"').click()
    cy.contains(/Your tests will exist in a describe block/i).should("not.be.visible")
  })
})
