import {useDispatch, useSelector} from "react-redux";
import {buyCake} from "../redux";


const HooksCakeContainer = (props) => {
  const numOfCakes = useSelector(state => state.cake.numOfCakes);
  const dispatch = useDispatch();

  const handleBuyCake = () => {
    dispatch(buyCake());
  };

  return (
    <div>
      <h2>Num of cakes - {numOfCakes}</h2>
      <button onClick={handleBuyCake}>Buy cake</button>
    </div>
  );
};

export default HooksCakeContainer;