import { useContext } from "react";
import "./style.css";
import { ThemeContext } from "../../App";

const FavoriteItem = (props) => {

  const { id, image, title, removeFromFavorite} = props;
  const {theme} = useContext(ThemeContext);

  return (
    <div key={id} className="favorite-item">
      <div>
        <img src={image} alt="recipe-image" />
      </div>

      <p style={theme ? {color: "#12343b"}: {}}>{title}</p>

      <button style={theme ? {backgroundColor: "#12343b"}: {}} type="button" onClick={removeFromFavorite}>Remove From favorites</button>
    </div>
  );
};

export default FavoriteItem;
