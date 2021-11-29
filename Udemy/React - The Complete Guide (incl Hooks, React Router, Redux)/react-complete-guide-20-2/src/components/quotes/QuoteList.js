import { Fragment } from 'react';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';
import {useHistory, useLocation} from "react-router-dom";


const sortQuotes = (quotes, ascending) => {
  return quotes.sort((a, b) => {
    if (ascending) {
      return a.id > b.id ? 1 : -1;
    } else {
      return a.id < b.id ? 1 : -1;
    }
  })
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const isSortingAscending = queryParams.get("sort") === "asc";
  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  const changeSortHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${(isSortingAscending ? "desc" : "asc")}`
    })
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortHandler}>Sort {isSortingAscending? "Descending" : "Ascending"}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
