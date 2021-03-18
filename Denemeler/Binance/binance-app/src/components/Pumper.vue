<template>
  <v-container>
    <v-row justify="center" align="center" class="mx-auto">
      <v-col cols="8" style="min-width: 500px">
        <v-card color="#20B3B3" rounded elevation="8">
          <v-form class="ma-4" ref="form">
            <v-container>
              <v-row justify="center" align="center" dense>

                <!--Buy button-->
                <v-col cols="4">
                  <v-btn height="90px" color="light-green accent-3" class="mb-2" @click="buyMARKET" style="width: 100%">
                    <v-icon v-if="buySuccessful">
                      mdi-check-circle
                    </v-icon>
                    Buy Market
                  </v-btn>
                </v-col>

                <!--Crypto name-->
                <v-col :cols="toggleRatio ? 5 : 8">
                  <v-text-field @input="start" class="mb-2" style="font-size: 40px" hide-details outlined dark height="100px" v-model="cryptoName" label="Crypto Name"></v-text-field>
                </v-col>

                <!--Ratio-->
                <v-col v-if="toggleRatio" cols="3">
                  <v-text-field style="font-size: 40px" class="mb-2" hide-details outlined dark height="100px" v-model="ratio" label="Ratio"></v-text-field>
                </v-col>
              </v-row>

              <v-row dense>
                <!--Sell button-->
                <v-col cols="9">
                  <v-btn height="70px" color="orange" class="mb-1" @click="sellMARKET" style="width: 100%">
                    <v-icon v-if="sellSuccessful">
                      mdi-check-circle
                    </v-icon>
                    Sell Market
                  </v-btn>
                </v-col>

                <!--Web page button-->
                <v-col cols="3">
                  <v-btn height="70px" color="purple lighten-3" class="mb-1" @click="openWebPage" style="width: 100%">
                    Page
                  </v-btn>
                </v-col>
              </v-row>

              <v-row dense>
                <!--Total buy-->
                <v-col cols="6">
                  <v-text-field dense dark v-model="quoteOrderQty" label="Total Buy" background-color="red lighten-3" hide-details outlined></v-text-field>
                </v-col>

                <!--Total sell text field-->
                <v-col cols="6">
                  <v-text-field dense dark v-model="totalSell" background-color="blue lighten-3" label="Total Sell" hide-details outlined readonly></v-text-field>
                </v-col>
              </v-row>

              <v-row dense>
                <!--Market buy quantity text field-->
                <v-col cols="6">
                  <v-text-field dense dark v-model="marketBuyQuantity" background-color="red lighten-2" hide-details outlined readonly label="Market Buy Quantity"></v-text-field>
                </v-col>

                <!--Market sell quantity text field-->
                <v-col>
                  <v-text-field dense dark v-model="marketSellQuantity" background-color="blue lighten-3" hide-details outlined readonly label="Market Sell Quantity"></v-text-field>
                </v-col>

              </v-row>

              <v-row dense>
                <!--Market buy price text field-->
                <v-col cols="6">
                  <v-text-field dense dark v-model="marketBuyPrice" background-color="red lighten-2" hide-details outlined readonly label="Market Buy Price"></v-text-field>
                </v-col>

                <!--Market sell price text field-->
                <v-col>
                  <v-text-field dense dark v-model="marketSellPrice" background-color="blue lighten-3" hide-details outlined readonly label="Market Sell Price"></v-text-field>
                </v-col>
              </v-row>

              <!--Duration text field-->
              <v-row dense>
                <v-col cols="6">
                  <v-text-field dense dark v-model="duration" label="Duration" hide-details outlined readonly></v-text-field>
                </v-col>

                <!--Current value text field-->
                <v-col cols="6">
                  <v-text-field dense dark v-model="currentValue" label="Current Price" outlined hide-details readonly></v-text-field>
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
        toggleRatio: true,
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

          this.marketBuyPrice = (parseFloat(response.cummulativeQuoteQty) / parseFloat(response.executedQty)).toFixed(10);
          this.marketBuyQuantity = response.executedQty;

          console.log("Executed Quantity: ", this.marketBuyQuantity);
          console.log("Executed Price: ", parseFloat(this.marketBuyPrice).toFixed(10));

          if (this.marketBuyQuantity) {
            this.buySuccessful = true;
          }
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
          console.log(response);
          this.end();

          this.marketSellPrice = (parseFloat(response.cummulativeQuoteQty) / parseFloat(response.executedQty)).toFixed(10);
          this.marketSellQuantity = response.executedQty;

          console.log("Executed Quantity: ", this.marketSellQuantity);
          console.log("Executed Price: ", parseFloat(this.marketSellPrice).toFixed(10));

          if (this.marketSellQuantity) {
            this.sellSuccessful = true;
            this.totalSell = parseFloat(response.cummulativeQuoteQty);
          }
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
        window.open(`https://www.binance.com/en/trade/${this.currencyUpperCaseTrimmed}_BTC?layout=pro`)
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
    },

    mounted() {
      this.setClient();
    }
  }
</script>