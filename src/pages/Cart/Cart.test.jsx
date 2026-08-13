import Cart from "./Cart";
import { createMemoryRouter, RouterProvider, Outlet } from "react-router";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

function TestWrapper({ initialCart = [] }) {
  const fakeContext = {
    cart: initialCart,
    setCart: vi.fn(),
    setCartCount: vi.fn(),
    isShopping: true,
    setIsShopping: vi.fn(),
  };

  return <Outlet context={fakeContext} />;
}

function renderCart(initialCart = []) {
  const router = createMemoryRouter([
    {
      path: "/",
      element: <TestWrapper initialCart={initialCart} />,
      children: [{ path: "/", element: <Cart /> }],
    },
  ]);

  return render(<RouterProvider router={router} />);
}

describe("Cart page", () => {
  it("does not render any card if cart is empty", () => {
    renderCart([]);
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  it("renders a Card for each item in the cart", () => {
    renderCart([
      {
        id: 1,
        title: "Test Item 1",
        image: "",
        category: "Men's clothing",
        rating: { rate: 4 },
        price: 10,
        quantity: 4,
      },
      {
        id: 2,
        title: "Test Item 2",
        image: "",
        category: "Women's clothing",
        rating: { rate: 5 },
        price: 20,
        quantity: 3,
      },
    ]);

    const cards = screen.getAllByRole("heading", { level: 2 });
    expect(cards).toHaveLength(2);

    expect(screen.getByText("Test Item 1")).toBeInTheDocument();
    expect(screen.getByText("Test Item 2")).toBeInTheDocument();

    const inputs = screen.getAllByRole("spinbutton");
    const values = inputs.map((input) => input.value);

    expect(values).toEqual(["4", "3"]);
  });
})