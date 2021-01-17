<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
            :headers="headers"
            :items="currencies"
            :items-per-page="5"
            class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Binance from "binance-api-node"


  export default {
    name: 'Dashboard',

    data() {
      return {
        client: null,
        currentBTCTRY: null,
        updateInterval: 5000,
        headers: [
          {
            text: 'Crypto Paralar',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Anlık Değer', value: 'currentValue' },
        ],

        currencies: [
          {
            name: "BTC/TRY",
            currentValue: null,
          },
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
          this.currentBTCTRY = response.BTCTRY;
          console.log(this.currentBTCTRY);
          this.currencies[0].currentValue = this.currentBTCTRY;
        }, this.updateInterval)
      },

      async getAccountInfo() {
        const response = await this.client.accountInfo();
        console.log(response);
      }
    },

    created() {
      this.setClient();
      this.getPrices();
      this.getAccountInfo();
    }
  }
</script>
