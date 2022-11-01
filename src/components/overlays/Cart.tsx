import "./Cart.scss";
import CartItem from "../../components/CartItem";
import Msg from "../../components/overlays/PlacedOrderMsg";
import { useShoppingCart } from "../MenuItem";
import { Menu } from "../../models/models";
import { useState } from "react";

interface Props {
  menuItem: Menu;
  activeUser: string;
}
interface Props {
  closeOverlay: (close: boolean) => void;
}

export function Cart({ closeOverlay, activeUser }: Props) {
  const [userComment, setUserComment] = useState<string>("");
  const [msg, setMsg] = useState<boolean>(false);
  const { cartItems } = useShoppingCart();
  const { emptyCart } = useShoppingCart();

  const closeBtn = () => {
    closeOverlay(false);
  };
  console.log("cart User", activeUser);

  const placeOrderBtn = async () => {
    const localOrder = localStorage.getItem("shopping-cart");

    const query = {
      username: activeUser,
      neworder: localOrder,
      usercomment: userComment,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    };
    console.log(localOrder);
    console.log(query);

    emptyCart();
    setMsg(true);
    const response = await fetch("api/orders/saveorder", requestOptions);
  };

  let totalPrice = cartItems.reduce((total, cartItem) => {
    return total + (cartItem.price || 0) * cartItem.quantity;
  }, 0);

  return (
    <section className="cart-overlay-container">
      {msg == true ? (
        <Msg />
      ) : (
        <div className="cart-container">
          <div className="cart-upper-container">
            <h1 className="cart-title">Cart</h1>
            <img
              src="src\assets\close-overlay-button.svg"
              alt=""
              onClick={closeBtn}
              className="close-overlay-btn"
            />
          </div>

          {cartItems.map((item) => (
            <CartItem key={item.id} menuItem={item} />
          ))}

          {totalPrice <= 0 ? null : (
            <h2 className="cart-total">
              {" "}
              Total: {""}
              {totalPrice}:-
            </h2>
          )}

          {totalPrice <= 0 ? (
            <h2 className="cart-total"> Cart is Empty</h2>
          ) : (
            <input
              className="user-comment-input"
              type="text"
              placeholder="Any extra info about the order?"
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
            />
          )}

          {totalPrice <= 0 ? null : (
            <button className="cart-buttons" onClick={placeOrderBtn}>
              Place Order
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export default Cart;
