const chunkArray = (array, length) => {
  // init chunked array
  const chunkedArray = [];

  // loop through array
  array.forEach(value => {
    // get last element
    const last = chunkedArray[chunkedArray.length -1];

    // check if last and if last length is equal to the chunk length
    if (!last || last.length === length) {
      chunkedArray.push([value]);
    } else {
      last.push(value);
    }
  });
  return chunkedArray;
};

module.exports = chunkArray;