const apiURL = "https://opentdb.com/api.php?amount=10&type=boolean";


export const fetchQuizFromApi = async () => {
  try {
    const res = await fetch(apiURL);
    const questions = await res.json();
    return questions.results;
  } catch (error) {
    return await Promise.reject(error);
  }
};