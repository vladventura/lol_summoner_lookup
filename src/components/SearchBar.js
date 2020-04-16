import React from "react";

const SearchBar = ({ onSubmit, formValue, updateSearch }) => {
  return (
    <div className="form-box">
      <form onSubmit={(event) => onSubmit(event)}>
        <label>
          <input
            type="text"
            value={formValue}
            onChange={(event) => updateSearch(event)}
            placeholder="Type the Summoner's name!"
          />
        </label>
      </form>
    </div>
  );
};

export default SearchBar;
