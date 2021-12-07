const {createStore, combineReducers, applyMiddleware} = require("redux");
const reduxLogger = require("redux-logger");


const logger = reduxLogger.createLogger();

// constants
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

// actions
const buyCake = () => {
  return {
    type: BUY_CAKE,
  } ;
};

const buyIceCream = () => {
  return {
    type: BUY_ICECREAM,
  }
};

// states
const initialIceCreamState = {
  numOfIceCreams: 20
};

const initialCakeState = {
  numOfCakes: 10,
};

// reducers
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1
      }
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1
      }
    default:
      return state;
  }
};

// combining reducers
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
});

// store
const store = createStore(rootReducer, applyMiddleware(logger));

console.log("initial state", store.getState());
const unsubscribe = store.subscribe(() => {});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe();