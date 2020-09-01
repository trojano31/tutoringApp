/// <reference types="Cypress" />

let basicPage = "http://localhost:3000";
let loginPage = "/login";
let page = basicPage + loginPage;
let login = Math.random().toString(36).substring(7);
let email = login + "@mail.com";
let password = Math.random().toString(36).substr(2, 15);

describe("Czy strona login poprawnie sie laduja w ogole", () => {
  it("should open login page", () => {
    cy.visit(page);
  });
});

describe("Czy link jest poprawny", () => {
  it("should check url", () => {
    cy.url().should("eq", page);
  });
});

describe("Czy poprawnie wyświetla teskt odnośnie zapomnianego hasła oraz założenia konta", () => {
  it("should get forget password txt", () => {
    cy.get(".MuiGrid-grid-xs-true > .MuiTypography-root").should(
      "have.text",
      "Forgot password?"
    );
  });
  it("should get dont have an account text", () => {
    cy.get(":nth-child(2) > .MuiTypography-root").should(
      "have.text",
      "Don't have an account? Sign Up"
    );
  });
});

describe("Czy poprawnie jest wyrenderowany formularz", () => {
  it("should get email input", () => {
    cy.get("#email");
  });
  it("should get password input", () => {
    cy.get("#password");
  });
  it("should get button sign up", () => {
    cy.get(".makeStyles-form-4 > .MuiButtonBase-root");
  });
});

describe("Loguje się na konto", () => {
  it("should get email input", () => {
    cy.get("#email").type(email);
  });
  it("should get password input", () => {
    cy.get("#password").type(password);
  });
  it("should get button sign up", () => {
    cy.get(".makeStyles-form-4 > .MuiButtonBase-root").click();
  });
  it("should return info from cogotoast", () => {
    cy.get(".ct-toast")
      .should("be.visible")
      .should("have.text", "Wrong login or password");
  });
});
