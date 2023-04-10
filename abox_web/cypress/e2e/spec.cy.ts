describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })

  it('jumping to auction', () => {
    cy.get('.auction').first().click()
  })

  it('cick on btn', () => {
    
  })
})