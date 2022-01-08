import React from "react";

// eslint-disable-next-line react/prop-types
const Navbar = ({onChangePage}) => {
  return (
    <nav>
      <button onClick={() => onChangePage("planets")}>Planets</button>
      <button onClick={() => onChangePage("people")}>People</button>
    </nav>
  );
};

export default Navbar;
