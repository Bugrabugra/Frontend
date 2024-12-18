import "./ExpenseForm.css"
import {useState} from "react";


const ExpenseForm = ({onSaveExpenseData}) => {
  // first approach
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  // second approach
  // const [userInput, setUserInput] = useState({
  //   enteredTitle: "",
  //   enteredAmount: "",
  //   enteredDate: ""
  // });


  const titleChangedHandler = (event) => {
    setEnteredTitle(event.target.value);

    // second approach

    // setUserInput({
    //   ...userInput,
    //   enteredTitle: event.target.value
    // });

    // if prev state matters use this one
    // setUserInput((prevState) => {
    //   return {...prevState, enteredTitle: event.target.value};
    // })
  };

  const amountChangedHandler = (event) => {
    setEnteredAmount(event.target.value);
    // setUserInput({
    //   ...userInput,
    //   enteredAmount: event.target.value
    // });
  };

  const dateChangedHandler = (event) => {
    setEnteredDate(event.target.value);
    // setUserInput({
    //   ...userInput,
    //   enteredDate: event.target.value
    // });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate)
    };

    // send to parent
    onSaveExpenseData(expenseData);

    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        {/*title*/}
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" value={enteredTitle} onChange={titleChangedHandler}/>
        </div>

        {/*amount*/}
        <div className="new-expense__control">
          <label>Amount</label>
          <input type="number" value={enteredAmount} min="0.01" step="0.01" onChange={amountChangedHandler}/>
        </div>

        {/*date*/}
        <div className="new-expense__control">
          <label>Date</label>
          <input type="date" value={enteredDate} min="2021-01-01" max="2022-12-31" onChange={dateChangedHandler}/>
        </div>
      </div>
      
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
}

export default ExpenseForm;