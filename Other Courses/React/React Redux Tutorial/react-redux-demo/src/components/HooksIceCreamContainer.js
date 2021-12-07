import {useDispatch, useSelector} from "react-redux";
import {buyIceCream} from "../redux";


const HooksIceCreamContainer = (props) => {
  const numOfIceCreams = useSelector(state => state.iceCream.numOfIceCreams);
  const dispatch = useDispatch();

  const handleBuyIceCream = () => {
    dispatch(buyIceCream());
  };

  return (
    <div>
      <h2>Number of ice creams - {numOfIceCreams}</h2>
      <button onClick={handleBuyIceCream}>Buy Ice Cream</button>
    </div>
  );
};

export default HooksIceCreamContainer;