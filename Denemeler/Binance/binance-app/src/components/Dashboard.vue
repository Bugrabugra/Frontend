<template>
  <v-data-table
      :headers="headers"
      :items="ownedCurrencies"
      class="elevation-1"
      hide-default-footer
  >
    <template v-slot:item.currencyValue="{item}" v-if="prices">
      <v-chip>
        {{getCurrencyPrice(item.ownedCurrencyName)}}
      </v-chip>
    </template>

    <template v-slot:item.ownedCurrencyValue="{item}" v-if="prices">
      <v-chip>
        {{item.ownedCurrencyName === 'TRY' ? '-' : getCurrencyPrice(item.ownedCurrencyName) * item.ownedCount}}
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
        client: null,
        prices: null,
        ownedCurrencies: [],
        updateInterval: 5000,
        headers: [
          {
            text: 'Crypto paralar',
            align: 'start',
            sortable: false,
            value: 'ownedCurrencyName',
          },
          {text: 'Sahip olunan miktar', value: 'ownedCount'},
          {text: 'Birim fiyat', value: 'currencyValue'},
          {text: 'Anlık değer', value: 'ownedCurrencyValue'}
        ],

      }
    },

    methods: {
      setClient() {
        this.client = Binance({
          apiKey: process.env.VUE_APP_TRBINANCE_API_KEY,
          apiSecret: process.env.VUE_APP_TRBINANCE_SECRET_KEY,
          getTime: () => Date.now(),
        })
        console.log("Client was set!");
      },

      getPrices() {
        setInterval(async () => {
          const response = await this.client.prices();
          this.prices = response;
        }, this.updateInterval)
      },

      getCurrencyPrice(currencyName) {
        if (currencyName !== "TRY") {
          return this.prices[String(currencyName) + "TRY"]
        } else {
          return "-"
        }
      },

      async getAccountInfo() {
        const response = await this.client.accountInfo();
        const accountAssets = response.data.accountAssets;
        accountAssets.forEach(accountAsset => {
          if (accountAsset.free !== "0") {
            this.ownedCurrencies.push({ownedCurrencyName: accountAsset.asset, ownedCount: accountAsset.free});
          }
        })
      }
    },

    created() {
      this.setClient();
      this.getAccountInfo();
      this.getPrices();
    }
  }
</script>
