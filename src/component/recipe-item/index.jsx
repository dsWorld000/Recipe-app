import { useContext } from "react";
import "./style.css";
import { ThemeContext } from "../../App";

const RecipeItem = (props) => {
  console.log(props, "recipe-item-props");

  const { id, image, title, addToFavorites } = props;
  const {theme} = useContext(ThemeContext)

  return (
    <div key={id} className="recipe-item">
      <div>
        <img src={image} alt="recipe-image" />
      </div>

      <p style={theme ? {color: "#12343b"}: {}}>{title}</p>

      <button style={theme ? {backgroundColor: "#12343b"}: {}} type="button" onClick={addToFavorites}>Add to favorites</button>
    </div>
  );
};

export default RecipeItem;
