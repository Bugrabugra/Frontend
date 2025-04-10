import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";


const ExpensesList = ({items}) => {
  if (items.length === 0) {
    return <h2 className="expenses-list__fallback">Found ne expenses.</h2>;
  }

  return (
    <ul className="expenses-list">
      {items.map(expense => {
        return (<ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />)
      })}
    </ul>
  )
}

export default ExpensesList;


