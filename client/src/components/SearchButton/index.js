import React from "react";

function SearchButton(props) {
  return (
    <button
      onClick={props.handleFormSubmit}
      type="submit"
      className="button"
      style={{ backgroundColor: "#eee" }}
    >
      Search
    </button>
  );
}
export default SearchButton;