import {
  ChangeEvent,
  createContext,
  ReactElement,
  ReactNode,
  useCallback, useContext,
  useReducer
} from "react";

type StateType = {
  count: number;
  text: string;
}

export const initialState: StateType = { count: 0, text: "" };

const enum REDUCER_ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  NEW_INPUT
};

type ReducerAction = {
  type: REDUCER_ACTION_TYPE,
  payload?: string
}

const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT:
      return { ...state, count: state.count + 1 };
    case REDUCER_ACTION_TYPE.DECREMENT:
      return { ...state, count: state.count - 1 };
    case REDUCER_ACTION_TYPE.NEW_INPUT:
      return { ...state, text: action.payload ?? "" };
    default:
      throw new Error();
  }
};

const useCounterContext = (initialState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const increment = useCallback(() => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT }), []);
  const decrement = useCallback(() => dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT }), []);
  const handleTextInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: REDUCER_ACTION_TYPE.NEW_INPUT, payload: e.target.value });
  }, []);

  return { state, increment, decrement, handleTextInput };
};

type UseCounterContextType = ReturnType<typeof useCounterContext>

const initialContextState: UseCounterContextType = {
  state: initialState,
  increment: () => {},
  decrement: () => {},
  handleTextInput: (e: ChangeEvent<HTMLInputElement>) => {}
};

export const CounterContext = createContext<UseCounterContextType>(initialContextState);

type ChildrenType = {
  children?: ReactElement | undefined
}

export const CounterProvider = ({
  children,
  ...initialState
}: ChildrenType & StateType): ReactElement => {
  return (
    <CounterContext.Provider value={useCounterContext(initialState)}>
      {children}
    </CounterContext.Provider>
  )
}

type UseCounterHookType = {
  count: number,
  increment: () => void,
  decrement: () => void
};

export const useCounter = (): UseCounterHookType => {
  const { state: { count }, increment, decrement } = useContext(CounterContext);

  return { count, increment, decrement };
};

type UseCounterTextHookType = {
  text: string,
  handleTextInput: (e: ChangeEvent<HTMLInputElement>) => void
};

export const useCounterText = (): UseCounterTextHookType => {
  const { state: { text }, handleTextInput } = useContext(CounterContext);

  return { text, handleTextInput };
};
