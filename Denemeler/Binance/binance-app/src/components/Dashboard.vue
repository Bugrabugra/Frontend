<template>
  <v-data-table
      :headers="headers"
      :items="ownedCurrencies"
      class="elevation-4"
      hide-default-footer
  >
    <template v-slot:item.ownedCurrencyLogo="{item}">
      <v-img height="30" width="30" :src="`${item.ownedCurrencyName}.png`">

      </v-img>
    </template>

    <template v-slot:item.currencyValue="{item}" v-if="prices">
      <v-chip>
        {{fixNumbers(getCurrencyPrice(item.ownedCurrencyName), 3)}} TL
      </v-chip>
    </template>

    <template v-slot:item.ownedCurrencyValue="{item}" v-if="prices">
      <v-chip>
        {{item.ownedCurrencyName === 'TRY' ? '' : fixNumbers((getCurrencyPrice(item.ownedCurrencyName) * item.ownedCount), 3)}} TL
      </v-chip>
    </template>

    <template v-slot:item.ownedCurrencyPastBuyValue="{item}" v-if="prices">
      <v-chip :color="chipColor(fixNumbers(pastBuyOrders[item.ownedCurrencyName], 3),fixNumbers((getCurrencyPrice(item.ownedCurrencyName) * item.ownedCount), 3))">
        {{fixNumbers(pastBuyOrders[item.ownedCurrencyName], 3)}} TL
      </v-chip>
    </template>

    <template v-slot:item.ownedCurrencyPastSellValue="{item}" v-if="prices">
      <v-chip>
        {{fixNumbers(pastSellOrders[item.ownedCurrencyName], 3)}} TL
      </v-chip>
    </template>

  </v-data-table>
</template>

<script>
  import Binance from "binance-api-node"


  export default {
    name: 'Dashboard',

    data() {
      return {
        clientTR: null,
        clientEN: null,
        prices: null,
        pastBuyOrders: {},
        pastSellOrders: {},
        ownedCurrencies: [],
        updateInterval: 5000,
        headers: [
          {
            text: '',
            align: 'start',
            sortable: false,
            value: 'ownedCurrencyLogo',
          },
          {text: 'Crypto paralar', value: 'ownedCurrencyName',},
          {text: 'Sahip olunan miktar', value: 'ownedCount'},
          {text: 'Birim fiyat', value: 'currencyValue'},
          {text: 'Anlık sahip olunan değer', value: 'ownedCurrencyValue'},
          {text: 'Son alım tutarı', value: 'ownedCurrencyPastBuyValue'},
          {text: 'Son satış tutarı', value: 'ownedCurrencyPastSellValue'}
        ],

      }
    },

    methods: {
      setClient() {
        this.clientTR = Binance({
          apiKey: process.env.VUE_APP_TRBINANCE_API_KEY,
          apiSecret: process.env.VUE_APP_TRBINANCE_SECRET_KEY,
          getTime: () => Date.now(),
        })

        this.clientEN = Binance({
          apiKey: process.env.VUE_APP_BINANCE_API_KEY,
          apiSecret: process.env.VUE_APP_BINANCE_SECRET_KEY,
          getTime: () => Date.now(),
        })
        console.log("Client was set!");
      },

      getPrices() {
        setInterval(async () => {
          const response = await this.clientTR.prices();
          this.prices = response;
        }, this.updateInterval)
      },

      getCurrencyPrice(currencyName) {
        if (currencyName !== "TRY") {
          return this.prices[String(currencyName) + "TRY"]
        }
      },

      async getAccountInfo() {
        const response = await this.clientTR.accountInfo();
        const accountAssets = response.data.accountAssets;
        accountAssets.forEach(accountAsset => {
          if (accountAsset.free !== "0") {
            this.ownedCurrencies.push({ownedCurrencyName: accountAsset.asset, ownedCount: accountAsset.free});
            this.getCurrencyOrders(accountAsset.asset);
          }
        })
      },

      async getCurrencyOrders(currency) {
        if (currency !== "TRY") {
          const response = await this.clientTR.allOrdersOCO({symbol: `${currency}_TRY`});
          if (response.data.list.length > 0) {
            response.data.list.forEach(item => {
              if (item.isBuyer === 1) {
                this.pastBuyOrders[currency] = item.quoteQty;
              } else if (item.isBuyer === 0){
                this.pastSellOrders[currency] = item.quoteQty;
              }
            })

          }
        }
        console.log()
      },

      fixNumbers(num) {
        if (num || !isNaN(num)) {
          return parseFloat(num).toFixed(3);
        }
      },

      chipColor(a, b) {
        if (a && b) {
          if (a > b) {
            return "red"
          } else {
            return "green"
          }
        }
      }
    },

    created() {
      this.setClient();
      this.getAccountInfo();
      this.getPrices();
    }
  }
</script>
