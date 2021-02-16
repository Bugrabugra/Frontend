<template>
  <div>
    <v-btn
        fab
        bottom
        right
        color="orange"
        dark
        fixed
        @click.stop="showEditTransactionDialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
            class="grey lighten-4 py-4 title"
        >
          New Transaction
        </v-card-title>
        <v-container class="pa-4">
          <v-row>
            <v-col cols="12">
              <v-menu
                  ref="datePicker"
                  :close-on-content-click="false"
                  v-model="transactionDatePicker"
                  transition="scale-transition"
                  offset-y
                  :nudge-right="40"
                  max-width="290px"
                  min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                      slot="activator"
                      label="Select Transaction Date"
                      v-model="transaction.transactionDate"
                      prepend-icon="mdi-calendar"
                      v-on="on"
                      readonly
                  />
                </template>

                <v-date-picker
                    v-model="transaction.transactionDate"
                    v-on:input="$refs.datePicker.save(transaction.transactionDate)"
                />
              </v-menu>
            </v-col>

            <v-col cols="12">
              <v-select
                  prepend-icon="mdi-credit-card-outline"
                  v-bind:items="transactionTypes"
                  v-model="transaction.transactionType"
                  label="Transaction Type"
                  single-line
                  bottom
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                  prepend-icon="mdi-note-text"
                  placeholder="Description"
                  v-model="transaction.description"
              />
            </v-col>

            <v-col cols="6">
              <v-text-field
                  prepend-icon="mdi-minus-circle"
                  placeholder="Charge (-)"
                  v-model="transaction.charge"
              />
            </v-col>

            <v-col cols="6">
              <v-text-field
                  prepend-icon="mdi-plus-circle"
                  placeholder="Deposit (+)"
                  v-model="transaction.deposit"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                  prepend-icon="mdi-message-reply-text"
                  placeholder="Notes"
                  v-model="transaction.notes"
              />
            </v-col>

          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="saveTransaction">Save</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'EditTransaction',
    data: () => ({
      dialog: false,
      transaction: {
        id: null,
        transactionDate: null,
        transactionType: null,
        description: '',
        notes: '',
        charge: 0.0,
        deposit: 0.0
      },
      transactionTypes: [
        { text: 'Credit Card', value: 'Credit Card' },
        { text: 'Debit Card', value: 'Debit Card' },
        { text: 'Check', value: 'Check' },
        { text: 'Deposit', value: 'Deposit' }
      ],
      transactionDatePicker: false
    }),
    methods: {
      saveTransaction: function () {
        console.log('Saving transaction record:')
        this.$store.dispatch("saveTransaction", this.transaction)

        this.dialog = false
      },
      showEditTransactionDialog: function () {
        this.transaction.transactionDate = this.getCurrentDate()
        this.dialog = true
      },
      getCurrentDate: function () {
        const dt = new Date(Date.now())
        let month = '' + (dt.getMonth() + 1)
        let day = '' + dt.getDate()
        let year = dt.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-')
      }
    }
  }
</script>

<style>

</style>
