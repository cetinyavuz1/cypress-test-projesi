describe('test', () => {
  it('Form doldurulup gönderildiğinde success sayfası açılıyor mu?', () => {
    cy.visit('http://localhost:5173/')
    cy.get(`input[name="email"]`).type("erdem.guntay@wit.com.tr")
    cy.get(`input[name="password"]`).type("9fxIH0GXesEwH_I")
    cy.get(`input[type="checkbox"]`).check()
    cy.get(`button[type="submit"]`).click()

    cy.url().should("include", "/Success")
  })
})