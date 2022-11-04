import { useNavigate } from "react-router-dom";
import "./PlacedOrderMsg.scss";


interface Props {
  setMsg: (msg: boolean) => void;
}

function PlacedOrderMsg({setMsg}: Props) {
  const navigate = useNavigate();
  const doneBtn = () => {
    setMsg(false);
    navigate("/orders");
  };
  return (
    <div className="dark-msg-bg">
      <section className="msg-card">
        <p className="msg-text">Thank you for your order</p>
        <button className="msg-btn-orders" onClick={doneBtn}>
          Back to my orders
        </button>
      </section>
    </div>
  );
}

export default PlacedOrderMsg;
