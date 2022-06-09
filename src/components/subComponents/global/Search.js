import React from "react";
import SearchBar from "material-ui-search-bar";

const search = (props) => {
  return (
    <SearchBar
      onChange={() => console.log("onChange")}
      onRequestSearch={(e) => console.log()}
      style={{
        margin: "0 auto",
        width: "90%",
        marginTop: "5%",
        marginBottom: "1vw",
      }}
    />
  );
};

export default search;
