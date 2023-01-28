/**
 * Scenario test
 *
 *  - Login spec
 *   - should display login page correctly
 *   - should display alert when Email and Password are wrong
 *   - should display homepage when Email and Password are correct
 */

describe("Login spec", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should display login page correctly", () => {
    cy.get("h2").should("contain", "Login");
    cy.get("input[placeholder=Email]").should("be.visible");
    cy.get("input[placeholder=Password]").should("be.visible");
    cy.get("button")
      .contains(/^Login$/)
      .should("be.visible")
      .and("be.disabled");
  });

  it("should display alert when email and password are wrong", () => {
    cy.get("input[placeholder=Email]").type("testEmail@gmail.com");
    cy.get("input[placeholder=Password]").type("testPassword{enter}");

    cy.on("window:alert", (str) => {
      expect(str).to.equal("email or password is wrong");
    });
  });

  it("should display homepage when email and password are correct", () => {
    cy.get("input[placeholder=Email]").type("coba123@gmail.com");
    cy.get("input[placeholder=Password]").type("coba123{enter}");

    cy.url().should("include", "/");
    cy.get("nav").should("contain", "Logout");
    cy.get("a[id=tambah]").should("be.visible");
  });
});
