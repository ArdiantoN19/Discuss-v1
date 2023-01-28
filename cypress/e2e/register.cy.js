/**
 * Skenario test
 *
 *  - Register spec
 *   - should display register page correctly
 *   - should display invalid element when input name no match with pattern
 *   - should display invalid element when input email no match with pattern
 *   - should display invalid element when input password no match with pattern
 *   - should display alert when email is already taken
 *   - should display login page when register success
 */

describe("Register spec", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("should display register page correctly", () => {
    cy.get("h2").should("contain", "Register");
    cy.get("input[placeholder=Name]").should("be.visible");
    cy.get("input[placeholder=Email]").should("be.visible");
    cy.get("input[placeholder=Password]").should("be.visible");
    cy.get("button")
      .contains(/^Register$/)
      .should("be.disabled");
  });

  it("should display invalid elemen when input name no match with pattern", () => {
    cy.get("input[placeholder=Name]").type("name");
    cy.get("span")
      .should("contain", "Name must be 5 character")
      .and("be.visible");
  });

  it("should display invalid elemen when input email no match with pattern", () => {
    cy.get("input[placeholder=Email]").type("email");
    cy.get("span")
      .should("contain", "Must be input a valid email")
      .and("be.visible");
  });

  it("should display invalid elemen when input password no match with pattern", () => {
    cy.get("input[placeholder=Password]").type("pass");
    cy.get("span")
      .should("contain", "Password must be 6 character")
      .and("be.visible");
  });

  it("should display alert when email is already taken", () => {
    cy.get("input[placeholder=Name]").type("testCoba1");
    cy.get("input[placeholder=Email]").type("testEmail@test.com");
    cy.get("input[placeholder=Password]").type("testPassword");

    cy.get("button")
      .contains(/^Register$/)
      .should("not.be.disabled")
      .click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal("email is already taken");
    });
  });

  it("should display login page when register success", () => {
    const random = Math.floor(Math.random() * 100);
    cy.get("input[placeholder=Name]").type(`testCoba${random}`);
    cy.get("input[placeholder=Email]").type(`testEmail${random}@test.com`);
    cy.get("input[placeholder=Password]").type("testPassword");

    cy.get("button")
      .contains(/^Register$/)
      .and("not.be.disabled")
      .click();

    cy.url().should("include", "/login");
    cy.get("h2").should("contain", "Login");
  });
});
