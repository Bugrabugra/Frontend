import React from 'react';

const getWikiResults = async (searchTerm: string) => {
  const searchParams = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrsearch: searchTerm,
    gsrlimit: '20',
    prop: 'pageimages|extracts',
    exchars: '100',
    exintro: 'true',
    explaintext: 'true',
    exlimit: 'max',
    format: 'json',
    origin: '*'
  })

  const response = await fetch('https://en.wikipedia.org/w/api.php?' + searchParams)

  return response.json()
};

export default getWikiResults;
