<template>
  <v-container>
    <v-row justify="center" align="center" class="mx-auto">
      <v-col cols="8" style="min-width: 500px">
        <v-card color="#20B3B3" rounded elevation="8">
          <v-form class="ma-4" ref="form">
            <v-container>
              <v-row justify="center" align="center">

                <!--Buy button-->
                <v-col cols="4">
                  <v-btn height="90px" color="light-green accent-3" class="mb-6" @click="buyMARKET" style="width: 100%">
                    <v-icon v-if="buySuccessful">
                      mdi-check-circle
                    </v-icon>
                    Buy Market
                  </v-btn>
                </v-col>

                <!--Crypto name-->
                <v-col :cols="toggleRatio ? 5 : 8">
                  <v-text-field @input="start" style="font-size: 40px" outlined dark height="100px" v-model="cryptoName" label="Crypto Name"></v-text-field>
                </v-col>

                <!--Ratio-->
                <v-col v-if="toggleRatio" cols="3">
                  <v-text-field style="font-size: 40px" outlined dark height="100px" v-model="ratio" label="Ratio"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <!--Sell button-->
                <v-col cols="9">
                  <v-btn height="70px" color="orange" class="mb-6" @click="sellMARKET" style="width: 100%">
                    <v-icon v-if="sellSuccessful">
                      mdi-check-circle
                    </v-icon>
                    Sell Market
                  </v-btn>
                </v-col>

                <!--Web page button-->
                <v-col cols="3">
                  <v-btn height="70px" color="purple lighten-3" class="mb-6" @click="openWebPage" style="width: 100%">
                    Page
                  </v-btn>
                </v-col>
              </v-row>

              <v-row>
                <!--Quote order quantity input-->
                <v-col cols="6">
                  <v-text-field dark v-model="quoteOrderQty" label="Quote Order Quantity" background-color="red lighten-3" outlined></v-text-field>
                </v-col>

                <!--Total sell text field-->
                <v-col cols="6">
                  <v-text-field dark v-model="totalSell" label="Total Sell" disabled></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <!--Market buy quantity text field-->
                <v-col cols="6">
                  <v-text-field dark v-model="marketBuyQuantity" label="Market Buy Quantity"></v-text-field>
                </v-col>

                <!--Market buy price text field-->
                <v-col cols="6">
                  <v-text-field dark v-model="marketBuyPrice" label="Market Buy Price" disabled></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <!--Market sell quantity text field-->
                <v-col>
                  <v-text-field dark v-model="marketSellQuantity" label="Market Sell Quantity"></v-text-field>
                </v-col>

                <!--Market sell price text field-->
                <v-col>
                  <v-text-field dark v-model="marketSellPrice" label="Market Sell Price" disabled></v-text-field>
                </v-col>
              </v-row>

              <!--Duration text field-->
              <v-row>
                <v-col cols="6">
                  <v-text-field dark v-model="duration" label="Duration" disabled></v-text-field>
                </v-col>

                <!--Current value text field-->
                <v-col cols="6">
                  <v-text-field dark v-model="currentValue" label="Current Price" disabled></v-text-field>
                </v-col>
              </v-row>

              <!--Ratio toggle-->
              <v-switch
                  v-model="toggleRatio"
                  :label="`Ratio on: ${toggleRatio.toString()}`"
              ></v-switch>

              <!--Exchange button-->
              <v-btn color="blue darken-2" class="mb-6" @click="exchangeInfo" style="width: 100%">Exchange Info</v-btn>

              <!--Check price button-->
              <v-btn color="blue darken-2" class="mb-6" @click="checkPrice" style="width: 100%">Check Price</v-btn>

              <!--Check alert-->
              <v-btn color="blue darken-2" class="mb-6" @click="alert" style="width: 100%">Check Alert</v-btn>

            </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import * as dayjs from 'dayjs'
  import Binance from "binance-api-node";
  const ema = require("trading-indicator").ema;
  const alerts = require('trading-indicator').alerts;

  export default {
    name: "Pumper",
    data() {
      return {
        clientEN: null,
        cryptoName: "",
        currentValue: 0,
        price: 0,
        quantity: 0,
        quoteOrderQty: 0,
        marketBuyPrice: 0,
        marketBuyQuantity: 0,
        marketSellPrice: 0,
        marketSellQuantity: 0,
        startMs: null,
        endMs: null,
        duration: 0,
        buySuccessful: false,
        sellSuccessful: false,
        totalSell: 0,
        clipboard: "",
        ratio: 0,
        toggleRatio: false,
        allBTCSymbols: []
      }
    },

    computed: {
      currencyUpperCaseTrimmed() {
        return this.cryptoName.toUpperCase().trim();
      },
    },

    methods: {
      setClient() {
        this.clientEN = Binance({
          apiKey: process.env.VUE_APP_BINANCE_API_KEY,
          apiSecret: process.env.VUE_APP_BINANCE_SECRET_KEY,
          getTime: () => Date.now(),
        })
        console.log("Client was set!");
      },

      // Runs getCurrencyPrice
      checkPrice() {
        this.getCurrencyPrice(this.currencyUpperCaseTrimmed);
      },

      // Start timer
      start() {
        if (this.quoteOrderQty) {
          this.buyMARKET()
          console.log("started");
          this.startMs = dayjs();
        }
      },

      // Stop timer
      end() {
        if (this.quoteOrderQty) {
          console.log("ended");
          this.endMs = dayjs();
          this.duration = `${this.endMs.diff(this.startMs, "millisecond")} milliseconds`
          console.log(this.duration)
        }
      },

      // Get currency's current price
      async getCurrencyPrice(currencyName) {
        const crypto = `${currencyName}BTC`;
        const response = await this.clientEN.prices({symbol: `${crypto}`})
        if (response) {
          this.currentValue = response[crypto];
          this.end();

          if (this.toggleRatio) {
            this.ratio = (((parseFloat(this.currentValue) * 100) / parseFloat(this.marketBuyPrice)) - 100).toFixed(2);
            console.log(this.ratio)
          }
        }
      },

      // Buy limit
      async buyLIMIT(currencyName) {
        const crypto = `${this.cryptoName}BTC`;
        const response = await this.clientEN.order({
          symbol: crypto,
          side: "BUY",
          type: "LIMIT",
          quantity: this.quantity,
          price: this.price
        })
        if (response) {
          this.end();
          console.log(response);
        }
      },

      // Buy market
      async buyMARKET() {
        if (this.toggleRatio) {
          // Calculate ratio
          setInterval(() => {
            this.checkPrice(this.currencyUpperCaseTrimmed);
          }, 100)
        }

        console.log(this.currencyUpperCaseTrimmed);
        const crypto = `${this.currencyUpperCaseTrimmed}BTC`;
        const response = await this.clientEN.order({
          symbol: crypto,
          side: "BUY",
          type: "MARKET",
          quoteOrderQty: this.quoteOrderQty,
        })
        if (response) {
          console.log(response)
          this.end();
          const commission = response.fills[0].commission;
          this.marketBuyPrice = response.fills[0].price;
          this.marketBuyQuantity = response.fills[0].qty - commission;
          if (this.marketBuyQuantity) {
            this.buySuccessful = true;
          }
          console.log(response);
        }
      },

      async sellMARKET() {
        const crypto = `${this.currencyUpperCaseTrimmed}BTC`;
        const response = await this.clientEN.order({
          symbol: crypto,
          side: "SELL",
          type: "MARKET",
          quantity: Math.floor(this.marketBuyQuantity),
        })
        if (response) {
          this.end();
          this.marketSellPrice = response.fills[0].price;
          this.marketSellQuantity = response.fills[0].qty;
          if (this.marketSellQuantity) {
            this.sellSuccessful = true;
            this.totalSell = (this.marketSellPrice * this.marketSellQuantity).toFixed(9);
          }
          console.log(response);
        }
      },

      async exchangeInfo() {
        const crypto = `${this.currencyUpperCaseTrimmed}BTC`;
        const response = await this.clientEN.exchangeInfo({
          symbol: crypto
        })
        if (response) {
          console.log(response.symbols.filter(sym => {
            return sym.symbol === crypto;
          })[0].filters);
        }
      },

      openWebPage() {
        window.open(`https://www.binance.com/en/trade/${this.currencyUpperCaseTrimmed}_BTC`)
      },

      // Reading Windows clipboard to paste into page. You have to click
      // page in order to automatically paste
      readFromClipboard() {
        setInterval(() => {
          navigator.clipboard.readText().then(res => {
            this.clipboard = res;
            this.cryptoName = this.clipboard;
          }).catch(err => {
            // console.log(err)
          })
        }, 50)
      },

      async getAllSymbolsPrice() {
        const response = await this.clientEN.prices();
        if (response) {
          this.allBTCSymbols = Object.keys(response).filter(symbol => {
            if (symbol.endsWith("BTC")) {
              return symbol
            }
          }).map(symbol => {
            return `${symbol.split("BTC")[0]}/BTC`
          })
        }
      },

      async alert() {
        const goldenCross = await alerts.goldenCross(
          7,
          99,
          "binance",
          `${this.cryptoName}/BTC`,
          "4h",
          false
        )

        const priceCrossEMA = await alerts.priceCrossEMA(
          7,
          "binance",
          `${this.cryptoName}/BTC`,
          "4h",
          false
        )

        console.log("goldenCross: ", goldenCross);
        console.log("priceCrossEMA: ", priceCrossEMA);

        // await this.getAllSymbolsPrice();
        //
        // const littleArray = this.allBTCSymbols.slice(1, 10);
        //
        // async function asyncForEach(array, callback) {
        //   for (let index = 0; index < array.length; index++) {
        //     await callback(array[index], index, array);
        //   }
        // }
        //
        // await asyncForEach(this.allBTCSymbols, async symbol => {
        //   const result = await alerts.priceCrossEMA(
        //     7,
        //     "binance",
        //     symbol,
        //     "4h",
        //     false
        //   )
        //
        //   console.log(`${symbol} : cross: ${result.cross} - direction: ${result.direction}`);
        // })

      }
    },

    mounted() {
      this.setClient();
    }
  }
</script>