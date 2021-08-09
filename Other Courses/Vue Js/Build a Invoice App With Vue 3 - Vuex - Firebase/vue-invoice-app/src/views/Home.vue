<template>
  <div class="home container">
    <!--Header-->
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>Invoices</h1>
        <span>There are {{invoiceData.length}} total invoices</span>
      </div>

      <div class="right flex">
        <div @click="toggleFilterMenu" class="filter flex">
          <span>Filter by status <span v-if="filteredInvoice">: {{filteredInvoice}}</span></span>
          <img src="../assets/icon-arrow-down.svg" alt="">
          <ul v-show="filterMenu" class="filter-menu">
            <li @click="filteredInvoices">Draft</li>
            <li @click="filteredInvoices">Pending</li>
            <li @click="filteredInvoices">Paid</li>
            <li @click="filteredInvoices">Clear Filter</li>
          </ul>
        </div>

        <div @click="newInvoice" class="button flex">
          <div class="inner-button flex">
            <img src="../assets/icon-plus.svg" alt="">
          </div>
          <span>New Invoice</span>
        </div>
      </div>
    </div>

    <!--Invoices-->
    <div v-if="invoiceData.length > 0">
      <Invoice
          v-for="(invoice, index) in filteredData"
          :key="index"
          :invoice="invoice"
      />
    </div>

    <div v-else class="empty flex flex-column">
      <img src="../assets/illustration-empty.svg" alt="empty">
      <h3>There is nothing here</h3>
      <p>Create a new invoice by clicking the New Invoice button and get started!</p>
    </div>
  </div>
</template>

<script>
  import {ref, computed} from "vue";
  import {useStore} from "vuex";
  import Invoice from "../components/Invoice";


  export default {
    name: "Home",
    components: {Invoice},
    setup() {
      // Store
      const store = useStore();

      // References
      const filterMenu = ref(null);
      const filteredInvoice = ref(null);

      // Computed
      const invoiceData = computed(() => {
        return store.state.invoiceData;
      });

      const filteredData = computed(() => {
        return invoiceData.value.filter(invoice => {
          if (filteredInvoice.value === "Draft") {
            return invoice.invoiceDraft === true;
          }
          if (filteredInvoice.value === "Pending") {
            return invoice.invoicePending === true;
          }
          if (filteredInvoice.value === "Paid") {
            return invoice.invoicePaid === true;
          }
          return invoice;
        });
      });

      // Methods
      const newInvoice = () => {
        store.commit("TOGGLE_INVOICE");
      };

      const toggleFilterMenu = () => {
        filterMenu.value = !filterMenu.value;
      };

      const filteredInvoices = (e) => {
        if (e.target.innerText === "Clear Filter") {
          filteredInvoice.value = null;
          return;
        }
        filteredInvoice.value = e.target.innerText;
      };

      return {
        filterMenu,
        newInvoice,
        toggleFilterMenu,
        invoiceData,
        filteredInvoice,
        filteredInvoices,
        filteredData
      }
    }
  };
</script>

<style lang="scss" scoped>
  .home {
    color: #fff;

    .header {
      margin-bottom: 65px;

      .left,
      .right {
        flex: 1;
      }

      .right {
        justify-content: flex-end;
        align-items: center;

        .button,
        .filter {
          align-items: center;

          span {
            font-size: 12px;
          }
        }

        .filter {
          cursor: pointer;
          position: relative;
          margin-right: 40px;

          img {
            margin-left: 12px;
            width: 9px;
            height: 5px;
          }

          .filter-menu {
            width: 120px;
            position: absolute;
            top: 25px;
            list-style: none;
            background-color: #1e2139;
            box-shadow:
                0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -1px rgba(0, 0, 0, 0.06);

            li {
              cursor: pointer;
              font-size: 12px;
              padding: 10px 20px;

              &:hover {
                color: #1e2139;
                background-color: #fff;
              }
            }
          }
        }

        .button {
          padding: 8px 10px;
          background-color: #7c5dfa;
          border-radius: 40px;

          .inner-button {
            margin-right: 8px;
            border-radius: 50%;
            padding: 8px;
            align-items: center;
            justify-content: center;
            background-color: #fff;

            img {
              width: 10px;
              height: 10px;
            }
          }
        }
      }
    }

    .empty {
      margin-top: 160px;
      align-items: center;

      img {
        width: 214px;
        height: 200px;
      }

      h3 {
        font-size: 20px;
        margin-top: 40px;
      }

      p {
        text-align: center;
        max-width: 224px;
        font-size: 12px;
        font-weight: 300;
        margin-top: 16px;
      }
    }
  }
</style>
