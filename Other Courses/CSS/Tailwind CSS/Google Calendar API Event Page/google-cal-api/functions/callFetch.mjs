import fetch from 'node-fetch';


const { CAL_API, CAL_ID } = process.env;
console.log(CAL_API, CAL_ID)
const BASE_PARAMS = `orderBy=startTime&singleEvents=true&timeMin=${new Date().toISOString()}`
const BASE_URL = `https://www.googleapis.com/calendar/v3/calendars/${CAL_ID}/events?${BASE_PARAMS}`

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': 'GET'
}

exports.handler = async function(event, context) {
  const finalURL = `${BASE_URL}${event.queryStringParameters.maxResults ? `&maxResults=${event.queryStringParameters.maxResults}` : ''}&key=${CAL_API}`
  try {
    if (event.httpMethod === 'GET') {
      return fetch(finalURL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return {
            statusCode: 200,
            body: JSON.stringify(data.items, null, 2),
            HEADERS
          }
        })
    }
    return {
      statusCode: 401
    }
  } catch(e) {
    console.error(e)
    return {
      statusCode: 500,
      body: e.toString()
    }
  }
}
