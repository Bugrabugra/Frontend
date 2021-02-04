<template>
  <v-container>
    <v-row justify="center" align="center" class="mx-auto">
      <v-col cols="8">
        <v-card color="#20B3B3" rounded elevation="8">
          <v-form class="ma-4" ref="form">
            <v-container>
              <v-row justify="center" align="center">
                <v-col cols="4">
                  <v-btn height="90px" color="light-green accent-3" class="mb-6" @click="buyMARKET" style="width: 100%">Buy Market</v-btn>
                  <!--<v-btn height="90px" color="light-green accent-3" class="mb-6" @click="check" style="width: 100%">Check</v-btn>-->
                </v-col>
                <v-col cols="8">
                  <v-text-field @input="start" style="font-size: 40px" outlined dark height="100px" v-model="cryptoName" label="Crypto Name"></v-text-field>
                </v-col>
              </v-row>

              <v-btn height="70px" color="orange" class="mb-6" @click="sellMARKET" style="width: 100%">Sell Market</v-btn>

              <v-text-field dark v-model="quoteOrderQty" label="Quote Order Quantity"></v-text-field>
              <!--<v-text-field dark v-model="sellingRatio" label="Selling Ratio"></v-text-field>-->
              <!--<v-text-field dark v-model="price" label="Price"></v-text-field>-->
              <!--<v-text-field dark v-model="quantity" label="Quantity"></v-text-field>-->
              <!--<v-text-field dark v-model="currentValue" label="Current Value" disabled></v-text-field>-->
              <v-text-field dark v-model="marketBuyPrice" label="Market Buy Price" disabled></v-text-field>
              <v-text-field dark v-model="marketBuyQuantity" label="Market Buy Quantity"></v-text-field>
              <v-text-field dark v-model="marketSellPrice" label="Market Sell Price" disabled></v-text-field>
              <v-text-field dark v-model="marketSellQuantity" label="Market Sell Quantity"></v-text-field>
              <v-text-field dark v-model="duration" label="Duration" disabled></v-text-field>

              <!--<v-btn color="orange" class="mb-6" @click="buyMARKET" style="width: 100%">Buy Market</v-btn>-->
              <!--<v-btn color="blue" class="mb-6" @click="check" style="width: 100%">Check</v-btn>-->
              <!--<v-btn color="orange" class="mb-6" @click="buyLIMIT" style="width: 100%">But Limit</v-btn>-->
              <v-btn color="blue" class="mb-6" @click="exchangeInfo" style="width: 100%">Exchange Info</v-btn>

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
        cryptoName: "",
        sellingRatio: 0,
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
        clientEN: null
      }
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

      checkPrice() {
        console.log(this.cryptoName);
        this.getCurrencyPrice(this.cryptoName);
      },

      start() {
        console.log("started");
        this.startMs = dayjs();
      },

      end() {
        console.log("ended");
        this.endMs = dayjs();
        this.duration = `${this.endMs.diff(this.startMs, "millisecond")} milliseconds`
        console.log(this.duration)
      },

      async getCurrencyPrice(currencyName) {
        const crypto = `${currencyName}BTC`;
        const response = await this.clientEN.prices({symbol: `${crypto}`})
        if (response) {
          this.currentValue = response[crypto];
          this.end();
          console.log(response);
        }
      },

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

      async buyMARKET() {
        console.log(this.cryptoName.toUpperCase());
        window.open(`https://www.binance.com/en/trade/${this.cryptoName.toUpperCase()}_BTC`)

        const crypto = `${this.cryptoName.toUpperCase()}BTC`;
        const response = await this.clientEN.order({
          symbol: crypto,
          side: "BUY",
          type: "MARKET",
          quoteOrderQty: this.quoteOrderQty,
        })
        if (response) {
          this.end();
          const commission = response.fills[0].commission;
          this.marketBuyPrice = response.fills[0].price;
          this.marketBuyQuantity = response.fills[0].qty - commission;
          console.log(response);
        }
      },

      async sellMARKET() {
        const crypto = `${this.cryptoName.toUpperCase()}BTC`;
        const response = await this.clientEN.order({
          symbol: crypto,
          side: "SELL",
          type: "MARKET",
          quantity: this.marketBuyQuantity,
        })
        if (response) {
          this.end();
          this.marketSellPrice = response.fills[0].price;
          this.marketSellQuantity = response.fills[0].qty;
          console.log(response);
        }
      },

      async exchangeInfo() {
        const crypto = `${this.cryptoName.toUpperCase()}BTC`;
        const response = await this.clientEN.exchangeInfo({
          symbol: crypto
        })
        if (response) {
          console.log(response.symbols.filter(sym => {
            return sym.symbol === crypto;
          })[0]);
        }
      },
    },

    mounted() {
      this.setClient();
    }
  }
</script>

<style scoped>

</style>