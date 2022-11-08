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
    <section className="edit-order-item-element">
        <p className="item-title"> {menuItem.title} </p>
      <section className="edit-details">
        <p> {menuItem.price}:-</p>
        <p> x{getItemQuantity(menuItem.id)}</p>
        <section className="card-add-remove-btns">
          <button
            className="card-btn-decrease"
            onClick={() => decreaseCartQuantity(menuItem.id)}
            >
            -
          </button>
          
          <button
            className="card-btn-increase"
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
    </section>
  );
}

export default CartItem;
