import "./CartItem.scss";
import { Menu } from "../models/models";
import { useShoppingCart } from "./MenuItem";

interface Props {
  menuItem: Menu;
}

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

export function CartItem({ menuItem }: Props) {
  const { decreaseCartQuantity } = useShoppingCart();
  const { increaseCartQuantity } = useShoppingCart();
  const { cartQuantity } = useShoppingCart();

  return (
    <section className="card-dish">
      <section className="card-dish-title">
        <p> {menuItem.title} </p>
        <p> {menuItem.price}:-</p>
      </section>

      <section className="card-dish-add-remove">
        <button
          className="remove-dish-btn"
          onClick={() => decreaseCartQuantity(menuItem.id)}
        >
          -
        </button>
        <p> {cartQuantity}</p>
        <button
          className="add-dish-btn"
          onClick={() =>
            increaseCartQuantity(
              menuItem.id,
              menuItem.title,
              menuItem.price,
              cartQuantity
            )
          }
        >
          +
        </button>
      </section>
    </section>
  );
}

export default CartItem;
