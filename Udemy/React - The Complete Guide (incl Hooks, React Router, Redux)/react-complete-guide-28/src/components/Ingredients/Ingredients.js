import React, {useCallback, useEffect, useMemo, useReducer} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";

const url = "https://react-course-ba29d-default-rtdb.europe-west1.firebasedatabase.app"

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error("Should not get there!");
  }
};

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const {isLoading, data, error, sendRequest, reqExtra, reqIdentifier, clear} = useHttp();

  useEffect(() => {
    if (!isLoading && !error && reqIdentifier === "REMOVE_INGREDIENT") {
      dispatch({type: "DELETE", id: reqExtra})
    } else if (!isLoading && !error && reqIdentifier === "ADD_INGREDIENT") {
      dispatch({type: "ADD", ingredient: {id: data.name, ...reqExtra}})
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error]);

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatch({type: "SET", ingredients: filteredIngredients});
  }, []);

  const addIngredientHandler = useCallback((ingredient) => {
    sendRequest(
      url + "/ingredients.json",
      "POST",
      JSON.stringify(ingredient),
      ingredient,
      "ADD_INGREDIENT"
    );
  }, [sendRequest]);

  const removeIngredientHandler = useCallback((ingredientId) => {
    sendRequest(
      url + `/ingredients/${ingredientId}.json`,
      "DELETE",
      null,
      ingredientId,
      "REMOVE_INGREDIENT"
    );
  }, [sendRequest]);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />
    )
  }, [userIngredients, removeIngredientHandler])

  return (
    <div className="App">
      {error && (
        <ErrorModal onClose={clear()}>
          {error}
        </ErrorModal>
      )}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
