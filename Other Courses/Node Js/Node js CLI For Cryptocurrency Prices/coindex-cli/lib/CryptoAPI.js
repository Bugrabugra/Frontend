const axios = require("axios");
const colors = require("colors");


class CryptoAPI {
  constructor(apiKey) {
    this.apiKEY = apiKey;
    this.baseURL = "https://api.nomics.com/v1/currencies/ticker";
  }

  async getPriceData(coinOption, curOption) {
    try {
      // Formatter for currency
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: curOption
      });

      const response = await axios.get(`${this.baseURL}?key=${this.apiKEY}&ids=${coinOption}&convert=${curOption}`);
      let output = "";
      response.data.forEach(coin => {
        output += `Coin: ${coin.symbol.yellow} (${coin.name}) | Price ${formatter.format(coin.price).green} | Rank: ${coin.rank.blue}\n`;
      });

      return output;
    } catch (error) {
      handleAPIError(error);
    }
  }
}

const handleAPIError = (error) => {
  if (error.response.status === 401) {
    throw new Error("Your API Key is invalid - Go to https://nomics.com");
  } else if (error.response.status === 404) {
    throw new Error("Your API Key is not responding");
  } else {
    throw new Error("Something is not working");
  }
}

module.exports = CryptoAPI;