import React from "react";
import { DebounceInput } from "react-debounce-input";

import "./Search.scss";

// Search component with debouce time out
export default function Search({searchTerm, onSearch}) {
  return (
    <div>
      <DebounceInput
        className="searchInput"
        name="searchInput"
        placeholder="Search your package"
        minLength={2}
        debounceTimeout={300}
        value={searchTerm}
        onChange={e => onSearch(e.target.value)}
      />
    </div>
  );
}
