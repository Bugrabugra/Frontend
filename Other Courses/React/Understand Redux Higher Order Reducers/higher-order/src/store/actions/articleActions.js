let counter = 0;

const AddArticle = () => {
  return {
    type: "ADD_ARTICLE",
    payload: `Article ${counter++}`,
  };
};

export default AddArticle;