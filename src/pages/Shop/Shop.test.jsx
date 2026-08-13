import Shop from "./Shop";
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

function renderShop(initialCart = []) {
  const router = createMemoryRouter([
    {
      path: "/",
      element: <TestWrapper initialCart={initialCart} />,
      children: [{ path: "/", element: <Shop /> }],
    },
  ]);

  return render(<RouterProvider router={router} />);
}

describe("Shopping page", () => {
  it("calls the correct api when fetching products", () => {
    const fetchSpy = vi.spyOn(window, "fetch").mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    renderShop([]);

    expect(fetchSpy).toHaveBeenCalledWith("https://fakestoreapi.com/products");
  });
  
  it("renders 'A network error was encountered' when items fail to load", async () => {
    vi.spyOn(window, "fetch").mockRejectedValue(new Error("Network error"));

    renderShop([
      {
        id: 1,
        title: "Test Item",
        image: "",
        category: "",
        rating: { rate: 4 },
        price: 10,
        quantity: 3,
      },
    ]);

    const text = await screen.findByText("A network error was encountered");
    expect(text).toBeInTheDocument();
  });

  it("renders 'Server Error' when request received with an error", async () => {
    vi.spyOn(window, "fetch").mockResolvedValue({
      ok: false,
      json: async () => [],
    });

    renderShop([
      {
        id: 1,
        title: "Test Item",
        image: "",
        category: "",
        rating: { rate: 4 },
        price: 10,
        quantity: 3,
      },
    ]);

    const text = await screen.findByText("A network error was encountered");
    expect(text).toBeInTheDocument();
  });

  it("renders 'Loading...' while items are being fetched", async () => {
    vi.spyOn(window, "fetch").mockReturnValue(new Promise(() => {}));

    renderShop([
      {
        id: 1,
        title: "Test Item",
        quantity: 3,
      },
    ]);

    const loading = await screen.findByText("Loading ...");
    expect(loading).toBeInTheDocument();
  });

  it("renders all fetched items", async () => {
    vi.spyOn(window, "fetch").mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: 1,
          title: "Test Item 1",
          image: "",
          category: "",
          rating: { rate: 4 },
          price: 10,
        },
        {
          id: 2,
          title: "Test Item 2",
          image: "",
          category: "",
          rating: { rate: 5 },
          price: 20,
        },
      ],
    });

    renderShop([]);

    expect(await screen.findByText("Test Item 1")).toBeInTheDocument();
    expect(await screen.findByText("Test Item 2")).toBeInTheDocument();
  });

  it("renders fetched items with their corresponding cart quantities", async () => {
    vi.spyOn(window, "fetch").mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: 1,
          title: "Test Item 1",
          image: "",
          category: "",
          rating: { rate: 4 },
          price: 10,
        },
        {
          id: 2,
          title: "Test Item 2",
          image: "",
          category: "",
          rating: { rate: 5 },
          price: 20,
        },
      ],
    });

    renderShop([
      {
        id: 2,
        title: "Test Item 2",
        image: "",
        category: "",
        rating: { rate: 5 },
        price: 20,
        quantity: 3,
      },
    ]);

    await screen.findByText("Test Item 1");
    await screen.findByText("Test Item 2");

    const inputs = screen.getAllByRole("spinbutton");
    const values = inputs.map((input) => input.value);

    expect(values).toEqual(["0", "3"]);
  });

  it("renders items from the fetched list if they're not already in cart", async () => {
    vi.spyOn(window, "fetch").mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: 1,
          title: "Test Item",
          image: "",
          category: "",
          rating: { rate: 4 },
          price: 10,
        },
      ],
    });

    renderShop([]);

    const title = await screen.findByRole("heading", { level: 2 });
    const quantityInput = await screen.findByRole("spinbutton");

    expect(title).toHaveTextContent("Test Item");
    expect(quantityInput).toHaveValue(0);
  });
});
