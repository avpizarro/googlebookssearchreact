import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchButton from "../SearchButton/index";

function BookSearch(props) {
  return (
    <div>
      <div className="columns" style={{maxHeight: "64px"}}>
        <div className="column is-half is-offset-one-quarter">
          <div
            className="field has-addons"
            style={{
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            <p className="control has-icons-left" style={{ width: "100%" }}>
              <input
                className="input"
                type="text"
                placeholder="Find a book"
                onBlur={props.InputValueOnChange}
                value={props.inputValue}
              ></input>
              <span className="icon is-small is-left">
                <i>
                  <FontAwesomeIcon icon="search" />
                </i>
              </span>
            </p>
            <div className="control">
              <SearchButton handleFormSubmit={props.handleFormSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookSearch;
