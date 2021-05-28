<template>
  <v-card style="width: 100%;">
    <v-card-title>
      <span class="pr-3">
        Transactions for {{ months[currentMonth].name }} - {{ currentYear }}
      </span>

      <v-btn text icon class="pr-2" @click="gotoMonth(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-btn text icon class="pr-2" @click="gotoCurrentMonth">
        <v-icon>mdi-calendar-today</v-icon>
      </v-btn>

      <v-btn text icon @click="gotoMonth(1)">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-text-field
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          v-model="search"
      ></v-text-field>
    </v-card-title>

    <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        item-key="_id"
    >
      <template slot="item" slot-scope="props">
        <tr>
          <td>
            <v-edit-dialog
                lazy
            > {{ props.item.transactionDate }}

              <v-text-field
                  slot="input"
                  label="Edit"
                  v-model="props.item.transactionDate"
                  single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>

          <td class="text-center">{{ props.item.transactionType }}</td>
          <td class="text-center" @click="props.expanded = !props.expanded">
            {{ props.item.description }}
          </td>
          <td class="text-center">{{ props.item.charge }}</td>
          <td class="text-center">{{ props.item.deposit }}</td>
          <td class="text-center">{{ props.item.balance }}</td>
        </tr>
      </template>

      <template slot="expand" slot-scope="props">
        <v-card flat class="pl-5">
          <v-card-text class="text-xs-left">
            <v-text-field label="Note" v-model="props.item.notes"></v-text-field>
          </v-card-text>
        </v-card>
      </template>

      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>

    </v-data-table>
  </v-card>
</template>

<script>
  import {mapGetters, mapState} from "vuex";


  export default {
    data () {
      return {
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        search: '',
        pagination: {},
        headers: [
          { text: 'Date', align: 'center', sortable: false, value: 'date' },
          { text: 'Type', align: 'center', sortable: false, value: 'type' },
          { text: 'Description', align: 'center', sortable: false, value: 'description' },
          { text: 'Charge (-)', align: 'center', sortable: false, value: 'paymentAmt' },
          { text: 'Deposit (+)', align: 'center', sortable: false, value: 'depositAmt' },
          { text: 'Balance', align: 'center', sortable: false, value: 'balance' }
        ],
      }
    },

    computed: {
      ...mapState({
        months(state) {
          return state.transactions.months
        },

        currentYear(state) {
          return state.transactions.currentYear;
        },

        currentMonth(state) {
          return state.transactions.currentMonth;
        }
      }),

      ...mapGetters({
        items: "transactionsByMonth",
        balanceCharges: "balanceCharges",
        balanceDeposits: "balanceDeposits"
      })
    },

    methods: {
      getTransactionsByMonth() {
        this.$store.dispatch('getTransactionsByMonth')
      },

      getPreviousMonthsBalances() {
        this.$store.dispatch("getPreviousMonthsBalances");
      },

      gotoMonth(increment) {
        this.$store.dispatch("goToMonth", increment).then(() => {
          // Load selected month transaction data now...
          this.getPreviousMonthsBalances();
          this.getTransactionsByMonth();
        })
      },

      gotoCurrentMonth() {
        this.$store.dispatch("goToCurrentMonth").then(() => {
          // Load selected month transaction data now...
          this.getPreviousMonthsBalances();
          this.getTransactionsByMonth();
        })
      }
    },

    async mounted() {
      // const me = this
      await this.getPreviousMonthsBalances()
      await console.log(this.balanceCharges)
      await console.log(this.balanceDeposits)

      await this.getTransactionsByMonth()
    }
  }
</script>

<style scoped>
  .transactions {
    width: 100%;
  }
</style>
