import {buyIceCream} from "../redux";
import {connect} from "react-redux";


const IceCreamContainer = (props) => {
  return (
    <div>
      <h2>Number of ice creams - {props.numOfIceCreams}</h2>
      <button onClick={props.buyIceCream}>Buy Ice Cream</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    numOfIceCreams: state.iceCream.numOfIceCreams
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    buyIceCream: () => dispatch(buyIceCream())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IceCreamContainer);