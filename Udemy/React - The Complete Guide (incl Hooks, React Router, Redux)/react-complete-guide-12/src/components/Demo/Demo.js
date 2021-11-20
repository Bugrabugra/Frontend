import MyParagraph from "./MyParagraph";
import React from "react";


const Demo = (props) => {
  console.log("DEMO OUTPUT");
  return (
    <MyParagraph>{props.show ? "This is new!": ""}</MyParagraph>
  );
}

export default React.memo(Demo);