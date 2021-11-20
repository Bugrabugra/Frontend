const MyParagraph = (props) => {
  console.log("MyParagraph OUTPUT");
  return (
    <p>{props.children}</p>
  );
}

export default MyParagraph;