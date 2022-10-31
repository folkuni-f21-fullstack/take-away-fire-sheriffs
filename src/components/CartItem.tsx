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
export function CartItem({ menuItem }:Props) {

  const {
    decreaseCartQuantity,
    increaseCartQuantity,
    getItemQuantity,
  } = useShoppingCart();

  return (
    <section className="card-dish">
      <section className="card-dish-title">
        <p> {menuItem.title} </p>
        <p className="cart-price"> {menuItem.price}:-</p>
        
      </section>

      <section className="card-dish-add-remove">
      <p className="item-quantity"> x{getItemQuantity(menuItem.id)}</p>
        <button
          className="remove-dish-btn"
          onClick={() => decreaseCartQuantity(menuItem.id)}
        >
          -
        </button>
        
        <button
          className="add-dish-btn"
          onClick={() =>
            increaseCartQuantity(
              menuItem.id,
              menuItem.title,
              menuItem.price,
              getItemQuantity(menuItem.id)
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
