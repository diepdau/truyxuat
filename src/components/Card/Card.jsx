import { Link } from "react-router-dom";
import "./Card.css";

function Card({ item }) {
  return (
    <div className="cardIdentify">
       <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.imageUrl[0]} alt="" />
      </Link>
       
        <div className="bottom">
        <p className="address">
          <span>{item.content}</span>
        </p>
        <Link to={`/${item.id}`}>{item.linkUrl}</Link>
        </div>
    </div>
  );
}

export default Card;