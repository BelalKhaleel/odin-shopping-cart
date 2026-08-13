import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useState } from "react";
import Card from "./Card";
import userEvent from "@testing-library/user-event";

describe("Card component", () => {
  function TestWrapper({ initialCart = [] }) {
    const [cart, setCart] = useState(initialCart);
    const item = { id: 1 };
    const otherItem = cart.find((product) => product.id === 2);

    const handleAddToCartClick = (quantity, item) => {
      if (quantity <= 0) return;
      if (cart.some((product) => product.id === item.id)) {
        const newCart = cart.map((product) =>
          product.id === item.id
            ? { ...product, quantity: quantity }
            : product,
        );
        setCart(newCart);
      } else {
        setCart([...cart, { ...item, quantity: quantity }]);
      }
    };

    return (
      <>
        <span data-testid="cart-length">{cart.length}</span>
        <span data-testid="other-item-quantity">{otherItem?.quantity}</span>
        <Card
          item={item}
          quantity={cart.find((product) => product.id === item.id)?.quantity}
          cart={cart}
          updateCart={setCart}
          isShopping={true}
          onAddToCartBtnClick={handleAddToCartClick}
        />
      </>
    );
  }

  it("renders the card's title, category, description, rating, price, image url, alt text, width, and height", () => {
    render(
      <Card
        title="Brown leather jacket"
        category="men's clothes"
        description="dark brown winter leather jacket for men"
        rating="3.9"
        price="59$"
        imgUrl="/assets/images/brown-jacket.png"
        altText="brown jacket"
        width="200"
        height="300"
      />,
    );

    const img = screen.getByRole("img", { name: "brown jacket" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/assets/images/brown-jacket.png");
    expect(img).toHaveAttribute("alt", "brown jacket");
    expect(img).toHaveAttribute("width", "200");
    expect(img).toHaveAttribute("height", "300");

    const header = screen.getByRole("heading", { level: 2 });
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Brown leather jacket");

    const category = screen.getByText(/men's clothes/);
    expect(category).toBeInTheDocument();

    const description = screen.getByText(
      /dark brown winter leather jacket for men/,
    );
    expect(description).toBeInTheDocument();

    const rating = screen.getByText(/3\.9/);
    expect(rating).toBeInTheDocument();

    const price = screen.getByText(/59\$/);
    expect(price).toBeInTheDocument();
  });

  it("changes input value when user types", async () => {
    const user = userEvent.setup();
    render(<Card />);

    const input = screen.getByRole("spinbutton");
    await user.type(input, "2");

    expect(input).toHaveValue(2);
  });

  it("input does not accept negative values when user types", async () => {
    const user = userEvent.setup();
    render(<Card />);

    const input = screen.getByRole("spinbutton");
    await user.type(input, "-");

    expect(input).toHaveValue(0);
  });

  it("renders increment and decrement buttons", () => {
    render(<Card />);

    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
  });

  it("renders 'Add to cart' button when isShopping is true", () => {
    render(<Card isShopping={true} />);

    expect(
      screen.getByRole("button", { name: "Add to cart" }),
    ).toBeInTheDocument();
  });

  it("does not render 'Add to cart' button when isShopping is false", () => {
    render(<Card isShopping={false} />);

    expect(
      screen.queryByRole("button", { name: "Add to cart" }),
    ).not.toBeInTheDocument();
  });

  it("calls onAddToCartBtnClick function when 'Add to cart' button is clicked", async () => {
    const user = userEvent.setup();
    const mock = vi.fn();
    const item = {
      id: 1
    }
    render(<Card isShopping={true} onAddToCartBtnClick={mock} item={item}/>);

    const addToCartButton = screen.getByRole("button", { name: "Add to cart" });
    const plusButton = screen.getByRole("button", { name: "+" });

    await user.click(plusButton);
    await user.click(addToCartButton);

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith(1, item);
  });

  it("does not call onAddToCartBtnClick function when isShopping is false", () => {
    const mock = vi.fn();
    render(<Card isShopping={false} onAddToCartBtnClick={mock} />);

    expect(mock).not.toHaveBeenCalled();
  });

  it("adds an item to the cart when 'Add to cart' button is clicked", async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);

    const addToCartBtn = screen.getByRole("button", { name: "Add to cart" });
    const plusButton = screen.getByRole("button", { name: "+" });

    await user.click(plusButton);

    await user.click(addToCartBtn);

    expect(screen.getByTestId("cart-length")).toHaveTextContent("1");
  });

  it("value starts at 0", () => {
    render(<Card />);

    const input = screen.getByRole("spinbutton");

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(0);
  });

  it("value increments when '+' button is pressed", async () => {
    const user = userEvent.setup();

    render(<Card />);

    const input = screen.getByRole("spinbutton");
    const button = screen.getByRole("button", { name: "+" });

    await user.click(button);
    expect(input).toHaveValue(1);
  });

  it("value does not change when '-' button is clicked if it's still 0", async () => {
    const user = userEvent.setup();

    render(<Card />);

    const input = screen.getByRole("spinbutton");
    const button = screen.getByRole("button", { name: "-" });

    await user.click(button);
    expect(input).toHaveValue(0);
  });

  it("value decrements when '-' button is clicked if it's still greater than 0", async () => {
    const user = userEvent.setup();

    render(<Card />);

    const input = screen.getByRole("spinbutton");
    const plusButton = screen.getByRole("button", { name: "+" });
    const minusButton = screen.getByRole("button", { name: "-" });

    await user.click(plusButton);
    await user.click(minusButton);
    expect(input).toHaveValue(0);
  });

  it("value increments correctly when user types then presses the '+' button", async () => {
    const user = userEvent.setup();

    render(<Card />);

    const input = screen.getByRole("spinbutton");
    const plusButton = screen.getByRole("button", { name: "+" });

    await user.type(input, "2");
    await user.click(plusButton);

    expect(input).toHaveValue(3);
  });

  it("value decrements correctly when user types then presses the '-' button", async () => {
    const user = userEvent.setup();

    render(<Card />);

    const input = screen.getByRole("spinbutton");
    const minusButton = screen.getByRole("button", { name: "-" });

    await user.type(input, "2");
    await user.click(minusButton);

    expect(input).toHaveValue(1);
  });

  it("quantity of item in cart increments when '+' button is pressed", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper
        initialCart={[
          { id: 1, quantity: 1 },
          { id: 2, quantity: 2 },
        ]}
      />,
    );

    const plusButton = screen.getByRole("button", { name: "+" });
    await user.click(plusButton);

    expect(screen.getByRole("spinbutton")).toHaveValue(2);
  });

  it("quantity of item in cart decrements when '-' button is pressed", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper
        initialCart={[
          { id: 1, quantity: 1 },
          { id: 2, quantity: 2 },
        ]}
      />,
    );

    const plusButton = screen.getByRole("button", { name: "+" });
    const minusButton = screen.getByRole("button", { name: "-" });
    await user.click(plusButton);
    await user.click(minusButton);

    expect(screen.getByRole("spinbutton")).toHaveValue(1);
  });

  it("incrementing one item's quantity does not affect another item in the cart", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper
        initialCart={[
          { id: 1, quantity: 1 },
          { id: 2, quantity: 2 },
        ]}
      />,
    );

    const plusButton = screen.getByRole("button", { name: "+" });
    await user.click(plusButton);

    expect(screen.getByRole("spinbutton")).toHaveValue(2);
    expect(screen.getByTestId("other-item-quantity")).toHaveTextContent("2");
  });

  it("item is removed from cart if quantity is 1 and the '-' button is pressed", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper
        initialCart={[
          { id: 1, quantity: 1 },
          { id: 2, quantity: 2 },
        ]}
      />,
    );

    const minusButton = screen.getByRole("button", { name: "-" });
    await user.click(minusButton);

    expect(screen.getByRole("spinbutton")).toHaveValue(0);
    expect(screen.getByTestId("cart-length")).toHaveTextContent("1");
  });
});
