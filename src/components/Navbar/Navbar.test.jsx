import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Navbar from "./Navbar";
import { MemoryRouter } from "react-router";

describe("Navbar component", () => {
  it("should contain links for home, shop, and cart", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Shop" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cart" })).toBeInTheDocument();
  });

  it("should link to the correct routes", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );

    expect(screen.getByRole("link", { name: "Shop" })).toHaveAttribute(
      "href",
      "/shop",
    );

    expect(screen.getByRole("link", { name: "Cart" })).toHaveAttribute(
      "href",
      "/cart",
    );
  });

  it("should not display any number next to 'Cart' if the cart is empty", () => {
    render(
      <MemoryRouter>
        <Navbar cartCount={0} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Cart" })).toHaveTextContent(
      "Cart",
    );
  });

  it("should not display any number next to 'Cart' if the count is negative", () => {
    render(
      <MemoryRouter>
        <Navbar cartCount={-1} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Cart" })).toHaveTextContent(
      "Cart",
    );
  });

  it("should display a number next to 'Cart' representing the number of items in the cart", () => {
    render(
      <MemoryRouter>
        <Navbar cartCount={3} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Cart (3)" })).toBeInTheDocument();
  });
});
