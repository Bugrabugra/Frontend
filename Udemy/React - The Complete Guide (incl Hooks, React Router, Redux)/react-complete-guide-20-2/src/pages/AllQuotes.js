import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../hooks/use-http";
import {useEffect} from "react";
import {getAllQuotes} from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";


const DUMMY_QUOTES = [
  { id: 'q1', author: 'Max', text: 'Learning React is fun!' },
  { id: 'q2', author: 'Maximilian', text: 'Learning React is great!' },
];

const AllQuotes = (props) => {
  const {sendRequest, status, data: loadedQuotes, error} = useHttp(
    getAllQuotes,
    true
  );

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner/>
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }
  
  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound/>;
  }

  return (
    <QuoteList quotes={loadedQuotes}/>
  );
};

export default AllQuotes;