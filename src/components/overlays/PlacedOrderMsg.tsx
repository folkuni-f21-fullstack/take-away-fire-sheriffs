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
        <section className="msg-card-header">
          <p className="card-date">2022-10-07 kl 16:38</p>
          <p className="order-number">Ordernr 1001</p>
        </section>

        <p className="msg-text">Thank you for your order</p>

        <button className="msg-btn-orders" onClick={doneBtn}>
          Back to my orders
        </button>
      </section>
    </div>
  );
}

export default PlacedOrderMsg;
