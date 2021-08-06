<template>
  <div
      @click="checkClick"
      class="invoice-wrap flex flex-column"
      ref="invoiceWrap"
  >
    <form @submit.prevent="submitForm" class="invoice-content">
      <Loading v-show="loading"/>
      <h1>New Invoice</h1>

      <!--Bill from-->
      <div class="bill-from flex flex-column">
        <h4>Bill From</h4>
        <div class="input flex flex-column">
          <label for="billerStreetAddress">Street Address</label>
          <input v-model="billerStreetAddress" type="text" id="billerStreetAddress" required>
        </div>

        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="billerCity">City</label>
            <input v-model="billerCity" type="text" id="billerCity" required>
          </div>

          <div class="input flex flex-column">
            <label for="billerZipCode">Zip Code</label>
            <input v-model="billerZipCode" type="text" id="billerZipCode" required>
          </div>

          <div class="input flex flex-column">
            <label for="billerCountry">Country</label>
            <input v-model="billerCountry" type="text" id="billerCountry" required>
          </div>
        </div>
      </div>

      <!--Bill to-->
      <div class="bill-to flex flex-column">
        <h4>Bill To</h4>

        <div class="input flex flex-column">
          <label for="clientName">Client's Name</label>
          <input v-model="clientName" type="text" id="clientName" required>
        </div>

        <div class="input flex flex-column">
          <label for="clientEmail">Client's Email</label>
          <input v-model="clientEmail" type="text" id="clientEmail" required>
        </div>

        <div class="input flex flex-column">
          <label for="clientStreetAddress">Client's Street Address</label>
          <input v-model="clientStreetAddress" type="text" id="clientStreetAddress" required>
        </div>

        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="clientCity">City</label>
            <input v-model="clientCity" type="text" id="clientCity" required>
          </div>

          <div class="input flex flex-column">
            <label for="clientZipCode">Zip Code</label>
            <input v-model="clientZipCode" type="text" id="clientZipCode" required>
          </div>

          <div class="input flex flex-column">
            <label for="clientCountry">Country</label>
            <input v-model="clientCountry" type="text" id="clientCountry" required>
          </div>
        </div>
      </div>

      <!--Invoice work details-->
      <div class="invoice-work flex flex-column">
        <div class="payment flex">
          <div class="input flex flex-column">
            <label for="invoiceDate">Invoice Date</label>
            <input v-model="invoiceDate" type="text" id="invoiceDate" disabled>
          </div>

          <div class="input flex flex-column">
            <label for="paymentDueDate">Payment Due</label>
            <input v-model="paymentDueDate" type="text" id="paymentDueDate" required>
          </div>
        </div>

        <div class="input flex flex-column">
          <label for="paymentTerms">Payment Terms</label>
          <select v-model="paymentTerms" id="paymentTerms" required>
            <option value="30">Net 30 Days</option>
            <option value="60">Net 60 Days</option>
          </select>
        </div>

        <div class="input flex flex-column">
          <label for="productDescription">Product Description</label>
          <input v-model="productDescription" type="text" id="productDescription" required>
        </div>

        <div class="work-items">
          <h3>Item List</h3>
          <table class="item-list">
            <tr class="table-heading flex">
              <th class="item-name">Item Name</th>
              <th class="qty">Qty</th>
              <th class="price">Price</th>
              <th class="total">Total</th>
            </tr>

            <tr
                class="table-items flex"
                v-for="(item, index) in invoiceItemList"
                :key="index"
            >
              <td class="item-name"><input type="text" v-model="item.itemName"></td>
              <td class="qty"><input type="text" v-model="item.qty"></td>
              <td class="price"><input type="text" v-model="item.price"></td>
              <td class="total flex">${{item.total = item.qty * item.price}}</td>
              <img @click="deleteInvoiceItem(item.id)" src="../assets/icon-delete.svg" alt="delete">
            </tr>
          </table>

          <div @click="addNewInvoiceItem" class="flex button">
            <img src="../assets/icon-plus.svg" alt="plus">
            Add New Item
          </div>
        </div>

      </div>

      <!--Save/Exit-->
      <div class="save flex">
        <div class="left">
          <button @click="closeInvoice" class="red">
            Cancel
          </button>
        </div>

        <div class="right flex">
          <button @click="saveDraft" class="dark-purple">
            Save Draft
          </button>

          <button @click="publishInvoice" class="purple">
            Create Invoice
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import db from "../firebase/firebaseInit";
  import {ref, onMounted, watch} from "vue";
  import {useStore} from "vuex";
  import {uid} from "uid";
  import Loading from "./Loading";


  export default {
    name: "InvoiceModal",
    components: {Loading},
    setup() {
      // Store
      const store = useStore();

      // References
      const loading = ref(null);

      const dateOptions = ref({year: "numeric", month: "short", day: "numeric"});

      const billerStreetAddress = ref(null);
      const billerCity = ref(null);
      const billerZipCode = ref(null);
      const billerCountry = ref(null);
      const clientName = ref(null);
      const clientEmail = ref(null);
      const clientStreetAddress = ref(null);
      const clientCity = ref(null);
      const clientZipCode = ref(null);
      const clientCountry = ref(null);
      const invoiceDateUnix = ref(null);
      const invoiceDate = ref(null);
      const paymentTerms = ref(null);
      const paymentDueDateUnix = ref(null);
      const paymentDueDate = ref(null);
      const productDescription = ref(null);
      const invoicePending = ref(null);
      const invoiceDraft = ref(null);
      const invoiceItemList = ref([]);
      const invoiceTotal = ref(0);

      // Methods
      const closeInvoice = () => {
        store.commit("TOGGLE_INVOICE");
      };

      const addNewInvoiceItem = () => {
        invoiceItemList.value.push({
          id: uid(),
          itemName: "",
          qty: "",
          price: 0,
          total: 0
        })
      };

      const deleteInvoiceItem = (id) => {
        invoiceItemList.value = invoiceItemList.value.filter(item => {
          return item.id !== id;
        })
      };

      const calculateInvoiceTotal = () => {
        invoiceTotal.value = 0;
        invoiceItemList.value.forEach(item => {
          invoiceTotal.value += item.total;
        });
      };

      const publishInvoice = () => {
        invoicePending.value = true;
      };

      const saveDraft = () => {
        invoiceDraft.value = true;
      };

      const uploadInvoice = async () => {
        if (invoiceItemList.value.length <= 0) {
          alert("Please ensure you filled out work items!");
          return;
        }

        loading.value = true;

        calculateInvoiceTotal();

        const database = db.collection("invoices").doc();

        await database.set({
          invoiceId: uid(6),
          billerStreetAddress: billerStreetAddress.value,
          billerCity: billerCity.value,
          billerZipCode: billerZipCode.value,
          billerCountry: billerCountry.value,
          clientName: clientName.value,
          clientEmail: clientEmail.value,
          clientStreetAddress: clientStreetAddress.value,
          clientCity: clientCity.value,
          clientZipCode: clientZipCode.value,
          clientCountry: clientCountry.value,
          invoiceDateUnix: invoiceDateUnix.value,
          invoiceDate: invoiceDate.value,
          paymentTerms: paymentTerms.value,
          paymentDueDateUnix: paymentDueDateUnix.value,
          paymentDueDate: paymentDueDate.value,
          productDescription: productDescription.value,
          invoicePending: invoicePending.value,
          invoiceDraft: invoiceDraft.value,
          invoiceItemList: invoiceItemList.value,
          invoiceTotal: invoiceTotal.value,
          invoicePaid: null
        });

        loading.value = false;

        closeInvoice();
      };

      const submitForm = () => {
        uploadInvoice();
      };

      // Mounted
      onMounted(() => {
        invoiceDateUnix.value = Date.now();
        invoiceDate.value = new Date(invoiceDateUnix.value)
          .toLocaleDateString("en-us", dateOptions.value);
      });

      // Watch
      watch(paymentTerms, () => {
        const futureDate = new Date();
        paymentDueDateUnix.value = futureDate.setDate(futureDate.getDate() + parseInt(paymentTerms.value));
        paymentDueDate.value = new Date(paymentDueDateUnix.value).toLocaleDateString("en-us", dateOptions.value);
      })

      return {
        billerStreetAddress, billerCity, billerZipCode, billerCountry,
        clientName, clientEmail, clientStreetAddress, clientCity, clientZipCode, clientCountry,
        invoiceDateUnix, invoiceDate,
        paymentTerms, paymentDueDateUnix, paymentDueDate, productDescription,
        invoicePending, invoiceDraft, invoiceItemList, invoiceTotal,
        loading,
        closeInvoice, addNewInvoiceItem, deleteInvoiceItem, publishInvoice, saveDraft, submitForm
      }
    }
  }
</script>

<style lang="scss" scoped>
  .invoice-wrap {
    position: fixed;
    top: 0;
    left: 0;
    background-color: transparent;
    width: 100%;
    height: 100vh;
    overflow: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    @media (min-width: 900px) {
      left: 90px;
    }

    .invoice-content {
      position: relative;
      padding: 56px;
      max-width: 700px;
      width: 100%;
      background-color: #141625;
      color: #fff;
      box-shadow:
          10px 4px 6px -1px rgba(0, 0, 0, 0.2),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);

      h1 {
        margin-bottom: 48px;
        color: #fff;
      }

      h3 {
        margin-bottom: 15px;
        font-size: 18px;
        color: #777f98;
      }

      h4 {
        color: #7c5dfa;
        font-size: 12px;
        margin-bottom: 24px;
      }

      // Bill to / Bill from
      .bill-to,
      .bill-from {
        margin-bottom: 48px;

        .location-details {
          gap: 16px;

          div {
            flex: 1;
          }
        }
      }

      // Invoice work
      .payment {
        gap: 24px;
        div {
          flex: 1;
        }
      }

      .work-items {
        .item-list {
          width: 100%;

          // Item table style
          .table-heading,
          .table-items {
            gap: 16px;
            font-size: 12px;

            .item-name {
              flex-basis: 50%;
            }

            .qty {
              flex-basis: 10%;
            }

            .price {
              flex-basis: 20%;
            }

            .total {
              flex-basis: 20%;
              align-self: center;
            }
          }

          .table-heading {
            margin-bottom: 16px;

            th {
              text-align: left;
            }
          }

          .table-items {
            position: relative;
            margin-bottom: 24px;

            img {
              position: absolute;
              top: 15px;
              right: 0;
              width: 12px;
              height: 16px;
            }
          }
        }

        .button {
          color: #fff;
          background-color: #252945;
          align-items: center;
          justify-content: center;
          width: 100%;

          img {
            margin-right: 4px;
          }
        }
      }

      .save {
        margin-top: 60px;

        div {
          flex: 1;
        }

        .right {
          justify-content: flex-end;
        }
      }
    }

    .input {
      margin-bottom: 24px;
    }

    label {
      font-size: 12px;
      margin-bottom: 6px;
    }

    input,
    select {
      width: 100%;
      background-color: #1e2139;
      color: #fff;
      border-radius: 4px;
      padding: 12px 4px;
      border: none;

      &:focus {
        outline: none;
      }
    }
  }
</style>