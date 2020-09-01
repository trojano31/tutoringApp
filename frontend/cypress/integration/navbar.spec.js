let basicPage = "http://localhost:3000";
let signUp = "/signup";
let login = "/login";
let page = basicPage + signUp;

describe("Czy navbar działa poprawnie jest poprawny", () => {
  it("should check buttons", () => {
    cy.visit(page);
    cy.get('[href="/signup"]').should("have.text", "SignUp");
    cy.get('[href="/login"]').should("have.text", "Login");
  });
});

describe("Czy przyciski po kliknieciu kieruja w dobry adres", () => {
  it("should click login button", () => {
    cy.get('[href="/login"]').click();
  });
  it("should check url", () => {
    cy.url().should("eq", basicPage + login);
  });
  it("should click sign up button", () => {
    cy.get('[href="/signup"]').click();
  });
  it("should check url", () => {
    cy.url().should("eq", basicPage + signUp);
  });
});
