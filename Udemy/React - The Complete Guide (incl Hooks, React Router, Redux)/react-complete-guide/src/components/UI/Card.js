import "./Card.css";

const Card = (props) => {
  const classes = 'card ' + props.className;

  return <div className={classes}>
    {/*slot like*/}
    {props.children}
  </div>;
}

export default Card;