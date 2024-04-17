import React, {
  // useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import Search from "../../component/search";
import RecipeItem from "../../component/recipe-item";
import "./style.css";
import FavoriteItem from "../../component/favorite-item";
import { ThemeContext } from "../../App";

const reducer = (state, action) => {
  switch (action.type) {
    case "filterFavorites":
      console.log(action);
      return {
        ...state,
        filterdValue: action.value,
      };

    default:
      return state;
  }
};

const intialState = {
  filterdValue: "",
};

function Homepage() {
  //loading state
  const [loadingState, setLodingState] = useState(false);

  //Save results that we recive from api
  const [recipes, setRecipes] = useState([]);

  //favorite data state
  const [favorites, setFavorites] = useState([]);

  // state for API success or not
  const [apiCalledSuccess, setApiCalledSuccess] = useState(false);

  // use Reducer functionality
  const [filteredState, dispatch] = useReducer(reducer, intialState);

  const { theme } = useContext(ThemeContext);

  const getDataFromSearchComponent = (getData) => {
    //keep the loading state as true before we are calling the API
    setLodingState(true);
    console.log(getData, "getdata");

    //Calling the API
    async function getRecipes() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=49e49ea880404bbfaae2244f8ed7c2f4&query=${getData}`
      );
      const result = await apiResponse.json();
      const { results } = result;

      if (results && results.length > 0) {
        //set loading state as false again
        //set the recipes state

        setLodingState(false);
        setRecipes(results);
        setApiCalledSuccess(true);
      }

      // console.log(result);
    }

    getRecipes();
  };

  // console.log(loadingState, recipes, "LOL");

  const addToFavorites = (getCurrentRecipeItem) => {
    // console.log(getCurrentRecipeItem);
    let cpyFavorites = [...favorites];

    const index = cpyFavorites.findIndex(
      (item) => item.id === getCurrentRecipeItem.id
    );
    // console.log(index);
    if (index === -1) {
      cpyFavorites.push(getCurrentRecipeItem);
      setFavorites(cpyFavorites);
      //save the favorite in localstorage
      localStorage.setItem("favorites", JSON.stringify(cpyFavorites));
    } else {
      alert("Item is already present in favorites");
    }
  };
  console.log(favorites);

  const removeFromFavorite = (getCurrentId) => {
    let cpyFavorites = [...favorites];
    cpyFavorites = cpyFavorites.filter((item) => item.id !== getCurrentId);
    console.log(cpyFavorites);

    setFavorites(cpyFavorites);
    localStorage.setItem("favorites", JSON.stringify(cpyFavorites));
  };

  useEffect(() => {
    console.log("only one time runs page load");
    const extractFavoritesFromLocalStorageOnPageLoad = JSON.parse(
      localStorage.getItem("favorites")
    );
    setFavorites(extractFavoritesFromLocalStorageOnPageLoad);
  }, []);
  console.log(filteredState);

  //filter the favorites
  const filteredFavoritesItems = favorites.filter((item) =>
    item.title.toLowerCase().includes(filteredState.filterdValue)
  );

  // const renderRecipe = useCallback(() => {
  //   if (recipes && recipes.length > 0) {
  //     return recipes.map((item) => (
  //       <RecipeItem
  //         addToFavorites={() => addToFavorites(item)}
  //         id={item.id}
  //         image={item.image}
  //         title={item.title}
  //       />
  //     ));
  //   }
  // }, [recipes]);

  return (
    <div className="homepage">
      <Search
        getDataFromSearchComponent={getDataFromSearchComponent}
        apiCalledSuccess={apiCalledSuccess}
        setApiCalledSuccess={setApiCalledSuccess}
      />

      {/* {Show favorites items} */}

      <div className="favorites-wrapper">
        <h1
          style={theme ? { color: "#12343b" } : {}}
          className="favorites-title"
        >
          Favorites
        </h1>
        <div className="search-favorites">
          <input
            onChange={(event) =>
              dispatch({ type: "filterFavorites", value: event.target.value })
            }
            value={filteredState.filterdValue}
            type="text"
            name="searchfavorites"
            placeholder="Search Favorites"
          />
        </div>
        <div className="favorites">
          {
            !filteredFavoritesItems.length && <div className="no-items">No favorites are found</div>
          }
          {filteredFavoritesItems && filteredFavoritesItems.length > 0
            ? filteredFavoritesItems.map((item) => (
                <FavoriteItem
                  removeFromFavorite={() => removeFromFavorite(item.id)}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                />
              ))
            : null}
        </div>
      </div>
      

      {/* {Show favorites items} */}

      {/* {show loading state} */}

      {loadingState && (
        <div className="loading">Loding recipes ! Please wait.</div>
      )}

      {/* {show loading state} */}

      {/* {Map through all the recipes} */}

      <div className="items">
        {
          // renderRecipe()
        }
        {recipes && recipes.length > 0
          ? recipes.map((item) => (
              <RecipeItem
                addToFavorites={() => addToFavorites(item)}
                id={item.id}
                image={item.image}
                title={item.title}
              />
            ))
          : null}
      </div>
      {!loadingState && !recipes.length && (
        <div className="no-items"> 😋🍧Yummy🍨🤩</div>
      )}

      {/* {Map through all the recipes} */}
    </div>
  );
}

export default Homepage;
