import { useNavigate } from "react-router-dom";
import closeBtn from "../../assets/close-overlay-button.svg";
import "./PlacedOrderMsg.scss";

interface Props {
  setMsg: (msg: boolean) => void;
}

function PlacedOrderMsg({ setMsg }: Props) {
  const navigate = useNavigate();
  const doneBtn = () => {
    setMsg(false);
    navigate("/orders");
  };
  return (
    <div className="dark-msg-bg">
      <section className="msg-card">
        <p className="msg-text">Thank you for your order</p>
        <img className="msg-btn-orders" src={closeBtn} onClick={doneBtn} />
        Back to my orders
      </section>
    </div>
  );
}

export default PlacedOrderMsg;
