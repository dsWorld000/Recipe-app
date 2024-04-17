import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { ThemeContext } from "../../App";

const Search = (props) => {
  // console.log(props)
  const { getDataFromSearchComponent, apiCalledSuccess, setApiCalledSuccess } =
    props;

  const [inputValue, setInputValue] = useState("");
  const {theme} = useContext(ThemeContext);

  const handleInputValue = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };
  // console.log(inputValue);

  const handleSubmit = (event) => {
    event.preventDefault();
    getDataFromSearchComponent(inputValue);
  };

  useEffect(() => {
    if (apiCalledSuccess) {
      setInputValue("");
      setApiCalledSuccess(false);
    }
  }, [apiCalledSuccess]);

  return (
    <form onSubmit={handleSubmit} className="search">
      <input
        name="search"
        onChange={handleInputValue}
        placeholder="Search Recipes"
        id="search"
        type="text"
      />
      <button style={theme ? {backgroundColor: "#12343b"}: {}} type="submit">Search</button>
    </form>
  );
};

export default Search;
